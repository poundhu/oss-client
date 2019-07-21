export function formatFileSize (size) {
  if (size >= Math.pow(1024, 4)) {
    return (size / Math.pow(1024, 4)).toFixed(2) + ' TB'
  } else if (size >= Math.pow(1024, 3)) {
    return (size / Math.pow(1024, 3)).toFixed(2) + ' GB'
  } else if (size >= 1024 * 1024) {
    return (size / 1024 / 1024).toFixed(2) + ' MB'
  } else if (size >= 1024 && size < 1024 * 1024) {
    return (size / 1024).toFixed(2) + ' KB'
  } else {
    return (size) + ' B'
  }
}
