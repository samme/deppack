'use strict';

const withoutExt = mod => mod.split('.').slice(0, -1).join('.');

// maps project files to module names, also shims
// this is needed to not throw on app-wise requires
// note that fileList.files can't be used because it's not fully populated until the first compilation
class ProjectModuleMap {
  constructor(nameCleaner) {
    this.modMap = {};
    this.nameCleaner = nameCleaner;
  }

  cleanMod(mod) {
    return this.nameCleaner(mod);
  }

  add(mod) {
    // make modMap aware of both fully-qualified and extension-free names of the module
    const name1 = this.cleanMod(mod);
    const name2 = this.cleanMod(withoutExt(mod));
    this.modMap[name1] = mod;
    this.modMap[name2] = mod;
  }

  addMany(obj) {
    Object.assign(this.modMap, obj);
  }

  toHash() {
    return this.modMap;
  }
}

module.exports = ProjectModuleMap;
