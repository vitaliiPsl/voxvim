import React, { useRef, useState, useEffect } from 'react'

import { FaPlay, FaPause } from 'react-icons/fa'

interface VideoPlayerProps {
	videoUrl: string
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
	const [isPlaying, setIsPlaying] = useState<boolean>(false)
	const [currentTime, setCurrentTime] = useState<number>(0)
	const [duration, setDuration] = useState<number>(0)
	const videoRef = useRef<HTMLVideoElement>(null)

	useEffect(() => {
		const video = videoRef.current
		if (video) {
			video.addEventListener('timeupdate', handleTimeUpdate)
			video.addEventListener('loadedmetadata', handleLoadedMetadata)
		}
		return () => {
			if (video) {
				video.removeEventListener('timeupdate', handleTimeUpdate)
				video.removeEventListener(
					'loadedmetadata',
					handleLoadedMetadata
				)
			}
		}
	}, [videoUrl])

	const handleTimeUpdate = () => {
		if (videoRef.current) {
			setCurrentTime(videoRef.current.currentTime)
		}
	}

	const handleLoadedMetadata = () => {
		if (videoRef.current) {
			setDuration(videoRef.current.duration)
		}
	}

	const togglePlay = () => {
		if (videoRef.current) {
			if (isPlaying) {
				videoRef.current.pause()
			} else {
				videoRef.current.play()
			}
			setIsPlaying(!isPlaying)
		}
	}

	const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
		const time = Number(e.target.value)
		if (videoRef.current) {
			videoRef.current.currentTime = time
			setCurrentTime(time)
		}
	}

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60)
		const seconds = Math.floor(time % 60)
		return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
	}

	if (!videoUrl) return null

	return (
		<div className='fixed bottom-0 left-0 right-0 bg-white shadow-lg'>
			<div className='max-w-2xl mx-auto px-4 py-2'>
				<div className='flex items-center'>
					<button
						onClick={togglePlay}
						className='p-2 rounded-full bg-gray-900 text-white mr-4'
					>
						{isPlaying ? (
							<FaPause className='w-4 h-4' />
						) : (
							<FaPlay className='w-4 h-4' />
						)}
					</button>
					<input
						type='range'
						min={0}
						max={duration}
						value={currentTime}
						onChange={handleSeek}
						className='w-full accent-gray-900'
					/>
					<span className='text-nowrap ml-4 text-sm text-gray-500'>
						{formatTime(currentTime)} / {formatTime(duration)}
					</span>
				</div>
			</div>
			<video ref={videoRef} src={videoUrl} className='hidden' />
		</div>
	)
}
