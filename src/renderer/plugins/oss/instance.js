import {
  getBuckets, getBucketFiles,
  getMac, getBucketDomain, upload, remove
} from '@/api/qiniu'

class Qiniu {
  origin = 'qiniu'

  constructor (ak, sk) {
    this.ak = ak
    this.sk = sk
  }

  getBucketNames () {
    const mac = getMac(this.ak, this.sk)
    return getBuckets(mac)
  }

  async getBucketFiles (name) {
    const mac = getMac(this.ak, this.sk)
    this.domain = await getBucketDomain(name, mac)
    return getBucketFiles(name, mac)
  }

  upload (bucket, file, key, uuid) {
    const mac = getMac(this.ak, this.sk)
    return new Promise((resolve, reject) => {
      const observer = {
        next: res => console.log('upload progress', res),
        error: err => reject(err),
        complete: res => resolve(res)
      }
      const subscription = upload(bucket, file, key, mac, uuid, observer)
      console.log('oss', subscription)
    })
  }

  remove (bucket, key) {
    const mac = getMac(this.ak, this.sk)
    return remove(bucket, key, mac)
  }
}

export default class Instance {
  instance

  getBucketNames () {
    return this.instance.getBucketNames()
  }

  getBucketFiles (name) {
    return this.instance.getBucketFiles(name)
  }

  upload (bucket, file, key, uuid) {
    return this.instance.upload(bucket, file, key, uuid)
  }

  remove (bucket, key) {
    return this.instance.remove(bucket, key)
  }

  setOss ({ origin, ak, sk }) {
    switch (origin) {
      case 'qiniu':
        this.instance = new Qiniu(ak, sk)
        break
      case 'ali':
        break
      default:
        break
    }
  }
}
