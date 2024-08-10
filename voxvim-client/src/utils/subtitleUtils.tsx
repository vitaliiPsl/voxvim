export interface Segment {
	id: number
	start: number
	end: number
	text: string
}

export type SubtitleFormat = 'Plain Text' | 'SRT' | 'VTT'

const formatTime = (seconds: number, format: SubtitleFormat): string => {
	const date = new Date(seconds * 1000)
	const hours = date.getUTCHours().toString().padStart(2, '0')
	const minutes = date.getUTCMinutes().toString().padStart(2, '0')
	const secs = date.getUTCSeconds().toString().padStart(2, '0')
	const ms = date.getUTCMilliseconds().toString().padStart(3, '0')

	if (format === 'VTT') {
		return `${hours}:${minutes}:${secs}.${ms}`
	} else {
		return `${hours}:${minutes}:${secs},${ms}`
	}
}

export const formatSubtitles = (
	segments: Segment[],
	format: SubtitleFormat
): string => {
	switch (format) {
		case 'SRT':
			return segments
				.map(
					(segment, index) =>
						`${index + 1}\n${formatTime(
							segment.start,
							'SRT'
						)} --> ${formatTime(segment.end, 'SRT')}\n${
							segment.text
						}\n\n`
				)
				.join('')
		case 'VTT':
			return (
				`WEBVTT\n\n` +
				segments
					.map(
						(segment) =>
							`${formatTime(
								segment.start,
								'VTT'
							)} --> ${formatTime(segment.end, 'VTT')}\n${
								segment.text
							}\n\n`
					)
					.join('')
			)
		default:
			return segments.map((segment) => segment.text).join('\n')
	}
}
