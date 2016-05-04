class WallpaperSync {
  constructor(provider, resolution, providerSettings) {
    return this[`fetch_${provider}`](Object.assign(providerSettings, { resolution }))
  }

  fetch_unsplash({ grayscale, random, resolution }) {

      const args = []
      if (random) args.push('random')

      const url = `https://unsplash.it/${grayscale ? 'g/' : ''}${resolution.split('x').join('/')}${args.length > 0 ? `/?${args.join('&')}` : '' }`
      this.setWallpaper(url, 'unsplash.jpg')
  }

  fetch_bing({ region, resolution }) {
    const url = `http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=${region}`
    request(url, { json: true }, (error, { statusCode }, body) => {
      if (error || statusCode !== 200) return console.error(error || body)
      const imageURL = `http://www.bing.com${body.images[0].urlbase}_${resolution}.jpg`
      this.setWallpaper(imageURL)
    })
  }

  fetch_windows_spotlight({ resolution, tag }) {
    request('https://arc.msn.com/v3/Delivery/Cache?pid=209567&fmt=json&rafb=0&lo=6000', { json: true }, (error, { statusCode }, body) => {
      if (error || statusCode !== 200) return console.error(error || body)

      const photos = {
        pretty_pictures: [],
        best_of: []
      }

      body.batchrsp.items.map(({ item }) => JSON.parse(item)).forEach(({ ad }) => {
        const { image_fullscreen_001_landscape, image_fullscreen_001_portrait } = ad
        const imageObj = {
          [`${image_fullscreen_001_landscape.w}x${image_fullscreen_001_landscape.h}`]: image_fullscreen_001_landscape.u,
          [`${image_fullscreen_001_portrait.w}x${image_fullscreen_001_portrait.h}`]: image_fullscreen_001_portrait.u,
        }
        const checkString = image_fullscreen_001_landscape.u + image_fullscreen_001_portrait.u
        if (checkString.includes('prettypictures') || checkString.includes('500kb'))
          photos.pretty_pictures.push(imageObj)
        else
          photos.best_of.push(imageObj)
      })

      if (photos[tag].length > 0)
        this.setWallpaper(photos[tag][Math.floor(Math.random() * photos[tag].length)][resolution])
      else {
        const all = photos.pretty_pictures.concat(photos.best_of)
        this.setWallpaper(all[Math.floor(Math.random() * all.length)][resolution])
      }
    })
  }

  fetch_reddit() {
    console.log('Fetching Reddit')
  }

  setWallpaper(imageURL, filename) {
    const wallpaperCacheDir = path.join(remote.app.getPath('temp'), remote.app.getName())
    const savepath = path.join(wallpaperCacheDir, filename|| path.basename(imageURL) )

    mkdirp(wallpaperCacheDir)
    request(imageURL)
      .pipe(fs.createWriteStream(savepath))
      .on('close', () => wallpaper.set(savepath))
  }
}
