export function typeOf(obj) {
    return {}.toString.call(obj).slice(8, -1);
}

export function compareObject(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export function compareArray(arr1, arr2) {
    return arr1.join("-") === arr2.join("-");
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
