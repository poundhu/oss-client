import url from 'url'

export function normalizePath (pathString) {
  return pathString
    .replace(/\\+/g, '/')
    .replace(/\/\//, '/')
    .replace(/^\//, '')
    .replace(/\/$/, '')
}

export function pathJoin (...args) {
  return args.map(normalizePath).join('/')
}

export function getFilePath (pathString) {
  pathString = url.parse(pathString).pathname || ''
  return dirname(pathString)
}

export function dirname (pathString) {
  pathString = normalizePath(pathString)
  const pathArr = pathString.split('/')
  return pathArr.splice(0, pathArr.length - 1).join('/')
}

export function getFileName (pathString) {
  const pathname = url.parse(pathString).pathname
  return pathname.replace(/^.*[/\\]/, '').toLowerCase() || ''
}

export function getFileExt (pathString) {
  const pathname = url.parse(pathString).pathname
  const last = pathname.replace(/^.*[/\\]/, '').toLowerCase()
  return last.replace(/^.*\./, '').toLowerCase() || ''
}
