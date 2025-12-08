/*
  Advent of Code 2025 - Jerren Trifan
  Day 8
  Link to problem and instructions: https://adventofcode.com/2025/day/8
*/
import { GetFileData } from '../util';

// linked list solution is probably better

type Point3D = {
	x: number;
	y: number;
	z: number;
};
const inputData = await GetFileData();

let lines = inputData
	.split('\n')
	.filter(Boolean)
	.map((line) => {
		const [x, y, z] = line.split(',').map(Number);
		return { x, y, z } as Point3D;
	});

// console.log(lines);

function distanceSquared(p1: Point3D, p2: Point3D): number {
	const dx = p2.x - p1.x;
	const dy = p2.y - p1.y;
	const dz = p2.z - p1.z;
	return dx * dx + dy * dy + dz * dz;
}

const p1 = (connectionCount: number) => {
	let chains = new Map<Point3D, number>();
	let attemptedPairs = new Set<string>(); // track which pairs have been tried

	const pairKey = (a: Point3D, b: Point3D) => {
		// key for this pair
		const key1 = `${a.x},${a.y},${a.z}`;
		const key2 = `${b.x},${b.y},${b.z}`;
		return key1 < key2 ? `${key1}|${key2}` : `${key2}|${key1}`;
	};

	const isAlreadyJoined = (j1: Point3D, j2: Point3D) => {
		const chain1 = chains.get(j1);
		const chain2 = chains.get(j2);

		if (chain1 === undefined || chain2 === undefined) {
			return false;
		}

		return chain1 === chain2;
	};

	let globalChainId = 0;

	for (let i = 0; i < connectionCount; i++) {
		let minDist = Number.MAX_SAFE_INTEGER;
		let minBoxA: Point3D | undefined = undefined;
		let minBoxB: Point3D | undefined = undefined;

		for (let j = 0; j < lines.length; j++) {
			const boxA = lines[j];
			for (let k = j + 1; k < lines.length; k++) {
				const boxB = lines[k];

				// skip already attempted pairs
				if (attemptedPairs.has(pairKey(boxA, boxB))) {
					continue;
				}

				const dist = distanceSquared(boxA, boxB);
				if (dist < minDist) {
					minBoxA = boxA;
					minBoxB = boxB;
					minDist = dist;
				}
			}
		}

		if (!minBoxA || !minBoxB) break;

		// mark pair as attempted
		attemptedPairs.add(pairKey(minBoxA, minBoxB));

		if (isAlreadyJoined(minBoxA, minBoxB)) {
			// if joined, then skip
			continue;
		}

		const boxAChain = chains.get(minBoxA);
		const boxBChain = chains.get(minBoxB);

		if (!boxAChain && !boxBChain) {
			globalChainId++;
			chains.set(minBoxA, globalChainId);
			chains.set(minBoxB, globalChainId);
		} else if (boxAChain && !boxBChain) {
			chains.set(minBoxB, boxAChain);
		} else if (boxBChain && !boxAChain) {
			chains.set(minBoxA, boxBChain);
		} else if (boxAChain && boxBChain) {
			chains.forEach((value, key) => {
				if (value === boxBChain) {
					chains.set(key, boxAChain);
				}
			});
		}
	}

	for (let i = 0; i < lines.length; i++) {
		if (!chains.get(lines[i])) {
			globalChainId++;
			chains.set(lines[i], globalChainId);
		}
	}

	return chains;
};

const resultP1 = p1(10);

const reducedP1 = [...resultP1.values()].reduce(
	(acc, value) => {
		acc[value] = (acc[value] || 0) + 1;
		return acc;
	},
	{} as Record<number, number>
);

const productP1 = Object.values(reducedP1)
	.sort((a, b) => b - a)
	.slice(0, 3)
	.reduce((acc, val) => acc * val, 1);

console.log(`p1 result: ${productP1}`);

const p2 = () => {
	let chains = new Map<Point3D, number>();
	let attemptedPairs = new Set<string>(); // track which pairs have been tried

	const pairKey = (a: Point3D, b: Point3D) => {
		// key for this pair
		const key1 = `${a.x},${a.y},${a.z}`;
		const key2 = `${b.x},${b.y},${b.z}`;
		return key1 < key2 ? `${key1}|${key2}` : `${key2}|${key1}`;
	};

	const isAlreadyJoined = (j1: Point3D, j2: Point3D) => {
		const chain1 = chains.get(j1);
		const chain2 = chains.get(j2);

		if (chain1 === undefined || chain2 === undefined) {
			return false;
		}

		return chain1 === chain2;
	};

	let globalChainId = 0;

	for (let i = 0; i < 1000000000; i++) {
		console.log(`i: ${i}, attemptedPairs: ${attemptedPairs.size}`);
		let minDist = Number.MAX_SAFE_INTEGER;
		let minBoxA: Point3D | undefined = undefined;
		let minBoxB: Point3D | undefined = undefined;

		for (let j = 0; j < lines.length; j++) {
			const boxA = lines[j];
			for (let k = j + 1; k < lines.length; k++) {
				const boxB = lines[k];

				// skip already attempted pairs
				if (attemptedPairs.has(pairKey(boxA, boxB))) {
					continue;
				}

				const dist = distanceSquared(boxA, boxB);
				if (dist < minDist) {
					minBoxA = boxA;
					minBoxB = boxB;
					minDist = dist;
				}
			}
		}

		if (!minBoxA || !minBoxB) break;

		// mark pair as attempted
		attemptedPairs.add(pairKey(minBoxA, minBoxB));

		if (isAlreadyJoined(minBoxA, minBoxB)) {
			// if joined, then skip
			continue;
		}

		const boxAChain = chains.get(minBoxA);
		const boxBChain = chains.get(minBoxB);

		if (!boxAChain && !boxBChain) {
			globalChainId++;
			chains.set(minBoxA, globalChainId);
			chains.set(minBoxB, globalChainId);
		} else if (boxAChain && !boxBChain) {
			chains.set(minBoxB, boxAChain);
		} else if (boxBChain && !boxAChain) {
			chains.set(minBoxA, boxBChain);
		} else if (boxAChain && boxBChain) {
			chains.forEach((value, key) => {
				if (value === boxBChain) {
					chains.set(key, boxAChain);
				}
			});
		}

		const rec = [...chains.values()].reduce(
			(acc, value) => {
				acc[value] = (acc[value] || 0) + 1;
				return acc;
			},
			{} as Record<number, number>
		);

		// if only 1 chain and it contains all boxes
		if (Object.keys(rec).length === 1 && Object.values(rec)[0] === lines.length) {
			return minBoxA.x * minBoxB.x;
		}
	}
};

const resultP2 = p2();

console.log(`p2 result: ${JSON.stringify(resultP2, null, 2)}`);
