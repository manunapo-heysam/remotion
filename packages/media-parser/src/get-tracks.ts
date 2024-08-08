import type {MoovBox} from './boxes/iso-base-media/moov/moov';
import {trakBoxContainsAudio, trakBoxContainsVideo} from './get-fps';
import type {SamplePosition} from './get-sample-positions';
import {getSamplePositions} from './get-sample-positions';
import type {AnySegment} from './parse-result';
import {
	getFtypBox,
	getMoovBox,
	getMvhdBox,
	getStcoBox,
	getStscBox,
	getStszBox,
	getTkhdBox,
	getTraks,
	getVideoDescriptors,
} from './traversal';

export type Track = {
	type: 'audio' | 'video';
	samplePositions: SamplePosition[];
	trackId: number;
	description: Uint8Array | null;
};

// TODO: Use this to determine if all tracks are present
export const getNumberOfTracks = (moovBox: MoovBox): number => {
	const mvHdBox = getMvhdBox(moovBox);
	if (!mvHdBox) {
		return 0;
	}

	return mvHdBox.nextTrackId - 1;
};

export const hasTracks = (segments: AnySegment[]): boolean => {
	const moovBox = getMoovBox(segments);
	const ftypBox = getFtypBox(segments);

	if (!moovBox) {
		if (ftypBox) {
			return false;
		}

		// TODO: Support Matroska
		return true;
	}

	const numberOfTracks = getNumberOfTracks(moovBox);
	const tracks = getTraks(moovBox);

	return tracks.length === numberOfTracks;
};

export const getTracks = (segments: AnySegment[]): Track[] => {
	const moovBox = getMoovBox(segments);
	if (!moovBox) {
		return [];
	}

	const foundTracks: Track[] = [];
	const tracks = getTraks(moovBox);

	for (const track of tracks) {
		const stszBox = getStszBox(track);
		const stcoBox = getStcoBox(track);
		const stscBox = getStscBox(track);
		const tkhdBox = getTkhdBox(track);
		const videoDescriptors = getVideoDescriptors(track);

		if (!tkhdBox) {
			throw new Error('Expected tkhd box in trak box');
		}

		if (!stszBox) {
			throw new Error('Expected stsz box in trak box');
		}

		if (!stcoBox) {
			throw new Error('Expected stco box in trak box');
		}

		if (!stscBox) {
			throw new Error('Expected stsc box in trak box');
		}

		const samplePositions = getSamplePositions({
			stcoBox,
			stscBox,
			stszBox,
		});

		if (trakBoxContainsAudio(track)) {
			foundTracks.push({
				type: 'audio',
				samplePositions,
				trackId: tkhdBox.trackId,
				description: null,
			});
		}

		if (trakBoxContainsVideo(track)) {
			foundTracks.push({
				type: 'video',
				samplePositions,
				trackId: tkhdBox.trackId,
				description: videoDescriptors,
			});
		}
	}

	return foundTracks;
};
