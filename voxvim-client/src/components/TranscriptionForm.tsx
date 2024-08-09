import React from 'react'
import { VideoUploader } from './VideoUploader'

interface TranscriptionFormProps {
	file: File | null
	videoUrl: string
	loading: boolean
	onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
	onRemoveFile: () => void
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

export const TranscriptionForm: React.FC<TranscriptionFormProps> = ({
	file,
	videoUrl,
	loading,
	onFileChange,
	onRemoveFile,
	onSubmit,
}) => {
	return (
		<form onSubmit={onSubmit} className='space-y-6'>
			<VideoUploader
				file={file}
				videoUrl={videoUrl}
				onFileChange={onFileChange}
				onRemoveFile={onRemoveFile}
			/>
			<button
				type='submit'
				disabled={loading || !file}
				className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed'
			>
				{loading ? 'Transcribing...' : 'Transcribe'}
			</button>
		</form>
	)
}
