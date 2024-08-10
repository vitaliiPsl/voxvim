import React, { useState } from 'react'
import { MdContentCopy, MdCheck } from 'react-icons/md'
import {
	Segment,
	SubtitleFormat,
	formatSubtitles,
} from '../../utils/subtitleUtils'

interface TranscriptionPanelProps {
	loading: boolean
	segments: Segment[]
	onTranscribe: () => void
}

export const TranscriptionPanel: React.FC<TranscriptionPanelProps> = ({
	loading,
	segments,
	onTranscribe,
}) => {
	const [copied, setCopied] = useState(false)
	const [format, setFormat] = useState<SubtitleFormat>('Plain Text')

	const formattedText = formatSubtitles(segments, format)

	const copyToClipboard = () => {
		navigator.clipboard.writeText(formattedText).then(() => {
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		})
	}

	return (
		<div className='space-y-4'>
			<button
				onClick={onTranscribe}
				disabled={loading}
				className='w-full py-3 px-4 border border-transparent rounded-lg text-white bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
			>
				{loading ? 'Transcribing...' : 'Transcribe'}
			</button>

			{segments.length > 0 && (
				<div className='bg-gray-100 rounded-md p-8 relative'>
					<div className='flex justify-between items-center mb-4'>
						<div className='space-x-2'>
							{(
								['Plain Text', 'SRT', 'VTT'] as SubtitleFormat[]
							).map((f) => (
								<button
									key={f}
									onClick={() => setFormat(f)}
									className={`px-3 py-1 rounded ${
										format === f
											? 'bg-gray-700 text-white'
											: 'bg-gray-300 text-gray-700'
									}`}
								>
									{f}
								</button>
							))}
						</div>
						<button
							onClick={copyToClipboard}
							className='text-gray-500 hover:text-gray-700'
							title='Copy to clipboard'
						>
							{copied ? (
								<MdCheck className='h-6 w-6' />
							) : (
								<MdContentCopy className='h-6 w-6' />
							)}
						</button>
					</div>
					<pre className='text-sm text-left text-gray-700 whitespace-pre-wrap max-h-96 overflow-y-auto'>
						{formattedText}
					</pre>
				</div>
			)}
		</div>
	)
}

export default TranscriptionPanel
