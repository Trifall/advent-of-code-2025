/*
  Advent of Code 2025 - Jerren Trifan
  Day 9
  Link to problem and instructions: https://adventofcode.com/2025/day/9
*/
import { GetFileData } from '../util';

const inputData = await GetFileData();

type Coord = {
	x: number;
	y: number;
};

let coords = inputData
	.split('\n')
	.filter(Boolean)
	.map((line) => {
		const [x, y] = line.split(',').map(Number);
		return { x, y } as Coord;
	});

// console.log(coords);

const p1 = () => {
	let maxArea = 0;
	for (let i = 0; i < coords.length - 1; i++) {
		const { x: x1, y: y1 } = coords[i];
		for (let j = i + 1; j < coords.length; j++) {
			const { x: x2, y: y2 } = coords[j];

			const area = (Math.abs(x2 - x1) + 1) * (Math.abs(y2 - y1) + 1);
			if (area > maxArea) {
				maxArea = area;
			}
		}
	}

	return maxArea;
};

console.log(`p1 result: ${p1()}`);

// Segment represents a line segment (horizontal or vertical)
type Segment = {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
	isHorizontal: boolean;
};

const p2 = () => {
	// use polygon edges -> use raycast

	// segments from the polygon edges
	const segments: Segment[] = [];

	// find segments
	for (let i = 0; i < coords.length; i++) {
		const curr = coords[i];
		const next = coords[(i + 1) % coords.length];

		if (curr.x === next.x) {
			// vertical
			segments.push({
				x1: curr.x,
				y1: Math.min(curr.y, next.y),
				x2: curr.x,
				y2: Math.max(curr.y, next.y),
				isHorizontal: false,
			});
		} else {
			// horizontal
			segments.push({
				x1: Math.min(curr.x, next.x),
				y1: curr.y,
				x2: Math.max(curr.x, next.x),
				y2: curr.y,
				isHorizontal: true,
			});
		}
	}

	const isOnBoundary = (x: number, y: number): boolean => {
		for (const seg of segments) {
			if (seg.isHorizontal) {
				if (y === seg.y1 && x >= seg.x1 && x <= seg.x2) return true;
			} else {
				if (x === seg.x1 && y >= seg.y1 && y <= seg.y2) return true;
			}
		}
		return false;
	};

	// if we ray cast to the right, and we hit an odd number edges,
	// then we must be inside the polygon (the ray has to exit through a wall)
	// if we dont hit an edge, or we hit an even number of edges then we are certainly out.
	const isInsidePolygon = (x: number, y: number): boolean => {
		if (isOnBoundary(x, y)) return true;

		let crossings = 0;
		for (const segment of segments) {
			// vertical - check if ray crosses it
			if (!segment.isHorizontal) {
				// ray should go from (x, y) to the right inf
				// segment is at x = seg.x1 from y1 to y2
				if (segment.x1 > x && y > segment.y1 && y <= segment.y2) {
					crossings++;
				}
			}
		}
		return crossings % 2 === 1;
	};

	const isRectangleValid = (minX: number, maxX: number, minY: number, maxY: number): boolean => {
		// check all 4 corners
		const corners = [
			[minX, minY],
			[minX, maxY],
			[maxX, minY],
			[maxX, maxY],
		];

		for (const [x, y] of corners) {
			if (!isInsidePolygon(x, y)) return false;
		}

		// check edges, need to verify rectangle stays inside
		// find all unique x and y in range
		const xVals = new Set<number>();
		const yVals = new Set<number>();

		for (const segment of segments) {
			if (segment.isHorizontal) {
				if (segment.y1 >= minY && segment.y1 <= maxY) {
					yVals.add(segment.y1);
				}
			} else {
				if (segment.x1 >= minX && segment.x1 <= maxX) {
					xVals.add(segment.x1);
				}
			}
		}

		// add rectangle boundaries
		xVals.add(minX);
		xVals.add(maxX);
		yVals.add(minY);
		yVals.add(maxY);

		// check top and bottom edges at added x points
		for (const x of xVals) {
			if (x >= minX && x <= maxX) {
				if (!isInsidePolygon(x, minY)) return false;
				if (!isInsidePolygon(x, maxY)) return false;
			}
		}

		// check left and right edges at added y points
		for (const y of yVals) {
			if (y >= minY && y <= maxY) {
				if (!isInsidePolygon(minX, y)) return false;
				if (!isInsidePolygon(maxX, y)) return false;
			}
		}

		return true;
	};

	let maxArea = 0;

	// same as p1, but check if its inbounds (valid rect) before counting as the best
	for (let i = 0; i < coords.length; i++) {
		for (let j = i + 1; j < coords.length; j++) {
			const coord1 = coords[i];
			const coord2 = coords[j];

			const minX = Math.min(coord1.x, coord2.x);
			const maxX = Math.max(coord1.x, coord2.x);
			const minY = Math.min(coord1.y, coord2.y);
			const maxY = Math.max(coord1.y, coord2.y);

			const area = (maxX - minX + 1) * (maxY - minY + 1);

			if (area <= maxArea) continue;

			if (isRectangleValid(minX, maxX, minY, maxY)) {
				maxArea = area;
			}
		}
	}

	return maxArea;
};

console.log(`p2 result: ${p2()}`);
