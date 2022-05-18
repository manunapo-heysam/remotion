import React, {forwardRef, useCallback, useEffect, useState} from 'react';
import {continueRender, delayRender} from './delay-render';

const ImgRefForwarding: React.ForwardRefRenderFunction<
	HTMLImageElement,
	React.DetailedHTMLProps<
		React.ImgHTMLAttributes<HTMLImageElement>,
		HTMLImageElement
	>
> = ({onLoad, onError, ...props}, ref) => {
	const [handle] = useState(() =>
		delayRender('Loading <Img> with src=' + props.src)
	);

	useEffect(() => {
		if (
			ref &&
			(ref as React.MutableRefObject<HTMLImageElement>).current.complete
		) {
			continueRender(handle);
		}
	}, [handle, ref]);

	const didLoad = useCallback(
		(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
			continueRender(handle);
			onLoad?.(e);
		},
		[handle, onLoad]
	);

	const didGetError = useCallback(
		(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
			continueRender(handle);
			if (onError) {
				onError(e);
			} else {
				console.error(
					'Error loading image:',
					e,
					'Handle the event using the onError() prop to make this message disappear.'
				);
			}
		},
		[handle, onError]
	);

	useEffect(() => {
		console.log('mounting', props.src);
		return () => {
			continueRender(handle);
			console.log('unmounting', props.src);
		};
	}, []);

	return <img {...props} ref={ref} onLoad={didLoad} onError={didGetError} />;
};

export const Img = forwardRef(ImgRefForwarding);
