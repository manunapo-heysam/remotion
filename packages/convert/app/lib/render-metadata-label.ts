/* eslint-disable complexity */
export const renderMetadataLabel = (key: string) => {
	if (key === 'com.apple.quicktime.location.accuracy.horizontal') {
		return 'Location Accuracy (Horizontal)';
	}

	if (key === 'artist') {
		return 'Artist';
	}

	if (key === 'album') {
		return 'Album';
	}

	if (key === 'composer') {
		return 'Composer';
	}

	if (key === 'comment') {
		return 'Comment';
	}

	if (key === 'releaseDate') {
		return 'Release Date';
	}

	if (key === 'genre') {
		return 'Genre';
	}

	if (key === 'title') {
		return 'Title';
	}

	if (key === 'writer') {
		return 'Writer';
	}

	if (key === 'director') {
		return 'Director';
	}

	if (key === 'producer') {
		return 'Producer';
	}

	if (key === 'description') {
		return 'Description';
	}

	if (key === 'duration') {
		return 'Metadata Duration';
	}

	if (key === 'encoder') {
		return 'Encoder';
	}

	if (key === 'copyright') {
		return 'Copyright';
	}

	if (key === 'major_brand') {
		return 'Major Brand';
	}

	if (key === 'minor_version') {
		return 'Minor Version';
	}

	if (key === 'compatible_brands') {
		return 'Compatible Brands';
	}

	if (key === 'handler_name') {
		return 'Handler';
	}

	if (key === 'com.apple.quicktime.camera.focal_length.35mm_equivalent') {
		return '35mm-equivalent focal length';
	}

	if (key === 'com.apple.quicktime.camera.lens_model') {
		return 'Lens';
	}

	if (key === 'com.apple.quicktime.creationdate') {
		return 'Created';
	}

	if (key === 'com.apple.quicktime.software') {
		return 'OS Device Version';
	}

	if (key === 'com.apple.quicktime.model') {
		return 'Device';
	}

	if (key === 'com.apple.quicktime.make') {
		return 'Manufacturer';
	}

	if (key === 'com.apple.quicktime.live-photo.vitality-score') {
		return 'Live Photo Vitality Score';
	}

	if (key === 'com.apple.quicktime.live-photo.vitality-scoring-version') {
		return 'Live Photo Vitality Scoring Version';
	}

	if (key === 'com.apple.quicktime.content.identifier') {
		return 'Identifier';
	}

	if (key === 'com.apple.quicktime.full-frame-rate-playback-intent') {
		return 'Should play at full frame rate';
	}

	if (key === 'com.apple.quicktime.location.ISO6709') {
		return 'Location';
	}

	if (key === 'com.apple.quicktime.live-photo.auto') {
		return 'Live Photo Auto Mode';
	}

	return key;
};
