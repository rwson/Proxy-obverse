"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.typeOf = typeOf;
exports.compareObject = compareObject;
exports.compareArray = compareArray;
exports.compareNumber = compareNumber;
exports.compareString = compareString;
exports.compareDate = compareDate;
exports.compareBoolean = compareBoolean;
exports.compareRegexp = compareRegexp;
exports.compareOther = compareOther;
function typeOf(obj) {
    return {}.toString.call(obj).slice(8, -1);
}

function compareObject(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

function compareArray(arr1, arr2) {
    return arr1.join("-") === arr2.join("-");
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