"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ObjectObverse = function () {
    function ObjectObverse() {
        _classCallCheck(this, ObjectObverse);
    }

    _createClass(ObjectObverse, [{
        key: "consttrcutr",
        value: function consttrcutr(obj, callback) {
            if (arguments.length < 1) {
                throw "you must pass in at least one parameter!";
            }
        }
    }, {
        key: "buildProxy",
        value: function buildProxy(prefix, o) {
            return new Proxy(o, {
                set: function set(target, property, value) {
                    var old = target[property];
                    var type = void 0;
                    if (typeof old === "undefined" && typeof value !== "undefined") {
                        type = "add";
                    } else if (typeof old !== "undefined" && typeof value === "undefined") {
                        type = "remove";
                    } else if (old !== value) {
                        type = "modify";
                    }
                    target[property] = value;
                    fn(type, prefix + property, value);
                },
                get: function get(target, property) {
                    var out = target[property];
                    if (out instanceof Object) {
                        // console.log(prefix + property + ".", out);
                        return this.buildProxy(prefix + property + ".", out);
                    }
                    return out;
                }
            });
        }
    }]);

    return ObjectObverse;
}();

module.exports = ObjectObverse;