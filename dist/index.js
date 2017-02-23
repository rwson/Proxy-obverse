"use strict";

var _common = require("./common");

var _objectObverse = require("./objectObverse");

var _arrayObserve = require("./arrayObserve");

var _arrayObserve2 = _interopRequireDefault(_arrayObserve);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function observe(o, fn) {
	var type = (0, _common.typeOf)(o);
	var instance = void 0;

	switch (type) {

		//	对象
		case "Object":
			return (0, _objectObverse.ObjectObverse)(o, fn, "");
			break;

		//	数组
		case "Array":
			break;

		//	默认
		default:
			throw "the observe method only support Object or Array instance, but passed in " + type;
			break;
	}
}

module.exports = observe;