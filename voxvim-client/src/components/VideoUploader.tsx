import React from 'react'

import { IoCloseCircleOutline } from 'react-icons/io5'
import { MdFileUpload } from 'react-icons/md'

interface VideoUploaderProps {
	file: File | null
	videoUrl: string
	onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
	onRemoveFile: () => void
}

export const VideoUploader: React.FC<VideoUploaderProps> = ({
	file,
	videoUrl,
	onFileChange,
	onRemoveFile,
}) => {
	return (
		<>
			{!videoUrl ? (
				<div className='flex justify-center items-center border-2 border-gray-300 border-dashed rounded-lg p-12'>
					<label className='flex flex-col items-center cursor-pointer'>
						<MdFileUpload className='w-12 h-12 text-gray-400' />
						<span className='mt-2 text-sm text-gray-600'>
							Upload a video
						</span>
						<input
							type='file'
							className='hidden'
							onChange={onFileChange}
							accept='video/*'
						/>
					</label>
				</div>
			) : (
				<div className='flex gap-2 p-4 border relative'>
					<video
						src={videoUrl}
						className='h-40 aspect-square object-cover rounded-lg'
					/>
					<div className='description'>
						<p className='text-lg'>{file?.name}</p>
					</div>
					<div className='absolute top-2 right-2 close-button'>
						<IoCloseCircleOutline
							className='text-xl cursor-pointer'
							onClick={onRemoveFile}
						/>
					</div>
				</div>
			)}
		</>
	)
}
