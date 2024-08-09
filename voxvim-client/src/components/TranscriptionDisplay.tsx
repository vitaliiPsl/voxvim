import React from 'react'

interface TranscriptionDisplayProps {
	transcription: string
}

export const TranscriptionDisplay: React.FC<TranscriptionDisplayProps> = ({
	transcription,
}) => {
	if (!transcription) return null

	return (
		<div className='px-4 py-5 sm:p-6 border-t border-gray-200'>
			<h2 className='text-lg font-medium text-gray-900 mb-2'>
				Transcription:
			</h2>
			<div className='bg-gray-50 rounded-md p-4'>
				<p className='text-sm text-gray-700 whitespace-pre-wrap leading-relaxed'>
					{transcription}
				</p>
			</div>
		</div>
	)
}
