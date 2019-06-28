import qiniu from 'qiniu'
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
