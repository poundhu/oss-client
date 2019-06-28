import { getBuckets, getBucketFiles, getMac, getBucketDomain } from '@/api/qiniu'

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
