'use client';

import { getPathsFromSVG } from '@/lib/utils';
import { useDropzone } from 'react-dropzone';

type FileInputProps = {
	onChange: (paths: string[]) => void;
};

export function FileInput({ onChange }: FileInputProps) {
	const {
		getRootProps,
		getInputProps,
		isDragActive,
		isDragAccept,
		acceptedFiles,
	} = useDropzone({
		multiple: false,
		accept: {
			'image/svg+xml': ['.svg'],
		},
		onDropAccepted: (files) => {
			const reader = new FileReader();
			reader.readAsBinaryString(files[0]);

			reader.onabort = () => console.log('file reading was aborted');
			reader.onerror = () => console.log('file reading has failed');
			reader.onloadend = () => {
				const svgString = reader.result as string;
				if (svgString) {
					const parser = new DOMParser();
					const svg = parser.parseFromString(svgString, 'image/svg+xml');
					onChange(getPathsFromSVG(svg));
				}
			};
		},
	});

	const file = acceptedFiles.length > 0 ? acceptedFiles[0] : null;
	const isHovered = isDragActive && isDragAccept;

	return (
		<div
			{...getRootProps()}
			className={`border w-full flex flex-col items-center p-4 rounded-xl cursor-pointer ${
				isHovered
					? 'border-indigo-600 bg-indigo-50 text-indigo-700'
					: 'border-gray-300 bg-white text-gray-600'
			}`}
		>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 24 24'
				className='flex-none w-8 h-8 fill-gray-600 mb-3'
			>
				<path d='M21 15V18H24V20H21V23H19V20H16V18H19V15H21ZM21.0082 3C21.556 3 22 3.44495 22 3.9934V13H20V5H4V18.999L14 9L17 12V14.829L14 11.8284L6.827 19H14V21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082ZM8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7Z'></path>
			</svg>

			<input {...getInputProps()} />
			<p className='text-sm'>Click to upload or drag and drop</p>
			<p className='text-sm'>Accepted types : SVG</p>

			{file && (
				<div className='flex items-center justify-center gap-1 mt-2'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 24 24'
						className='w-4 h-4 fill-gray-600 hover:fill-gray-900'
					>
						<path d='M9 2.00318V2H19.9978C20.5513 2 21 2.45531 21 2.9918V21.0082C21 21.556 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5501 3 20.9932V8L9 2.00318ZM5.82918 8H9V4.83086L5.82918 8ZM11 4V9C11 9.55228 10.5523 10 10 10H5V20H19V4H11Z'></path>
					</svg>
					<p className='text-sm'>{file.name}</p>
				</div>
			)}
		</div>
	);
}
