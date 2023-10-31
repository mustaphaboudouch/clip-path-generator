'use client';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
	return (
		<button
			{...props}
			className='h-10 px-3.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-md'
		/>
	);
}
