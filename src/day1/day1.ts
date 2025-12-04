/*
  Advent of Code 2025 - Jerren Trifan
  Day 1
  Link to problem and instructions: https://adventofcode.com/2025/day/1
*/
import { GetFileData } from '../util';

const inputData = await GetFileData();

const lines = inputData.split('\n').filter(Boolean);

console.log(lines);

const p1 = () => {
	let count = 0;
	let cur = 50;
	for (let i = 0; i < lines.length; i++) {
		if (lines[i][0] === 'L') {
			// left logic
			let premod = cur - Number(lines[i].substring(1));
			let temp = premod % 100;
			if (temp < 0) {
				cur = 100 - Math.abs(temp);
			} else {
				cur = temp;
			}
		} else {
			// right logic
			let premod = cur + Number(lines[i].substring(1));
			let temp = premod % 100;
			if (temp > 99) {
				cur = Math.abs(temp) - 100;
			} else {
				cur = temp;
			}
		}

		if (cur === 0) {
			count++;
		}
	}
	return count;
};

console.log(`p1 result: ${p1()}`);

const p2 = () => {
	let totalZeroCount = 0;
	let cur = 50;

	for (let i = 0; i < lines.length; i++) {
		const dir = lines[i][0];
		const distance = Number(lines[i].substring(1));

		if (dir === 'L') {
			// left logic
			let tempZeroCount: number;
			if (cur === 0) {
				tempZeroCount = Math.floor(distance / 100);
			} else {
				if (distance >= cur) {
					tempZeroCount = 1 + Math.floor((distance - cur) / 100);
				} else {
					tempZeroCount = 0;
				}
			}
			totalZeroCount += tempZeroCount;

			cur = (((cur - distance) % 100) + 100) % 100;
		} else {
			// right logic
			let tempZeroCount: number;
			if (cur === 0) {
				tempZeroCount = Math.floor(distance / 100);
			} else {
				const firstZeroAt = 100 - cur;
				if (distance >= firstZeroAt) {
					tempZeroCount = 1 + Math.floor((distance - firstZeroAt) / 100);
				} else {
					tempZeroCount = 0;
				}
			}
			totalZeroCount += tempZeroCount;

			cur = (cur + distance) % 100;
		}
	}

	return totalZeroCount;
};

console.log(`p2 result: ${p2()}`);
