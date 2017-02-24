"use strict";

var _common = require("./common");

var _objectObverse = require("./objectObverse");

var _arrayObserve = require("./arrayObserve");

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
			return (0, _arrayObserve.ArrayObverse)(o, fn);
			break;

		//	默认
		default:
			throw "the observe method only support Object or Array instance, but passed in " + type;
			break;
	}
}

module.exports = observe;