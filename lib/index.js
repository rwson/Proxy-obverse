const ObjectObverse = require("./objectObverse");
const ArrayObverse = require("./arrayObserve");

function observe(o, fn) {
	const type = _typeOf(o);
	let instance;

	switch(type) {

		//	对象
		case "Object":
			function buildProxy(prefix, o) {
		        return new Proxy(o, {
		            set(target, property, value) {
		                fn(prefix + property, value);
		                target[property] = value;
		            },
		            
		            get(target, property) {
		                let out = target[property];
		                if (out instanceof Object) {
		                	// console.log(prefix + property + ".", out);
		                    return buildProxy(prefix + property + ".", out);
		                }
		                return out;
		            },
		        });
		    }
		    return buildProxy("", o);
		break;

		//	数组
		case "Array":
		break;

		//	默认
		default:
			throw `the observe method only support Object or Array instance, but passed in ${type}`;
		break;
	}
}

function _typeOf(obj) {
	return {}.toString.call(obj).slice(8, -1);
}

module.exports = observe;

