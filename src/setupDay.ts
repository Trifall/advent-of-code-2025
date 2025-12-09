import { readdir, mkdir } from 'fs/promises';
import { getHeaderContent } from './addCommentHeader';

const srcDir = import.meta.dir;

async function setupDay() {
	const args = process.argv.slice(2);
	let dayNumber: number;

	if (args.length > 0) {
		dayNumber = parseInt(args[0], 10);
		if (isNaN(dayNumber)) {
			console.error('Invalid day number provided.');
			process.exit(1);
		}
	} else {
		// scan for existing days
		const files = await readdir(srcDir);
		const dayDirs = files.filter((f) => f.startsWith('day') && !isNaN(parseInt(f.slice(3))));
		const dayNums = dayDirs.map((d) => parseInt(d.slice(3))).sort((a, b) => a - b);
		dayNumber = (dayNums.length > 0 ? dayNums[dayNums.length - 1] : 0) + 1;
	}

	const dayDirName = `day${dayNumber}`;
	const dayDirPath = `${srcDir}/${dayDirName}`;

	// check if folder exists
	const files = await readdir(srcDir);
	if (files.includes(dayDirName)) {
		console.log(`Folder ${dayDirName} already exists!`);
		return;
	}

	console.log(`Setting up Day ${dayNumber}...`);
	try {
		await mkdir(dayDirPath);
	} catch (e: any) {
		if (e.code === 'EEXIST') {
			console.log(`Folder ${dayDirName} already exists!`);
			return;
		}
		throw e;
	}

	// Create files
	const tsFile = `${dayDirPath}/day${dayNumber}.ts`;
	const inputFile = `${dayDirPath}/input.txt`;
	const exampleFile = `${dayDirPath}/example.txt`;

	const header = getHeaderContent(dayNumber);
	const tsContent = `${header}

import { GetFileData } from '../util';

const inputData = await GetFileData();

const p1 = () => {
    return 0;
};

console.log(\`p1 result: \${p1()}\`);

const p2 = () => {
    return 0;
};

console.log(\`p2 result: \${p2()}\`);
`;

	await Bun.write(tsFile, tsContent);
	await Bun.write(inputFile, '');
	await Bun.write(exampleFile, '');

	console.log(`Done! Created ${dayDirName} with boilerplate.`);
}

setupDay();
