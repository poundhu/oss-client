import { getFileExt, getFileName, getFilePath, normalizePath } from './utils'

class Item {
  parent
  name
  size
  updateTime
  uuid
  meta
  ext

  getPath () {
    return this._getPath(this)
  }

  _getPath (node) {
    if (node.parent == null) {
      return node.name
    }

    return this._getPath(node.parent) + '/' + node.name
  }

  constructor (name, parent, size = 0, uuid = '', updateTime = '', meta = {}) {
    this.name = name
    this.parent = parent
    this.size = size
    this.uuid = uuid
    this.ext = getFileExt(name)
    this.updateTime = updateTime
    this.meta = meta
  }
}

export default class Vdir {
  children = []
  path = ''
  name = ''
  parent
  isFolder = true

  constructor (name, parent = null) {
    this.name = name
    this.parent = parent
  }

  mkdir (path) {
    return path === '' ? this : normalizePath(path)
      .split('/')
      .reduce((prev, cur) => prev._mkdir(cur), this)
  }

  _mkdir (name) {
    const find = this.children.find(i => i.name === name)
    if (find) return find

    const dir = new Vdir(name, this)
    this.children.push(dir)
    return dir
  }

  pwd () {
    return this._pwd(this)
  }

  _pwd (node) {
    if (node.parent == null) {
      return node.name
    }

    return this._pwd(node.parent) + '/' + node.name
  }

  addItem (key, size, uuid, updatedTime, meta) {
    const name = getFileName(key)
    const path = getFilePath(key)
    const dir = this.mkdir(path)
    const file = new Item(name, dir, size, uuid, updatedTime, meta)
    dir.children.push(file)
    return file
  }
}
