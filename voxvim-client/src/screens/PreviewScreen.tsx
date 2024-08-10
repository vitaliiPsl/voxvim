import React, { useState } from 'react'

import axios from 'axios'

import UploadForm from '../components/preview/UploadForm'
import TranscriptionPanel from '../components/preview/TranscriptionPanel'

interface TranscriptionResult {
	text: string
	segments: Segment[]
}

interface Segment {
	id: number
	start: number
	end: number
	text: string
}

export const PreviewScreen: React.FC = () => {
	const [file, setFile] = useState<File | null>(null)
	const [videoUrl, setVideoUrl] = useState<string>('')
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string>('')
	const [result, setResult] = useState<TranscriptionResult | null>(null)

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			const file = event.target.files[0]
			setFile(file)
			setVideoUrl(URL.createObjectURL(file))
		}
	}

	const handleRemoveFile = () => {
		setFile(null)
		setVideoUrl('')
		setResult(null)
	}

	const processFile = async () => {
		if (!file) {
			setError('Please select a file')
			return
		}

		setLoading(true)
		setError('')
		setResult(null)

		const formData = new FormData()
		formData.append('file', file)

		try {
			const response = await axios.post<TranscriptionResult>(
				'http://localhost:5000/transcribe',
				formData,
				{
					headers: { 'Content-Type': 'multipart/form-data' },
				}
			)
			setResult(response.data)
		} catch (error) {
			setError(`An error occurred while processing the video`)
			console.error('Error:', error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='min-h-screen bg-white flex flex-col items-stretch'>
			<header className='py-4 px-6'>
				<div className='flex justify-between items-center'>
					<div className='flex-shrink-0 flex items-end'>
						<p className='text-md font-semibold text-gray-800'>
							Video Transcriptions
						</p>
						<p className='ml-2 text-sm leading-6 text-gray-500'>
							by VitaliiPsl
						</p>
					</div>
					<div>
						<a
							href='/advanced'
							className='px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-700 transition-colors'
						>
							Try Advanced Version
						</a>
					</div>
				</div>
			</header>

			<main className='main pb-14 flex-1 flex items-center justify-center'>
				<div className='flex-1 max-w-3xl w-full flex flex-col items-stretch gap-8'>
					<div className='mb-6 flex flex-col items-center'>
						<h1 className='text-5xl font-bold text-gray-900 mb-4'>
							Video Transcription & Subtitles
						</h1>
						<p className='text-xl text-gray-600'>
							Convert your video to text in seconds
						</p>
					</div>

					<UploadForm
						file={file}
						videoUrl={videoUrl}
						onFileChange={handleFileChange}
						onRemoveFile={handleRemoveFile}
					/>

					{error && (
						<p className='mt-4 text-sm text-red-600'>{error}</p>
					)}

					{file && (
						<TranscriptionPanel
							loading={loading}
							segments={result?.segments || []}
							onTranscribe={processFile}
						/>
					)}
				</div>
			</main>
		</div>
	)
}
