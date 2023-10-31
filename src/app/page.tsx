'use client';

import { useState } from 'react';

import type { Point } from '@/types';
import { getCSSCode, getPointsFromPath } from '@/lib/utils';
import { Button } from '@/components/button';
import { NumberInput } from '@/components/number-input';
import { FileInput } from '@/components/file-input';
import { SVGPreview } from '@/components/svg-preview';
import { CSSPreview } from '@/components/css-preview';

export default function Page() {
	const [paths, setPaths] = useState<string[]>([]);
	const [selectedPath, setSelectedPath] = useState<string | null>(null);
	const [totalPoints, setTotalPoints] = useState<number>(100);
	const [points, setPoints] = useState<Point[]>([]);
	const [css, setCSS] = useState<string>('');

	const onChangeFile = (p: string[]) => {
		if (p.length <= 0)
			return alert("Uploaded SVG doesn't contain path elements.");

		setPaths(p);
		setSelectedPath(p[0]);
	};

	// const onSelectPath = (p: string) => {
	// 	const points = getPointsFromPath(p, totalPoints);
	// 	const css = getCSSCode(points);

	// 	setPoints(points);
	// 	setCSS(css);
	// 	setSelectedPath(p);
	// };

	const generateClipPath = (e: React.SyntheticEvent) => {
		e.preventDefault();

		if (paths.length <= 0) return alert('Upload an SVG file first.');
		if (!selectedPath) return alert('Select a path from the list.');

		const points = getPointsFromPath(selectedPath, totalPoints);
		const css = getCSSCode(points);

		setPoints(points);
		setCSS(css);
	};

	return (
		<main className='p-20 flex flex-col items-center gap-10'>
			<FileInput onChange={onChangeFile} />

			<form onSubmit={generateClipPath} className='flex items-end gap-2 w-full'>
				<NumberInput
					label='Number of points'
					min={0}
					required
					defaultValue={totalPoints}
					onChange={(e) => setTotalPoints(Number(e.target.value))}
				/>
				<Button type='submit'>Generate</Button>
			</form>

			{/* <div>
				{paths.map((p, index) => (
					<button key={index} onClick={() => onSelectPath(p)}>
						Path {index}
					</button>
				))}
			</div> */}

			{points.length > 0 && <SVGPreview points={points} />}

			{css && <CSSPreview>{css}</CSSPreview>}
		</main>
	);
}
