import { readdir } from 'fs/promises';
import { AOC_URL, AOC_YEAR } from 'src/constants';

const currentDirectory = import.meta.dir;

export const getHeaderContent = (dayNumber: string | number) => {
	return [
		'/*',
		`  Advent of Code ${AOC_YEAR} - Jerren Trifan`,
		`  Day ${dayNumber}`,
		`  Link to problem and instructions: ${AOC_URL}/${AOC_YEAR}/day/${dayNumber}`,
		'*/',
	].join('\n');
};

if (import.meta.main) {
	const directoryData = await readdir(currentDirectory);

	if (!directoryData) throw Error(`Couldn't read directory data from ${currentDirectory}`);

	let dayDirectories = directoryData.filter((val) => val.includes('day')).sort();

	// loop over each day directory
	for (const dayDirectory of dayDirectories) {
		const dayNum = dayDirectory.slice(3); // assuming 'day' prefix
		const directoryFilePath = `${currentDirectory}/${dayDirectory}/day${dayNum}.ts`;
		const printableDayDirectory = `${dayDirectory}/day${dayNum}.ts`;

		const scriptFile = await Bun.file(directoryFilePath).text();
		if (!scriptFile) {
			console.error(`✗ Couldn't read script file from ${printableDayDirectory}`);
			continue;
		}

		if (scriptFile.includes('Advent of Code')) {
			console.log(`✓ Header comment already added to ${printableDayDirectory}`);
			continue;
		}

		// construct the header comment
		const headerComment = getHeaderContent(dayNum);

		// prepend the header comment to the script content
		const updatedScriptContent = `${headerComment}\n\n${scriptFile}`;

		// write the updated content back to the file
		await Bun.write(directoryFilePath, updatedScriptContent);
		console.log(`✓ Added header comment to ${printableDayDirectory}`);
	}
}
