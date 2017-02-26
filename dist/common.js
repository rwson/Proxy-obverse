"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.typeOf = typeOf;
exports.deepCopy = deepCopy;
exports.compareObject = compareObject;
exports.compareArray = compareArray;
exports.compareNumber = compareNumber;
exports.compareString = compareString;
exports.compareDate = compareDate;
exports.compareBoolean = compareBoolean;
exports.compareRegexp = compareRegexp;
exports.compareOther = compareOther;
exports.hasArrayInArray = hasArrayInArray;
function typeOf(obj) {
	return {}.toString.call(obj).slice(8, -1);
}

function deepCopy(obj) {
	var typeOut = typeOf(obj);
	var res = void 0;
	switch (typeOut) {

		case "Array":
			res = [];
			for (var i = 0, length = obj.length; i < length; i++) {
				res.push(deepCopy(obj[i]));
			}
			break;

		case "Object":
			res = {};
			for (var _i in obj) {
				if (_i in obj) {
					res[_i] = deepCopy(obj[_i]);
				}
			}
			break;

		default:
			res = obj;
			break;
	}
	return res;
}

function compareObject(obj1, obj2) {
	return JSON.stringify(obj1) === JSON.stringify(obj2);
}

function compareArray(arr1, arr2) {
	return deepCompareArray(arr1, arr2);
}

function compareNumber(num1, num2) {
	return num1 === num2 && (num1 !== 0 || 1 / num1 == 1 / num2);
}

function compareString(str1, str2) {
	return str1 === String(str2);
}

function compareDate(date1, date2) {
	return +date1 === +date2;
}

function compareBoolean(bool1, bool2) {
	return Number(bool1) === Number(bool2);
}

function compareRegexp(reg1, reg2) {
	return reg1.source == reg2.source && reg1.global == reg2.global && reg1.multiline == reg2.multiline && reg1.ignoreCase == reg2.ignoreCase;
}

function compareOther(data1, data2) {
	return data1 === data2;
}

function hasArrayInArray(array) {
	for (var i = 0, length = array.length; i < length; i++) {
		if (typeOf(array[i]) === "Array") {
			return true;
		}
	}
	return false;
}

function hasObjectInArray(array) {
	for (var i = 0, length = array.length; i < length; i++) {
		if (typeOf(array[i]) === "Object") {
			return true;
		}
	}
	return false;
}

function deepCompareArray(arr1, arr2) {
	var type1 = this.typeOf(arr1),
	    type2 = this.typeOf(arr2),
	    hasObjectInArray1 = hasObjectInArray(arr1),
	    hasObjectInArray2 = hasObjectInArray(arr2);

	var cur1 = void 0,
	    cur2 = void 0,
	    typeIn1 = void 0,
	    typeIn2 = void 0,
	    cmpMethod = void 0;

	if (type1 !== type2 || type1 === type2 && type1 === "Array" && arr1.length !== arr1.length || hasObjectInArray1 !== hasObjectInArray2) {
		return false;
	}

	for (var i = 0, length = arr1.length; i < length; i++) {
		cur1 = arr1[i];
		cur2 = arr2[i];
		typeIn1 = typeOf(cur1);
		typeIn2 = typeOf(cur2);

		if (typeIn1 !== typeIn2) {
			return false;
		} else if (typeIn2 === typeIn2) {
			cmpMethod = "compare" + typeIn2;
			if (typeOf(cmpMethod) === "Undefined") {
				cmpMethod = compareOther;
			}
			if (!cmpMethod(cur1, cur2)) {
				return false;
			}
		}
	}
	return true;
}