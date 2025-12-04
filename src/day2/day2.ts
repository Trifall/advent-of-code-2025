/*
  Advent of Code 2025 - Jerren Trifan
  Day 2
  Link to problem and instructions: https://adventofcode.com/2025/day/2
*/
import { GetFileData } from '../util';

const inputData = await GetFileData();

const lines = inputData.split(',').filter(Boolean);

console.log(lines);

const p1 = () => {
	let total = 0;
	for (let i = 0; i < lines.length; i++) {
		let idOne = lines[i].split('-')[0];
		let parsedIdOne = Number(idOne);
		let idTwo = lines[i].split('-')[1];
		let parsedIdTwo = Number(idTwo);

		for (let j = parsedIdOne; j <= parsedIdTwo; j++) {
			let str = j.toString();
			for (let k = 0; k < str.length / 2; k++) {
				let temp = str.substring(0, k + 1);
				let numberOfOcc = str.split(temp).length - 1;

				if (temp.length * numberOfOcc === str.length && numberOfOcc === 2) {
					console.log(`Found match with str ${str}, pattern ${temp} numberOfOcc ${numberOfOcc}`);
					total += Number(str);
				}
			}
		}
	}

	return total;
};

console.log(`p1 result: ${p1()}`);

const p2 = () => {
	let total = 0;
	for (let i = 0; i < lines.length; i++) {
		let idOne = lines[i].split('-')[0];
		let parsedIdOne = Number(idOne);
		let idTwo = lines[i].split('-')[1];
		let parsedIdTwo = Number(idTwo);

		for (let j = parsedIdOne; j <= parsedIdTwo; j++) {
			let str = j.toString();
			let match = false;
			for (let k = 0; k < str.length / 2 + 1; k++) {
				let temp = str.substring(0, k + 1);
				let numberOfOcc = str.split(temp).length - 1;

				if (temp.length * numberOfOcc === str.length && numberOfOcc > 1) {
					match = true;
				}
			}
			if (match) {
				total += Number(str);
			}
		}
	}

	return total;
};

console.log(`p2 result: ${p2()}`);
