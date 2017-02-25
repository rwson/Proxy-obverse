import { typeOf } from "./common";
import { ObjectObverse } from "./objectObverse";
import { ArrayObverse } from "./arrayObserve";

function observe(o, fn) {
	const type = typeOf(o);
	let instance;

	switch(type) {

		//	对象
		case "Object":
			return ObjectObverse(o, fn, "");
		break;

		//	数组
		case "Array":
			return ArrayObverse(o, fn);
		break;

		//	默认
		default:
			throw `the observe method only support Object or Array instance, but passed in ${type}`;
		break;
	}
}

module.exports = observe;
