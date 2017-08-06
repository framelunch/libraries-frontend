'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = creeateNote;

var _Cp = require('./Cp');

var _Cp2 = _interopRequireDefault(_Cp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Note = function () {
  function Note() {
    _classCallCheck(this, Note);

    this.cps = {};
  }

  _createClass(Note, [{
    key: 'listen',
    value: function listen(key, func) {
      if (!this.cps[key]) {
        this.cps[key] = (0, _Cp2.default)();
      }
      var c = this.cps[key];
      c.add(func);
      return func;
    }
  }, {
    key: 'clear',
    value: function clear(key, func) {
      var c = this.cps[key];
      if (!c) {
        return;
      }
      c.remove(func);
    }
  }, {
    key: 'publish',
    value: function publish(key, obj) {
      var c = this.cps[key];
      if (!c) {
        return;
      }
      c.update(obj);
    }
  }, {
    key: 'release',
    value: function release() {
      Object.values(this.cps).forEach(function (cp) {
        return cp.release;
      });
      delete this.cps;
    }
  }]);

  return Note;
}();

function creeateNote() {
  return new Note();
}