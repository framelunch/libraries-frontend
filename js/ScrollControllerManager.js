"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ScrollControllerManager = function () {
  function ScrollControllerManager() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, ScrollControllerManager);

    this.onMousewheel = this.onMousewheel.bind(this);
    this.nextObservers = [];
    this.prevObservers = [];
    this.initialize(props);
  }

  _createClass(ScrollControllerManager, [{
    key: "initialize",
    value: function initialize(_ref) {
      var _this = this;

      var thresholdPx = _ref.thresholdPx,
          freezeMSec = _ref.freezeMSec,
          nextObservers = _ref.nextObservers,
          prevObservers = _ref.prevObservers;

      this.thresholdPx = thresholdPx || 70;
      this.freezeMSec = freezeMSec || 800;
      this.isFreezeWheel = false;

      if (nextObservers) {
        nextObservers.forEach(function (observer) {
          return _this.setNextObserver(observer);
        });
      }

      if (prevObservers) {
        prevObservers.forEach(function (observer) {
          return _this.setPrevObserver(observer);
        });
      }
    }
  }, {
    key: "setNextObserver",
    value: function setNextObserver(observer) {
      this.nextObservers.push(observer);
    }
  }, {
    key: "setPrevObserver",
    value: function setPrevObserver(observer) {
      this.prevObservers.push(observer);
    }
  }, {
    key: "onMousewheel",
    value: function onMousewheel(event) {
      if (this.isFreezeWheel) {
        return;
      }

      if (!this.lastDeltaY) {
        this.lastDeltaY = event.deltaY;
        return;
      }

      var movePx = event.deltaY - this.lastDeltaY;
      this.moveAction(movePx);
    }
  }, {
    key: "onTouchStart",
    value: function onTouchStart(event) {
      if (this.isFreezeWheel) {
        return;
      }

      this.lastDeltaY = event.changedTouches[0].pageY;
    }
  }, {
    key: "onTouchEnd",
    value: function onTouchEnd(event) {
      if (this.isFreezeWheel || !this.lastDeltaY) {
        return;
      }

      var deltaY = event.changedTouches[0].pageY;
      var movePx = this.lastDeltaY - deltaY;
      this.moveAction(movePx);
    }
  }, {
    key: "moveAction",
    value: function moveAction(movePx) {
      var absMovePx = Math.abs(movePx);
      var isShortRangeMove = absMovePx < this.thresholdPx;
      if (isShortRangeMove) {
        return;
      } else if (movePx >= 0) {
        this.goNext();
        return;
      }

      this.goPrev();
    }
  }, {
    key: "goNext",
    value: function goNext() {
      this.nextObservers.forEach(function (observer) {
        return observer();
      });
      this.lastDeltaY = null;
      this.freezeWheel();
    }
  }, {
    key: "goPrev",
    value: function goPrev() {
      this.prevObservers.forEach(function (observer) {
        return observer();
      });
      this.lastDeltaY = null;
      this.freezeWheel();
    }
  }, {
    key: "freezeWheel",
    value: function freezeWheel() {
      var _this2 = this;

      this.isFreezeWheel = true;
      setTimeout(function () {
        _this2.isFreezeWheel = false;
      }, this.freezeMSec);
    }
  }]);

  return ScrollControllerManager;
}();

exports.default = {
  create: function create() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return new ScrollControllerManager(props);
  }
};