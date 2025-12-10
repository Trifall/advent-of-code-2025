/*
  Advent of Code 2025 - Jerren Trifan
  Day 10
  Link to problem and instructions: https://adventofcode.com/2025/day/10
*/

import { GetFileData } from '../util';

const inputData = await GetFileData();

type Machine = {
	indicator_lights: string[];
	buttons: number[][];
	joltage: number[];
};

let machines = inputData
	.split('\n')
	.filter(Boolean)
	.map((v) => {
		const indicator_lights = v.substring(1, v.indexOf(']')).split('');
		const buttons_str = v
			.substring(v.indexOf(']') + 1, v.indexOf('{') - 1)
			.split(' ')
			.filter(Boolean);
		let buttons: number[][] = [];
		for (let i = 0; i < buttons_str.length; i++) {
			const val = buttons_str[i]
				.substring(1, buttons_str[i].length - 1)
				.split(',')
				.map((v) => Number(v));
			buttons.push(val);
		}
		const joltage = v
			.substring(v.indexOf('{') + 1, v.length - 1)
			.split(',')
			.map((v) => Number(v));
		return {
			indicator_lights,
			buttons,
			joltage,
		} as Machine;
	});

const randomIntFromInterval = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

const pressLightsButton = (button: number[], current: string[]) => {
	for (let i = 0; i < button.length; i++) {
		if (current[button[i]] === '.') {
			current[button[i]] = '#';
		} else {
			current[button[i]] = '.';
		}
	}
	return current;
};

const p1 = () => {
	console.log(`machines: ${JSON.stringify(machines, null, 2)}`);
	let total = 0;

	for (let i = 0; i < machines.length; i++) {
		console.log(`starting machine ${i} / ${machines.length}. total: ${total}`);
		const targetLights = machines[i].indicator_lights;
		let allButtons = machines[i].buttons;

		let min = Number.MAX_SAFE_INTEGER;
		for (let k = 0; k < 10000; k++) {
			let temp = 0;
			let currentLights = Array(targetLights.length).fill('.');
			// console.log(`resetting`);
			for (let j = 0; j < 50; j++) {
				temp++;
				let idx = randomIntFromInterval(0, allButtons.length - 1);
				// console.log(
				// 	`current: ${currentLights.join('')}, pressing button- idx: ${idx}, v: ${allButtons[idx]}`
				// );
				currentLights = pressLightsButton(allButtons[idx], currentLights);
				// console.log(`\ntarget : ${targetLights.join('')}, current: ${currentLights.join('')}`);
				if (currentLights.join('') === targetLights.join('')) {
					if (temp < min) {
						min = temp;
						console.log(`new min ${min}`);
					}
					break;
				}
			}
		}
		if (min > 10000000) {
			console.log(`didnt find min`);
		} else {
			console.log(`adding min ${min} to total ${total}`);
			total += min;
		}
	}

	return total;
};

console.log(`p1 result: ${p1()}`);
