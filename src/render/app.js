process.on('uncaughtException', console.error)
document.addEventListener('DOMContentLoaded', () => {
//  process.env.NODE_ENV = minimist(process.argv.slice(2)).dev ? 'development' : 'production'
  render(<Framework />, document.getElementById('root'))
})
