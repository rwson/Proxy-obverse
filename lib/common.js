export function typeOf(obj) {
    return {}.toString.call(obj).slice(8, -1);
}

export function deepCopy(obj) {
	const typeOut = typeOf(obj);
	let res;
	switch (typeOut) {

		case "Array":
			res = [];
			for(let i = 0, {length} = obj; i < length; i ++) {
				res.push(deepCopy(obj[i]));
			}
			break;

		case "Object":
			res = {};
			for(let i in obj) {
				if (i in obj) {
					res[i] = deepCopy(obj[i]);
				}
			}
			break;

		default: 
			res = obj;
			break;
	}
	return res;
}

export function compareObject(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export function compareArray(arr1, arr2) {
    return deepCompareArray(arr1, arr2);
}

export function compareNumber(num1, num2) {
    return  (num1 === num2) && (num1 !== 0 || (1 / num1 == 1 / num2));
}

export function compareString(str1, str2) {
    return str1 === String(str2);
}

export function compareDate (date1, date2) {
    return +(date1) === +(date2);
}

export function compareBoolean(bool1, bool2) {
    return Number(bool1) === Number(bool2);
}

export function compareRegexp(reg1, reg2) {
    return reg1.source == reg2.source &&reg1.global == reg2.global &&reg1.multiline == reg2.multiline &&reg1.ignoreCase == reg2.ignoreCase;
}

export function compareOther(data1, data2) {
    return data1 === data2;
}

export function hasArrayInArray(array) {
	for(let i = 0, {length} = array; i < length; i ++) {
		if (typeOf(array[i]) === "Array") {
			return true;
		}
	}
	return false;
}

function hasObjectInArray(array) {
	for(let i = 0, {length} = array; i < length; i ++) {
		if (typeOf(array[i]) === "Object") {
			return true;
		}
	}
	return false;	
}

function deepCompareArray(arr1, arr2) {
	const type1 = this.typeOf(arr1),
		type2 = this.typeOf(arr2),
		hasObjectInArray1 = hasObjectInArray(arr1),
		hasObjectInArray2 = hasObjectInArray(arr2);

	let cur1, cur2, typeIn1, typeIn2, cmpMethod;

	if (type1 !== type2 || 
		(type1 === type2 && type1 === "Array" && arr1.length !== arr1.length) || 
		(hasObjectInArray1 !== hasObjectInArray2)) {
		return false;
	}

	for(let i = 0, {length} = arr1; i < length; i ++) {
		cur1 = arr1[i];
		cur2 = arr2[i];
		typeIn1 = typeOf(cur1);
		typeIn2 = typeOf(cur2);

		if (typeIn1 !== typeIn2) {
			return false;
		} else if (typeIn2 === typeIn2) {
			cmpMethod = `compare${typeIn2}`;
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
