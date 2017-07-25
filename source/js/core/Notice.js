import Cp from './Cp';

class Note {
  constructor() {
    this.cps = {};
  }

  listen(key, func) {
    if (!this.cps[key]) {
      this.cps[key] = Cp();
    }
    const c = this.cps[key];
    c.add(func);
    return func;
  }

  clear(key, func) {
    const c = this.cps[key];
    if (!c) { return; }
    c.remove(func);
  }

  publish(key, obj) {
    const c = this.cps[key];
    if (!c) { return; }
    c.update(obj);
  }

  release() {
    Object.values(this.cps)
      .forEach(cp => cp.release);
    delete this.cps;
  }
}

export default function creeateNote() {
  return new Note();
}
