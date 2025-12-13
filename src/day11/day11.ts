/*
  Advent of Code 2025 - Jerren Trifan
  Day 11
  Link to problem and instructions: https://adventofcode.com/2025/day/11
*/

import { GetFileData } from '../util';

const inputData = await GetFileData();

console.log(`inputData: ${inputData}`);

const connections = new Map<string, string[]>();

inputData.split('\n').forEach((v) => {
	if (!v.trim()) return; // Skip empty lines

	const s = v.split(': ');
	const cur = s[0];
	const connects = s[1].split(' ').filter(Boolean);

	const existing = connections.get(cur) || [];
	connections.set(cur, [...existing, ...connects]);
});

const p1 = () => {
	let total = 0;
	const re = (current: string) => {
		let dests = connections.get(current);
		if (!dests) return 0;
		if (dests.includes('out')) {
			return 1;
		}
		let temp = 0;
		for (let i = 0; i < dests.length; i++) {
			temp += re(dests[i]);
		}

		return temp;
	};

	total = re('you');

	return total;
};

console.log(`p1 result: ${p1()}`);

const p2 = () => {
	// state bitmask (0=none, 1=fft, 2=dac, 3=both)
	const cache = new Map<string, number[]>();

	const re = (current: string, state: number): number => {
		let newState = state;
		if (current === 'fft') newState = newState | 1; // inc 1
		if (current === 'dac') newState = newState | 2; // inc 2

		let dests = connections.get(current);
		if (!dests) return 0;

		if (dests.includes('out')) {
			// state 3 means both fft and dac have been visited
			return newState === 3 ? 1 : 0;
		}

		const cacheKey = current;
		let nodeCache = cache.get(cacheKey);
		if (nodeCache && nodeCache[newState] !== undefined) {
			return nodeCache[newState];
		}

		let temp = 0;
		for (let dest of dests) {
			temp += re(dest, newState);
		}

		if (!nodeCache) {
			nodeCache = [];
			cache.set(cacheKey, nodeCache);
		}
		nodeCache[newState] = temp;

		return temp;
	};

	return re('svr', 0);
};

console.log(`p2 result: ${p2()}`);
