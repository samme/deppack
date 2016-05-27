'use strict';

class UsedShims {
  constructor(config) {
    this.usedShims = [];
    if (config.npm && config.npm.usesProcess !== undefined) {
      this._usesProcess = config.npm.usesProcess;
      // relying on explore to actually add 'process' to usedShims as it has to resolve the dependency anyway
    }
  }

  usesShim(shim) {
    return this.usedShims.indexOf(shim) !== -1;
  }

  usesProcess() {
    if (this._usesProcess !== undefined) {
      return this._usesProcess;
    }
    return this.usesShim('process');
  }

  shouldExcludeProcess() {
    return this._usesProcess === false;
  }

  shouldIncludeProcess() {
    return this._usesProcess === true;
  }

  addShims(shims) {
    let set = new Set(this.usedShims.concat(shims));
    if (this.shouldExcludeProcess()) {
      set.delete('process');
    }
    if (set.size) {
      this.usedShims = Array.from(set);
    }
  }

  toArray() {
    return this.usedShims;
  }
}

module.exports = UsedShims;
