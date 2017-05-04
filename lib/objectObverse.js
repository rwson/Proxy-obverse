import * as Common from "./common";
import { ArrayObverse } from "./arrayObserve";

export function ObjectObverse(obj, callback, prefix = "") {
    function buildProxy(prefix, o) {
        return new Proxy(o, {
            set(target, property, value) {
                const old = target[property],
                    oldType = Common.typeOf(old),
                    newType = Common.typeOf(value);
                let type = undefined, compareFn;

                if(oldType === newType && oldType !== "Undefined") {
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
                target[property] = value;
                if (type !== undefined) {
                    callback(type, prefix + property, old, value);
                }
            },
            
            get(target, property) {
                let out = target[property];
                const type = Common.typeOf(out);
                switch(type) {
                    case "Object":
                        out = buildProxy(prefix + property + ".", out);
                    break;
                    case "Array":
                        out = ArrayObverse(out, callback);
                    break;
                    default:
                    break;
                }
                return out;
            },
        });
    }
    return buildProxy(prefix, obj);
}

