import os from 'node:os';
import { Worker } from 'node:worker_threads';
import { join } from 'path';

const initialNumber = 10;

const performCalculations = async () => {
	const filePath = join(import.meta.dirname, 'worker.js');
	const numberOfThreads = os.cpus().length;
	const promises = [];

	for (let i = 0; i < numberOfThreads; i++) {
		const promise = new Promise((resolve) => {
			const worker = new Worker(filePath, {
				workerData: initialNumber + i,
			});
			worker.on('message', (data) => {
				resolve({
					status: 'resolved',
					data,
				});
			});
			worker.on('error', () => {
				resolve({ status: 'error', data: null });
			});
			worker.on('exit', (code) => {
				if (code !== 0 && !promises[i]) {
					resolve({ status: 'error', data: null });
				}
			});
		});

		promises.push(promise);
	}

	console.log(await Promise.all(promises));
};

await performCalculations();
