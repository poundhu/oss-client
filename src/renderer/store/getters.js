const getters = {
  curBucketFiles: state => state.app.curBucketFiles,
  curBucketName: state => state.app.curBucketName,
  bucketLoading: state => state.app.bucketLoading,
  buckets: state => state.app.buckets,
  bucketTableView: state => state.app.bucketTableView,
  dirFiles: state => state.app.dirFiles,
  appPrev: state => state.app.prev,
  curPath: state => state.app.curPath,
  selected: state => state.app.selected,
  ossArr: state => state.app.ossArr,
  oss: state => state.app.oss,
  tActive: state => state.transfer.active,
  downloads: state => state.transfer.downloads,
  uploads: state => state.transfer.uploads,
  done: state => state.transfer.done
}

export default getters
