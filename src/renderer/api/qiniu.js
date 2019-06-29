import qiniu from 'qiniu'
import * as qiniuJs from 'qiniu-js'

import http from '@/assets/script/http'

export function getMac (ak, sk) {
  return new qiniu.auth.digest.Mac(ak, sk)
}

export function getBuckets (mac) {
  const url = 'https://rs.qbox.me/buckets'
  const accessToken = qiniu.util.generateAccessToken(mac, url, null)
  const options = { headers: { Authorization: accessToken } }
  return http.get(url, options)
}

export function getBucketFiles (bucket, mac) {
  const url = `https://rsf.qbox.me/list?bucket=${bucket}`
  const accessToken = qiniu.util.generateAccessToken(mac, url, null)
  const options = { headers: { Authorization: accessToken } }
  return http.get(url, options)
}

export function getBucketDomain (bucket, mac) {
  const url = `https://api.qiniu.com/v6/domain/list?tbl=${bucket}`
  const accessToken = qiniu.util.generateAccessToken(mac, url, null)
  const options = { headers: { Authorization: accessToken } }
  return http.get(url, options)
}

export function upload (bucket, file, key, mac, uuid, observer) {
  const options = {
    scope: bucket,
    returnBody: '{"key":"$(key)","hash":"$(etag)","uuid":"$(x:uuid)"}'
  }
  const putPolicy = new qiniu.rs.PutPolicy(options)
  const token = putPolicy.uploadToken(mac)
  const putExtra = { params: { 'x:uuid': uuid } }
  const config = { useCdnDomain: true, region: 'z0' }
  const observable = qiniuJs.upload(file, key, token, putExtra, config)
  return observable.subscribe(observer) // 上传开始
  // subscription.unsubscribe() // 上传取消
}

export function remove (bucket, key, mac) {
  const config = new qiniu.conf.Config()
  const bucketManager = new qiniu.rs.BucketManager(mac, config)
  return new Promise((resolve, reject) => {
    bucketManager.delete(bucket, key, (err, respBody, respInfo) => {
      if (err) reject(err)
      else resolve({ respBody, respInfo })
    })
  })
}
