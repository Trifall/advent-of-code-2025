/*
  Advent of Code 2025 - Jerren Trifan
  Day 4
  Link to problem and instructions: https://adventofcode.com/2025/day/4
*/
import { GetFileData } from '../util';

const inputData = await GetFileData();

let lines = inputData
	.split('\n')
	.filter(Boolean)
	.map((line) => line.split(''));

// console.log(lines);

let dir = [
	[-1, 1],
	[-1, 0],
	[-1, -1],
	[0, 1],
	[0, -1],
	[1, -1],
	[1, 0],
	[1, 1],
];

const p1 = () => {
	const rows = lines.length;
	const cols = lines[0].length;

	let count = 0;
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			let adjRolls = 0;
			if (lines[i][j] === '@') {
				for (let [dx, dy] of dir) {
					let nx = i + dx;
					let ny = j + dy;

					if (nx >= 0 && nx < rows && ny >= 0 && ny < cols) {
						if (lines[nx][ny] === '@') {
							adjRolls++;
						}
					}
				}
				if (adjRolls < 4) {
					// console.log(`adjRolls ${adjRolls} for i: ${i}, j ${j}`);
					count++;
				}
			}
		}
	}
	return count;
};

console.log(`p1 result: ${p1()}`);

const p2 = () => {
	const rows = lines.length;
	const cols = lines[0].length;

	let count = 0;
	let removedCount = 1;
	while (removedCount !== 0) {
		removedCount = 0;
		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				let adjRolls = 0;
				if (lines[i][j] === '@') {
					for (let [dx, dy] of dir) {
						let nx = i + dx;
						let ny = j + dy;

						if (nx >= 0 && nx < rows && ny >= 0 && ny < cols) {
							if (lines[nx][ny] === '@') {
								adjRolls++;
							}
						}
					}
					if (adjRolls < 4) {
						lines[i][j] = '.';
						count++;
						removedCount++;
					}
				}
			}
		}
	}

	return count;
};

console.log(`p2 result: ${p2()}`);
