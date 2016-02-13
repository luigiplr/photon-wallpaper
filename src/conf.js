export default {
	syncOptions: ['Every Hour', 'Every Day', 'Bi-Daily', 'Every Week', 'Every Month'],

	providers: {
		bing: {
			resolutions: [{
				value: '1920x1080',
				text: 'FHD (1920 × 1080)'
			}, {
				value: '1280x720',
				text: 'HD (1280 x 720)'
			}]
		},

		reddit: {
			resolutions: [{
				value: 'highest',
				text: 'Highest Available'
			}, {
				value: '7680x4320',
				text: '8K UHD (7680 x 4320)'
			}, {
				value: '5120x2880',
				text: '5K UHD+ (5120 x 2880)'
			}, {
				value: '3840x2160',
				text: '4K UHD+ (3840 x 2160)'
			}, {
				value: '3200x1800',
				text: 'WQXGA+ (3200 x 1800)'
			}, {
				value: '2560x1440',
				text: 'WQHD (2560 x 1440)'
			}, {
				value: '1920x1080',
				text: 'FHD (1920 × 1080)'
			}, {
				value: '1280x720',
				text: 'HD (1280 x 720)'
			}, {
				value: 'lowest',
				text: 'Lowest Available'
			}]
		}

	}
}