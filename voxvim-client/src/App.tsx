import React, { useState } from 'react'
import axios from 'axios'

import { TranscriptionForm } from './components/TranscriptionForm'
import { TranscriptionDisplay } from './components/TranscriptionDisplay'
import { VideoPlayer } from './components/VideoPlayer'

import { MdVideoCameraBack } from 'react-icons/md';

function App() {
	const [file, setFile] = useState<File | null>(null)
	const [videoUrl, setVideoUrl] = useState<string>('')
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string>('')
	const [transcription, setTranscription] = useState<string>('')

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
	}

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (!file) {
			setError('Please select a file')
			return
		}

		setLoading(true)
		setError('')
		setTranscription('')

		const formData = new FormData()
		formData.append('file', file)

		try {
			const response = await axios.post(
				'http://localhost:5000/transcribe',
				formData,
				{
					headers: { 'Content-Type': 'multipart/form-data' },
				}
			)
			setTranscription(response.data.text)
		} catch (error) {
			setError('An error occurred while transcribing the video')
			console.error('Error:', error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='min-h-screen bg-gray-100 flex flex-col py-12 px-4 sm:px-6 lg:px-8'>
			<div className='sm:mx-auto sm:w-full sm:max-w-2xl mb-20'>
				<div className='text-center mb-8'>
					<h1 className='text-4xl font-extrabold text-gray-900 flex items-center justify-center'>
						<MdVideoCameraBack className='h-10 w-10 text-gray-900 mr-3' />
						Video Transcription
					</h1>
					<p className='mt-2 text-sm text-gray-600'>
						Convert your video to text in seconds
					</p>
				</div>
				<div className='bg-white shadow-md rounded-lg overflow-hidden'>
					<div className='px-4 py-5 sm:p-6'>
						<TranscriptionForm
							file={file}
							videoUrl={videoUrl}
							loading={loading}
							onFileChange={handleFileChange}
							onRemoveFile={handleRemoveFile}
							onSubmit={handleSubmit}
						/>
						{error && (
							<p className='mt-2 text-sm text-red-600'>{error}</p>
						)}
					</div>
					<TranscriptionDisplay transcription={transcription} />
				</div>
			</div>
			<VideoPlayer videoUrl={videoUrl} />
		</div>
	)
}

export default App
