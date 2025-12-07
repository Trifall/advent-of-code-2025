import os from 'os';

export const GetFileData = async (IS_EXAMPLE_OVERRIDE?: boolean) => {
	// get the file path up to the last folder
	const IS_EXAMPLE =
		Bun.argv.includes('--example') || Bun.argv.includes('-e') || IS_EXAMPLE_OVERRIDE;
	const adjustedSlash = os.platform() === 'win32' ? `\\` : '/';

	const callingPath = Bun.main.split(adjustedSlash).slice(0, -1).join(adjustedSlash);
	console.log(`===${IS_EXAMPLE ? 'EXAMPLE MODE' : 'INPUT MODE'}===`);
	console.log(`Calling Path: ${callingPath.length > 0 ? callingPath : '.' + adjustedSlash}`);
	const inputFilePath = IS_EXAMPLE
		? `${callingPath.length > 0 ? callingPath + adjustedSlash : '.' + adjustedSlash}example.txt`
		: `${callingPath.length > 0 ? callingPath + adjustedSlash : '.' + adjustedSlash}input.txt`;
	const inputFile = Bun.file(`${inputFilePath}`);

	if (!(await inputFile.exists())) {
		console.error(`Couldn't retrieve file with path '${inputFilePath}'`);
		process.exit(0);
	}

	const fileData = await inputFile.text();
	if (!fileData) throw Error(`Couldn't get text data from file '${inputFilePath}'`);

	console.log(`Loaded Input File: ${inputFilePath.split('/').pop()}`);
	return fileData;
};

// Yoinked GCD and LCM functions
export const gcd = (a: number, b: number): any => {
	if (b == 0) return a;
	return gcd(b, a % b);
};

// Returns LCM of array elements
export function findArrayLCM(arr: number[], length: number) {
	let ans = arr[0];

	for (let i = 1; i < length; i++) {
		ans = (arr[i] * ans) / gcd(arr[i], ans);
	}

	return ans;
}

export const getArrayColumn = (arr: string[][], n: number) => arr.map((x) => x[n]).filter(Boolean);

export const dirs4 = [
	[1, 0],
	[-1, 0],
	[0, 1],
	[0, -1],
] as const;

export const dirs8 = [
	[1, 0],
	[-1, 0],
	[0, 1],
	[0, -1],
	[1, 1],
	[1, -1],
	[-1, 1],
	[-1, -1],
] as const;

export const inBounds = (grid: any[][], r: number, c: number) =>
	r >= 0 && c >= 0 && r < grid.length && c < grid[0].length;

export const manhattan = (a: [number, number], b: [number, number]) =>
	Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
