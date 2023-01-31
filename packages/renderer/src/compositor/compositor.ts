import {spawn} from 'child_process';
import {getExecutablePath} from './get-executable-path';
import type {
	CompositorCommand,
	CompositorInitiatePayload,
	SomePayload,
} from './payloads';

export type Compositor = {
	finishCommands: () => void;
	executeCommand: (payload: Omit<CompositorCommand, 'nonce'>) => Promise<void>;
	waitForDone: () => Promise<void>;
};

const compositorMap: Record<string, Compositor> = {};

export const spawnCompositorOrReuse = ({
	initiatePayload,
	renderId,
}: {
	initiatePayload: CompositorInitiatePayload;
	renderId: string;
}) => {
	if (!compositorMap[renderId]) {
		compositorMap[renderId] = startCompositor(initiatePayload);
	}

	return compositorMap[renderId];
};

export const releaseCompositorWithId = (renderId: string) => {
	if (compositorMap[renderId]) {
		compositorMap[renderId].finishCommands();
	}
};

export const waitForCompositorWithIdToQuit = (renderId: string) => {
	if (!compositorMap[renderId]) {
		throw new TypeError('No compositor with that id');
	}

	return compositorMap[renderId].waitForDone();
};

const startCompositor = (
	compositorInitiatePayload: CompositorInitiatePayload
): Compositor => {
	const bin = getExecutablePath();

	const child = spawn(`${bin}`, [JSON.stringify(compositorInitiatePayload)]);

	const stderrChunks: Buffer[] = [];

	let stdoutListeners: ((d: SomePayload) => void)[] = [];

	child.stdout.on('data', (d) => {
		const str = d.toString('utf-8') as string;
		try {
			const payloads = str
				.split('--debug-end--')
				.map((t) => t.trim())
				.filter(Boolean);
			for (const payload of payloads) {
				const p = JSON.parse(
					payload.replace('--debug-start--', '')
				) as SomePayload;
				if (p.msg_type === 'debug') {
					console.log('Rust debug', p.msg);
				}

				stdoutListeners.forEach((s) => s(p));
			}
		} catch (e) {
			console.log({str});
		}
	});

	let nonce = 0;

	return {
		waitForDone: () => {
			return new Promise((resolve, reject) => {
				child.on('exit', (code) => {
					if (code === 0) {
						resolve();
					} else {
						reject(Buffer.concat(stderrChunks).toString('utf-8'));
					}
				});
			});
		},
		finishCommands: () => {
			child.stdin.write('EOF\n');
		},
		executeCommand: (payload) => {
			const actualPayload: CompositorCommand = {
				...payload,
				nonce,
			};
			nonce++;
			return new Promise((resolve, reject) => {
				child.stdin.write(JSON.stringify(actualPayload) + '\n');

				const onStdout = (p: SomePayload) => {
					if (p.msg_type === 'finish' && p.nonce === actualPayload.nonce) {
						resolve();
						stdoutListeners = stdoutListeners.filter((s) => s !== onStdout);
					}

					if (p.msg_type === 'error') {
						const err = new Error(p.error);
						err.stack = p.error + '\n' + p.backtrace;

						reject(err);
						stdoutListeners = stdoutListeners.filter((s) => s !== onStdout);
					}
				};

				stdoutListeners.push(onStdout);
			});
		},
	};
};
