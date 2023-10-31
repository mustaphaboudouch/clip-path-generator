'use client';

import { useId } from 'react';

type NumberInputProps = Omit<
	React.InputHTMLAttributes<HTMLInputElement>,
	'id' | 'type'
> & {
	label?: string;
};

export function NumberInput({ label, ...props }: NumberInputProps) {
	const id = useId();

	return (
		<div className='flex flex-col w-full'>
			{label && (
				<label htmlFor={id} className='text-sm text-gray-600 font-medium'>
					{label}
				</label>
			)}
			<input
				id={id}
				type='number'
				{...props}
				className='border-gray-300 h-10 text-sm text-gray-900 rounded-md'
			/>
		</div>
	);
}
