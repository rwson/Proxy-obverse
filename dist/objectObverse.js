"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ObjectObverse = ObjectObverse;

var _common = require("./common");

var Common = _interopRequireWildcard(_common);

var _arrayObserve = require("./arrayObserve");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function ObjectObverse(obj, callback) {
    var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

    function buildProxy(prefix, o) {
        return new Proxy(o, {
            set: function set(target, property, value) {
                var old = target[property],
                    oldType = Common.typeOf(old),
                    newType = Common.typeOf(value);
                var type = undefined,
                    compareFn = void 0;

                if (oldType === newType && oldType !== "Undefined") {
                    compareFn = Common["compare" + oldType];
                    if (Common.typeOf(compareFn) === "Undefined") {
                        compareFn = Common.compareOther;
                    }
                    if (!compareFn(old, value)) {
                        type = "modify";
                    }
                } else if (oldType !== newType && oldType !== "Undefined" && newType !== "Undefined") {
                    type = "modify";
                } else if (oldType !== "Undefined" && newType === "Undefined") {
                    type = "remove";
                } else if (oldType === "Undefined" && newType !== "Undefined") {
                    type = "add";
                }
                target[property] = value;
                if (type !== undefined) {
                    callback(type, prefix + property, old, value);
                }
            },
            get: function get(target, property) {
                var out = target[property];
                if (out instanceof Object) {
                    return buildProxy(prefix + property + ".", out);
                }
                return out;
            }
        });
    }
    return buildProxy(prefix, obj);
}