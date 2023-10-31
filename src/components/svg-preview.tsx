'use client';

import { getMaxXY, getSVGDimensions } from '@/lib/utils';
import type { Point } from '@/types';

type SVGPreviewProps = {
	points: Point[];
};

export function SVGPreview({ points }: SVGPreviewProps) {
	const { maxX, maxY } = getMaxXY(points);

	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			version='1.1'
			width={maxX}
			height={maxY}
			className='overflow-visible'
		>
			{points.map(({ x, y }, index) => (
				<circle key={index} cx={x} cy={y} r={3} fill='red' />
			))}
		</svg>
	);
}
