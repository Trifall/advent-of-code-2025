/*
  Advent of Code 2025 - Jerren Trifan
  Day 5
  Link to problem and instructions: https://adventofcode.com/2025/day/5
*/
import { GetFileData } from '../util';

const inputData = await GetFileData();

let lines = inputData.split('\n');
let ranges = lines.splice(0, lines.indexOf(''));
let availables = lines.filter(Boolean);

const p1 = () => {
	let freshCount = 0;
	for (let i = 0; i < availables.length; i++) {
		for (let j = 0; j < ranges.length; j++) {
			const [lower, upper] = ranges[j].split('-').map((s) => Number(s));
			if (Number(availables[i]) >= lower && Number(availables[i]) <= upper) {
				freshCount++;
				break;
			}
		}
	}
	return freshCount;
};

console.log(`p1 result: ${p1()}`);

const p2 = () => {
	let set = new Set<string>();

	const rangesOverlap = (range1: string, range2: string) => {
		const [lower1, upper1] = range1.split('-').map((s) => Number(s));
		const [lower2, upper2] = range2.split('-').map((s) => Number(s));
		// check if ranges overlap or are adjacent
		return !(upper1 < lower2 - 1 || upper2 < lower1 - 1);
	};

	for (let i = 0; i < ranges.length; i++) {
		const [lower, upper] = ranges[i].split('-').map((s) => Number(s));

		if (set.size === 0) {
			set.add(ranges[i]);
			continue;
		}

		let minLower = lower;
		let maxUpper = upper;
		let overlappingRanges = [];

		// find overlapping ranges and find bounds
		for (let storedRange of set) {
			if (rangesOverlap(ranges[i], storedRange)) {
				const [storedLower, storedUpper] = storedRange.split('-').map((s) => Number(s));
				minLower = Math.min(minLower, storedLower);
				maxUpper = Math.max(maxUpper, storedUpper);
				overlappingRanges.push(storedRange);
			}
		}

		overlappingRanges.forEach((range) => set.delete(range));

		// add the merged range
		set.add(`${minLower}-${maxUpper}`);

		// console.log(`i ${i}, set ${Array.from(set)}`);
	}

	let total = 0;
	for (let range of set) {
		const [lower, upper] = range.split('-').map((s) => Number(s));
		total += upper - lower + 1;
	}
	return total;
};

console.log(`p2 result: ${p2()}`);
