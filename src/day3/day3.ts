/*
  Advent of Code 2025 - Jerren Trifan
  Day 3
  Link to problem and instructions: https://adventofcode.com/2025/day/3
*/
import { GetFileData } from '../util';

const inputData = await GetFileData();

const banks = inputData.split('\n').filter(Boolean);

// console.log(banks);

const p1 = () => {
	let total = 0;
	for (let i = 0; i < banks.length; i++) {
		let max = 0;
		let bank = banks[i];
		let bankLength = bank.length;

		for (let j = 0; j < bankLength - 1; j++) {
			let first = bank[j];
			for (let k = j + 1; k < bankLength; k++) {
				let second = bank[k];
				let parsed = Number(first.toString() + second.toString());
				if (parsed > max) {
					max = parsed;
				}
			}
		}
		total += max;
		// console.log(`max ${max}, total ${total}`);
	}
	return total;
};

console.log(`p1 result: ${p1()}`);

const p2 = () => {
	let total = BigInt(0);
	for (let i = 0; i < banks.length; i++) {
		const digits = banks[i].split('').map((n) => Number(n));
		const len = digits.length;
		const MAX_TWELVE = 12;

		// select 12 digits to form max number
		if (len < MAX_TWELVE) continue;

		// each loop pick the largest digit if enough digits left remaining
		const selectedDigits: number[] = [];
		let startIdx = 0;

		for (let j = 0; j < MAX_TWELVE; j++) {
			const digitsLeftToPick = MAX_TWELVE - j; // including self
			// from startIdx to (n - remaining) inclusive
			const endIdx = len - digitsLeftToPick;

			let maxDigit = -1;
			let maxDigitIdx = startIdx;

			for (let idx = startIdx; idx <= endIdx; idx++) {
				if (digits[idx] > maxDigit) {
					maxDigit = digits[idx];
					maxDigitIdx = idx;
				}
			}

			selectedDigits.push(maxDigit);
			startIdx = maxDigitIdx + 1; // next digit must come after current
		}

		const resultNumber = BigInt(selectedDigits.join(''));
		total += resultNumber;
	}
	return total;
};

console.log(`p2 result: ${p2()}`);
