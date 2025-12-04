import { readdir, unlink } from 'fs/promises';

const currentDirectory = import.meta.dir;

const directoryData = await readdir(currentDirectory);

if (!directoryData) throw Error(`Couldn't read directory data from ${currentDirectory}`);

let dayDirectories = directoryData.filter((val) => val.includes('day')).sort();

// loop over each day directory
for (const dayDirectory of dayDirectories) {
	const filesToDelete = ['instructions.txt', 'input.txt', 'example.txt'];

	for (const fileName of filesToDelete) {
		const filePath = `${currentDirectory}/${dayDirectory}/${fileName}`;
		const printablePath = `${dayDirectory}/${fileName}`;

		try {
			await unlink(filePath);
			console.log(`✓ Removed ${printablePath}`);
		} catch (error: any) {
			if (error.code !== 'ENOENT') {
				console.error(`𐄂 Failed to remove ${printablePath}:`, error);
			}
		}
	}
}
