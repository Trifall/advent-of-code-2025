/*
  Advent of Code 2025 - Jerren Trifan
  Day 6
  Link to problem and instructions: https://adventofcode.com/2025/day/6
*/
import { GetFileData } from '../util';

const inputData = await GetFileData();

let lines = inputData.split('\n').filter(Boolean);

console.log(lines);

const doOperation = (val1: number, val2: number, op: string) => {
	// multiply together, dataset has no zeros, so just max 1 and vals for multiplying
	if (op === '*') {
		return Math.max(1, val1) * Math.max(1, val2);
	}
	return val1 + val2;
};

const p1 = () => {
	let eqs: string[][] = [];

	for (let i = 0; i < lines.length; i++) {
		lines[i]
			.split(' ')
			.filter(Boolean)
			.forEach((val, idx) => {
				if (!eqs[idx]) eqs[idx] = [];
				eqs[idx].push(val);
			});
	}

	let total = 0;
	for (let n = 0; n < eqs.length; n++) {
		let result = 0;
		let op = eqs[n][eqs[n].length - 1];

		for (let i = eqs[n].length - 2; i >= 0; i--) {
			let val: number = Number(eqs[n][i]);
			result = doOperation(val, result, op);
		}

		total += result;
	}

	return total;
};

console.log(`p1 result: ${p1()}`);

const p2 = () => {
	// extracts the column
	const arrayColumn = (arr: string[][], n: number) => arr.map((x) => x[n]).filter(Boolean);

	// if its an all-empty column, this must be a gap between two equations
	const isSeparatorCol = (arr: string[]) => {
		if (!arr) return;
		for (let i = 0; i < arr.length; i++) {
			let val = arr[i];
			if (val !== ' ') {
				return false;
			}
		}
		return true;
	};

	// split at newline, but split every character (keep spaces)
	let data = inputData.split('\n').map((val) => val.split(''));
	let cols: string[][] = [];
	// extract all the columns out of the lines
	for (let i = 0; i < data[0].length + 1; i++) {
		const col = arrayColumn(data, i);
		if (!cols[i]) cols[i] = [];
		cols.push(col);
	}

	let op = '';
	let temp: string[] = [];
	let total = 0;

	// op is the operation for the current equation (resets after)
	// temp is an array of stringified numbers
	// total is the overall total
	const handleMath = () => {
		let result = 0;
		temp = temp.filter(Boolean);
		for (let m = 0; m < temp.length; m++) {
			let num = Number(temp[m]);
			result = doOperation(num, result, op);
		}
		total += result;
		op = '';
		temp = [];
	};

	// loop over all columns
	for (let i = 0; i < cols.length + 1; i++) {
		// if you aren't on the extra-run column, and there isnt anything in it, skip
		if (i !== cols.length && cols[i].length === 0) {
			continue;
		} // if you are at the extra-run column for the last calc, and there is items left, then run the math handler
		else if (i === cols.length && temp.filter(Boolean).length > 0) {
			handleMath();
			break;
		} // if you are over the extra-run and somehow made it here, exit loop
		else if (i > cols.length) {
			break;
		}

		// if its a separator column, that means we have all the data for the equation
		// so do the math
		if (isSeparatorCol(cols[i])) {
			handleMath();
		}

		// merge the numbers from each column that we extracted earlier (e.g (2,4) -> 24)
		let num = '';
		for (let h = 0; h < cols[i].length; h++) {
			const val = cols[i][h];
			// if not op, then append
			if (val !== '*' && val !== '+') {
				num += val;
			} // if op, then set it
			else if (val === '*' || val === '+') {
				op = val;
			}
		}
		// numbers are merged into resulting big num, add to temp array
		temp.push(num.trim());
		// at this point, we should have the list of numbers and the operation, next loop will run calc
	}

	return total;
};

console.log(`p2 result: ${p2()}`);
