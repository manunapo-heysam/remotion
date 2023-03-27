import {readFileSync} from 'fs';
import path from 'path';
import {expect, test} from 'vitest';
import {updateDefaultProps} from '../codemods/update-default-props';

test('Should be able to update default props', async () => {
	const file = readFileSync(
		path.join(__dirname, 'snapshots', 'root-before.tsx'),
		'utf-8'
	);
	const expected = readFileSync(
		path.join(__dirname, 'snapshots', 'root-after.tsx'),
		'utf-8'
	);

	const update = await updateDefaultProps({
		input: file,
		compositionId: 'Comp3',
		newDefaultProps: {abc: 'def'},
	});

	expect(update).toBe(expected);
});
