import { getBuckets, getBucketFiles, getMac, getBucketDomain, upload } from '@/api/qiniu'

class Qiniu {
  origin = 'qiniu'

  constructor (ak, sk) {
    this.ak = ak
    this.sk = sk
    this.mac = getMac(ak, sk)
  }

  buckets () {
    return getBuckets(this.mac)
  }

  async bucketFiles (name) {
    this.domain = await getBucketDomain(name, this.mac)
    return getBucketFiles(name, this.mac)
  }

  upload (bucket, file, key, uuid) {
    return new Promise((resolve, reject) => {
      const observer = {
        next: res => console.log('upload progress', res),
        error: err => reject(err),
        complete: res => resolve(res)
      }
      const subscription = upload(bucket, file, key, this.mac, uuid, observer)
      console.log('oss', subscription)
    })
  }
}

export default class Creator {
  static create ({ origin, ak, sk }) {
    switch (origin) {
      case 'qiniu':
        return new Qiniu(ak, sk)
      case 'ali':
        break
      default:
        break
    }
  }
}
