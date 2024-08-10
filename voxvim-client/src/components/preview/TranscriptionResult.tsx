import React, { useState } from 'react'
import { MdContentCopy, MdCheck } from 'react-icons/md'

interface TranscriptionResultProps {
	transcription: string
}

export const TranscriptionResult: React.FC<TranscriptionResultProps> = ({
	transcription,
}) => {
	const [copied, setCopied] = useState(false)

	const writeToClipBoard = (text: string) => {
		navigator.clipboard.writeText(text).then(() => {
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		})
	}

	if (!transcription) return null

	return (
		<div className='bg-gray-100 rounded-md p-8 relative'>
			<p className='text-sm text-left text-gray-700 whitespace-pre-wrap leading-relaxed'>
				{transcription}
			</p>
			<button
				className='copy-btn absolute right-2 top-2'
				onClick={() => writeToClipBoard(transcription)}
			>
				{copied ? (
					<MdCheck className='h-5 w-5 text-green-500' />
				) : (
					<MdContentCopy className='h-5 w-5' />
				)}
			</button>
		</div>
	)
}

export default TranscriptionResult
