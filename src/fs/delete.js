import { rm } from 'fs/promises';
import { join } from 'path';

const remove = async () => {
	const pathName = join(import.meta.dirname, 'files', 'fileToRemove.txt');
	try {
		await rm(pathName);
	} catch {
		console.error('FS operation failed');
	}
};

await remove();
