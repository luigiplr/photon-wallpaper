const Providers = {
  bing: {
    resolutions: [{
      value: '1920x1080',
      text: 'FHD (1920 × 1080)'
    }, {
      value: '1280x720',
      text: 'HD (1280 x 720)'
    }],
    monitorOptions: [],
    regionOptions: [{
      code: 'en-US',
      text: 'North America',
    }, {
      code: 'zh-CN',
      text: 'Europe'
    }, {
      code: 'ja-JP',
      text: 'Asia'
    }],
    syncOptions: ['every_day', 'bi_daily', 'every_week', 'every_month']
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
    }],
    sortOptions: ['top', 'hot', 'new', 'controversial'],
    fromOptions: ['hour', 'day', 'week', 'month', 'all'],
    minimumScoreOptions: [0, 50, 100, 200, 300, 400, 500, 1000],
    monitorOptions: [1, 2, 3],
    syncOptions: ['every_30_minutes', 'every_hour', 'every_day', 'bi_daily', 'every_week', 'every_month']
  },
  windows_spotlight: {
    resolutions: [{
      value: '1920x1080',
      text: 'FHD (1920 × 1080)'
    }],
    syncOptions: ['every_30_minutes', 'every_hour', 'every_day', 'bi_daily', 'every_week', 'every_month']
  }
}
