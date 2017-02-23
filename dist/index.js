"use strict";

var ObjectObverse = require("./objectObverse");
var ArrayObverse = require("./arrayObserve");

function observe(o, fn) {
	var type = _typeOf(o);
	var instance = void 0;

	switch (type) {

		//	对象
		case "Object":
			var buildProxy = function buildProxy(prefix, o) {
				return new Proxy(o, {
					set: function set(target, property, value) {
						fn(prefix + property, value);
						target[property] = value;
					},
					get: function get(target, property) {
						var out = target[property];
						if (out instanceof Object) {
							// console.log(prefix + property + ".", out);
							return buildProxy(prefix + property + ".", out);
						}
						return out;
					}
				});
			};

			return buildProxy("", o);
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

function _typeOf(obj) {
	return {}.toString.call(obj).slice(8, -1);
}

module.exports = observe;