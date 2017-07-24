'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _loop = require('./loop');

exports.default = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (exec) {
  var func = function func() {
    exec();
    (0, _loop.removeFromLoop)(func);
  };
  (0, _loop.addToLoop)(func);
};