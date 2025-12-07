/*
  Advent of Code 2025 - Jerren Trifan
  Day 7
  Link to problem and instructions: https://adventofcode.com/2025/day/7
*/
import { GetFileData } from '../util';

const inputData = await GetFileData();

let lines = inputData
	.split('\n')
	.filter(Boolean)
	.map((line) => line.split(''));

const inbounds = (y: number, x: number) => {
	return x >= 0 && y >= 0 && y < lines.length && x < lines[0].length;
};

const p1 = () => {
	const re = (y: number, x: number, visited: Set<string>): number => {
		if (!inbounds(y, x)) return 0;

		// track visited nodes
		// to avoid when two splitters split onto the same position
		const key = `${y},${x}`;
		if (visited.has(key)) return 0;
		visited.add(key);

		if (lines[y][x] === '^') {
			let count = 1; // split action
			const canLeft = inbounds(y, x - 1);
			const canRight = inbounds(y, x + 1);

			// fork left and right if applicable
			if (canLeft) {
				count += re(y, x - 1, visited);
			}
			if (canRight) {
				count += re(y, x + 1, visited);
			}
			return count; // tail-return total
		} else {
			// continue down
			return re(y + 1, x, visited);
		}
	};

	const startIdx = lines[0].indexOf('S');
	const visited = new Set<string>();
	const count = re(1, startIdx, visited);

	return count;
};

console.log(`p1 result: ${p1()}`);

const p2 = () => {
	const startIdx = lines[0].indexOf('S');
	const cache = new Map<string, number>();

	const re = (y: number, x: number): number => {
		if (!inbounds(y, x)) {
			// exited bounds
			return 1;
		}

		const key = `${y},${x}`;
		if (cache.has(key)) {
			// already computed further path
			return cache.get(key)!;
		}

		let result = 0;

		if (lines[y][x] === '^') {
			// sum both paths of timelines
			const canLeft = inbounds(y, x - 1);
			const canRight = inbounds(y, x + 1);

			// fork
			if (canLeft) {
				result += re(y, x - 1);
			}
			if (canRight) {
				result += re(y, x + 1);
			}
		} else {
			// continue down
			result = re(y + 1, x);
		}

		// set the calc result to this position key
		cache.set(key, result);
		return result;
	};

	return re(1, startIdx);
};

console.log(`p2 result: ${p2()}`);
