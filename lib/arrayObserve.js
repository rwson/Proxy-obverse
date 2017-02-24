import * as Common from "./common";

const arrayPrototype = Array.prototype,
    {slice, pop, push, unshift, shift, splice} = arrayPrototype,
    methods = {
        ARRAY_POP: pop,
        ARRAY_PUSH: push,
        ARRAY_UNSHIFT: unshift,
        ARRAY_ShIFT: shift,
        ARRAY_SPLICE: splice
    };

export function ArrayObverse(arr, callback) {

    //  对会直接对数组进行修改的方法进行代理
    arr.pop = function() {
        const argus = [...arguments],
            old = Common.deepCopy(arr),
            { length } = old,
            changed = (length >= 1) ? old[length - 1] : undefined;

        methods.ARRAY_POP.apply(arr, argus);
        callback("pop", changed, old, arr);
    };

    arr.push = function(items) {
        const argus = [...arguments],
            old = Common.deepCopy(arr);

        methods.ARRAY_PUSH.apply(arr, argus);
        callback("push", argus, old, arr);
        return arr.length;
    };

    arr.unshift = function() {
        const old = Common.deepCopy(arr),
            { length } = old,
            changed = (length >= 1) ? old[length - 1] : undefined;

        methods.ARRAY_UNSHIFT.call(arr);
        callback("unshift", old, arr);
    };

    arr.shift = function() {
        const old = Common.deepCopy(arr),
            { length } = old,
            changed = (length >= 1) ? old[0] : undefined;

        methods.ARRAY_ShIFT.call(arr);
        callback("shift", changed, old, arr);
    };

    arr.splice = function() {
        const old = Common.deepCopy(arr),
            argus = [...arguments],
            { length } = argus;

        let changed = {
            removed: [],
            changeIndexStart: -1,
            changeIndexEnd: -1,
            replace: []
        };

        switch (length) {
            case 0:
                break;

            case 1:
                break;

            case 2:
                changed.changeIndexStart = argus[0];
                changed.changeIndexEnd = argus[1] + argus[0];
                changed.removed = slice.apply(arr, argus);
                break;

            default:
                changed.changeIndexStart = argus[0];
                changed.changeIndexEnd = argus[1] + argus[0];
                changed.removed = slice.apply(arr, [argus[0], argus[1]]);
                changed.replace = argus.slice(2);
                break;
        }

        methods.ARRAY_SPLICE.apply(arr, argus);

        callback("splice", changed, old, arr);
    };

    function buildProxy(array, callback) {
        return new Proxy(arr, {
            set(target, index, value) {
                const old = target[index],
                    oldType = Common.typeOf(old),
                    newType = Common.typeOf(value);

                if (oldType === newType && oldType !== "Undefined") {
                    compareFn = Common[`compare${oldType}`];
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

                target[index] = value;
                if (type !== undefined) {
                    callback(type, [value], old, value);
                }
            },

            get(target, index) {
                let out = target[index];
                if (Array.isArray(out)) {
                    return buildProxy(out, callback);
                }
                return out;
            }
        });
    }

    return buildProxy(arr, callback);
}
