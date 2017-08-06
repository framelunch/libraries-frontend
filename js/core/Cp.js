"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var dummy = {
  update: function update() {}
};

var Node = function () {
  function Node(fc, prev, next) {
    _classCallCheck(this, Node);

    this.func = fc;
    this.prev = prev;
    this.next = next;
    this.available = false;
  }

  _createClass(Node, [{
    key: "update",
    value: function update(args) {
      this.func.apply(null, args || []);
      this.next.update(args);
    }
  }, {
    key: "reverse",
    value: function reverse(args) {
      this.func.apply(null, args || []);
      this.prev.update(args);
    }
  }, {
    key: "release",
    value: function release() {
      delete this.func;
      delete this.next;
      delete this.prev;
    }
  }]);

  return Node;
}();

var count = 0;

var Cp = function () {
  function Cp() {
    _classCallCheck(this, Cp);

    count += 1;
    this.id = count;
    this.index = 1;
    this.length = 0;
    this.first = new Node(function () {}, dummy, dummy);
    this.current = this.first;
    this.list = {};
  }

  _createClass(Cp, [{
    key: "update",
    value: function update(args) {
      this.first.update(args);
    }
  }, {
    key: "reverse",
    value: function reverse(args) {
      this.current.reverse(args);
    }
  }, {
    key: "add",
    value: function add(fc) {
      var n = void 0,
          id = void 0;

      id = fc["__coupling__" + this.id];
      if (id) {
        n = this.list[id];
        if (n.available) {
          return null;
        }
        n.prev = this.current;
        n.next = dummy;
      } else {
        this.index += 1;
        fc["__coupling__" + this.id] = this.index;
        id = fc["__coupling__" + this.id];
        this.list[id] = new Node(fc, this.current, dummy);
        n = this.list[id];
      }

      n.available = true;
      this.current.next = n;
      this.current = n;

      this.length += 1;
      return fc;
    }
  }, {
    key: "remove",
    value: function remove(fc) {
      var id = fc["__coupling__" + this.id];
      if (!id) {
        return null;
      }

      var n = this.list[id];
      if (!n.available) {
        return null;
      }

      n.prev.next = n.next;
      n.next.prev = n.prev;

      if (this.current === n) {
        this.current = n.prev;
      }
      n.available = false;

      this.length -= 1;
      return id;
    }
  }, {
    key: "dispose",
    value: function dispose(fc) {
      var id = this.remove(fc);
      delete this.list[id];
      delete fc["__coupling__" + this.id];
    }
  }, {
    key: "release",
    value: function release() {
      var _this = this;

      var keys = Object.keys(this.list);
      keys.forEach(function (key) {
        var n = _this.list[key];
        delete n.fc["__coupling__" + _this.id];
        n.release();
      });
      delete this.id;
      delete this.index;
      delete this.length;
      delete this.first;
      delete this.current;
      delete this.list;
    }
  }]);

  return Cp;
}();

// ファクトリ関数を公開


exports.default = function () {
  return new Cp();
};