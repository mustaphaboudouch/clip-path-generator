'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

type CSSPreviewProps = {
	children: string;
};

export function CSSPreview({ children }: CSSPreviewProps) {
	return (
		<SyntaxHighlighter language='css' style={dark} className='w-full'>
			{children}
		</SyntaxHighlighter>
	);
}
