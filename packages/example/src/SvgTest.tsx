import {useCurrentFrame, useVideoConfig} from 'remotion';

export const SvgTest = () => {
	const {height, width} = useVideoConfig();
	const frame = useCurrentFrame();

	const radius = 400;

	return (
		// TODO: Does not work without xmlns
		<svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`}>
			<ellipse
				ry={radius}
				rx={radius / 2}
				cx={width / 2}
				cy={height / 2}
				transform={'rotate(' + frame + ')'}
				style={{
					transformOrigin: 'center center',
					transformBox: 'fill-box',
				}}
				stroke="pink"
				strokeWidth={40}
				fill="none"
			/>
		</svg>
	);
};
