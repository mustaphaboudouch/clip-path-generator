import type { Point } from '@/types';

/**
 * Get max X and Y from points.
 */
export function getMaxXY(points: Point[]) {
	if (points.length === 0) {
		return { maxX: 0, maxY: 0 };
	}

	let maxX = points[0].x;
	let maxY = points[0].y;

	for (let i = 1; i < points.length; i++) {
		if (points[i].x > maxX) {
			maxX = points[i].x;
		}
		if (points[i].y > maxY) {
			maxY = points[i].y;
		}
	}

	return { maxX, maxY };
}

/**
 * Build clip-path CSS code.
 */
export const getCSSCode = (points: Point[]) => {
	const { maxX, maxY } = getMaxXY(points);

	const pointsString = points.map((point) => {
		const x = (point.x / maxX) * 100;
		const y = (point.y / maxY) * 100;
		return `${parseFloat(x.toFixed(3))}% ${parseFloat(y.toFixed(3))}%`;
	});

	return `-webkit-clip-path: polygon(${pointsString.join(', ')});
clip-path: polygon(${pointsString.join(', ')});`;
};

/**
 * Get SVG width & height based on aspect ratio.
 */

export const getSVGDimensions = (points: Point[]) => {
	const { maxX, maxY } = getMaxXY(points);
	const aspectRatio = window.innerWidth / maxX;
	return { width: window.innerWidth, height: maxY * aspectRatio };
};

/**
 * Extract array of points from SVG path.
 */
export const getPointsFromPath = (pathString: string, totalPoints: number) => {
	const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	path.setAttribute('d', pathString);

	const coordinates = [];
	const pathLength = path.getTotalLength();

	for (let i = 0; i < totalPoints; i++) {
		const distance = (i / totalPoints) * pathLength;
		const point = path.getPointAtLength(distance);
		coordinates.push({ x: point.x, y: point.y });
	}

	return coordinates;
};

/**
 * Extract array of paths `d` from SVG element.
 */
export const getPathsFromSVG = (svg: Document) => {
	const paths = [];
	for (const path of Array.from(svg.getElementsByTagName('path'))) {
		const pathData = path.getAttribute('d');
		if (pathData) paths.push(pathData);
	}
	return paths;
};
