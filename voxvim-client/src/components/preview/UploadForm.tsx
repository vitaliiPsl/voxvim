import React from 'react'
import { MdClose, MdVideoLibrary } from 'react-icons/md'

interface UploadFormProps {
	file: File | null
	videoUrl: string
	loading: boolean
	onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
	onRemoveFile: () => void
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

export const UploadForm: React.FC<UploadFormProps> = ({
	file,
	videoUrl,
	loading,
	onFileChange,
	onRemoveFile,
	onSubmit,
}) => {
	return (
		<form onSubmit={onSubmit} className='space-y-6'>
			{!videoUrl ? (
				<div className='border-2 border-dashed border-gray-200 rounded-lg p-12 transition-all hover:border-gray-400'>
					<label className='flex flex-col items-center cursor-pointer'>
						<span className='text-3xl font-semibold text-gray-700'>
							Drop a file to transcribe it
						</span>
						<span className='text-lg text-gray-500'>or</span>
						<span className='mt-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors'>
							Choose a file
						</span>
						<input
							type='file'
							className='hidden'
							onChange={onFileChange}
							accept='video/*,audio/*'
						/>
					</label>
				</div>
			) : (
				<div className='file-preview flex flex-col gap-8'>
					<div className='flex items-center justify-between p-4 bg-gray-100 rounded-lg'>
						<div className='flex items-center'>
							<div className='bg-gray-200 p-2 rounded-lg mr-4'>
								<MdVideoLibrary className='w-8 h-8 text-gray-500' />
							</div>
							<div className='text-left'>
								<p className='text-sm font-medium text-gray-900'>
									{file?.name}
								</p>
								{file?.size && (
									<p className='text-xs text-gray-500'>
										{(file?.size / (1024 * 1024)).toFixed(
											2
										)}{' '}
										MB
									</p>
								)}
							</div>
						</div>
						<button
							type='button'
							onClick={onRemoveFile}
							className='text-gray-500 hover:text-gray-700'
						>
							<MdClose className='w-6 h-6' />
						</button>
					</div>
					<button
						type='submit'
						disabled={loading || !file}
						className='w-full py-3 px-4 border border-transparent rounded-lg text-white bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
					>
						{loading ? 'Transcribing...' : 'Transcribe'}
					</button>
				</div>
			)}
		</form>
	)
}

export default UploadForm
