'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addToLoop = addToLoop;
exports.removeFromLoop = removeFromLoop;

var _Cp = require('../core/Cp');

var _Cp2 = _interopRequireDefault(_Cp);

var _looptime = require('./looptime');

var _looptime2 = _interopRequireDefault(_looptime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cp = (0, _Cp2.default)();
var id = void 0;

function addToLoop(func) {
  cp.add(func);
  if (!id) {
    id = setInterval(function () {
      cp.update();
    }, _looptime2.default);
  }
  return func;
}

function removeFromLoop(func) {
  cp.remove(func);
  if (!cp.length) {
    clearInterval(id);
    id = null;
  }
}