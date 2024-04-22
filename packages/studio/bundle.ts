import {build} from 'bun';

const mainModule = await build({
	entrypoints: ['src/index.ts'],
	naming: '[name].mjs',
	external: ['react', 'remotion', 'remotion/no-react', 'react/jsx-runtime'],
});

const [file] = mainModule.outputs;
const text = (await file.text())
	.replace(/jsxDEV/g, 'jsx')
	.replace(/react\/jsx-dev-runtime/g, 'react/jsx-runtime');

await Bun.write('dist/esm/index.mjs', text);

const internalsModule = await build({
	entrypoints: ['src/internals.ts'],
	naming: 'internals.mjs',
	external: ['react', 'remotion', 'remotion/no-react', 'react/jsx-runtime'],
});
const [enableFile] = internalsModule.outputs;
const skiaEnable = await enableFile.text();

await Bun.write('dist/esm/internals.mjs', skiaEnable);

export {};
