import gulp from 'gulp'
import cleanCSS from 'gulp-clean-css'
import htmlmin from 'gulp-htmlmin'
import babel from 'gulp-babel'
import sass from 'gulp-sass'
import concat from 'gulp-concat'
import rimraf from 'gulp-rimraf'
import gutil from 'gulp-util'
import sourcemaps from 'gulp-sourcemaps'
import gulpif from 'gulp-if'
import install from 'gulp-install'
import jeditor from 'gulp-json-editor'
import plumber from 'gulp-plumber'
import electronPackager from 'electron-packager'
import packageJson from './package.json'
import runSequence from 'run-sequence'
import electron from 'electron-prebuilt'
import { server as electronConnect } from 'electron-connect'


/* setup electron connect server for live reloading also declare some vars */
const electronDev = electronConnect.create({ path: 'build', electron })
let PRODUCTION_BUILD = true


/* Build Tasks */

gulp.task('build-core', () => gulp.src('src/main/core.js')
  .pipe(plumber())
  .pipe(babel())
  .on('error', err => {
    gutil.log(gutil.colors.red('[Main Tread Code Compilation Error]'))
    gutil.log(gutil.colors.red(err.message))
  })
  .pipe(gulp.dest('build/js')))

gulp.task('build-render', () => gulp.src('src/render/**/*.js')
  .pipe(concat('render.js'))
  .pipe(sourcemaps.init())
  .pipe(plumber())
  .pipe(babel())
  .on('error', err => {
    gutil.log(gutil.colors.red('[Render Code Compilation Error]'))
    gutil.log(gutil.colors.red(err.message))
  })
  .pipe(gulpif(!PRODUCTION_BUILD, sourcemaps.write()))
  .pipe(gulp.dest('build/js')))

gulp.task('build-styles', () => {
  gulp.src('src/styles/app/main.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(concat('app.css'))
    .pipe(gulp.dest('build/css'))

  return gulp.src('src/styles/vender/**/*.css')
    .pipe(cleanCSS())
    .pipe(concat('vender.css'))
    .pipe(gulp.dest('build/css'))
})

gulp.task('build-static-assets', () => {
  gulp.src('package.json').pipe(jeditor(json => {
    delete json.dependencies
    delete json.scripts
    delete json.devDependencies
    json.buildDate = new Date().toLocaleString()
    return json
  })).pipe(gulp.dest('build'))

  gulp.src('LICENSE').pipe(gulp.dest('build'))

  gulp.src('src/main/**/*.html').pipe(htmlmin({ collapseWhitespace: true })).pipe(gulp.dest('build'))
  return gulp.src('src/images/**/*').pipe(gulp.dest('build/images'))
})

gulp.task('clean-build', () => gulp.src('build', { read: false }).pipe(rimraf()))


/* Watch Tasks */

gulp.task('watch-core', () => {
  gulp.watch('src/main/core.js', ['build-core', callback => electronDev.restart(['--dev'], callback)])
  return gulp.watch('src/main/workers/**/*.js', ['build-core', electronDev.reload])
})

gulp.task('watch-render', () => gulp.watch('src/render/**/*.js', ['build-render', electronDev.reload]))

gulp.task('watch-styles', () => gulp.watch('src/styles/**/*.scss', ['build-styles', electronDev.reload]))

gulp.task('watch-static-assets', () => {
  gulp.watch('package.json', ['build-static-assets', electronDev.reload])
  return gulp.watch('src/main/app.html', ['build-static-assets', electronDev.reload])
})


/* npm tasks */

gulp.task('build', callback => runSequence('clean-build', ['build-core', 'build-render', 'build-styles', 'build-static-assets'], callback))

gulp.task('start', callback => runSequence('build', 'electron-start', callback))

gulp.task('start-dev', callback => {
  PRODUCTION_BUILD = false
  return runSequence('build', ['watch-core', 'watch-render', 'watch-styles', 'watch-static-assets'], 'electron-start-dev', callback)
})

gulp.task('release', callback => runSequence('build', 'electron-npm-deps', 'electron-build', callback))


/* Electron Tasks */

gulp.task('electron-start', electronDev.start)

gulp.task('electron-start-dev', callback => electronDev.start(['--dev'], callback))

gulp.task('electron-npm-deps', callback => gulp.src('package.json')
  .pipe(gulp.dest('build'))
  .pipe(install({ args: ['--production', '--no-optional'] })))

gulp.task('electron-build', callback => electronPackager({
  arch: 'ia32',
  dir: 'build',
  out: 'release',
  platform: 'win32',
  name: 'Slack Code Challange',
  'build-version': packageJson.version,
  'app-version': packageJson.version,
  asar: true,
  cache: 'build_cache',
  overwrite: true,
  version: '0.37.8'
}, (err, appPath) => {
  if (err) console.error(err)
  else console.info(`App built to ${appPath}`)
  callback()
}))


process.on('uncaughtException', console.error)
process.on('SIGINT', () => {
  electronDev.stop()
  process.exit(1)
})
