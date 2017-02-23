class ObjectObverse {

	consttrcutr(obj, callback) {
		if(arguments.length < 1) {
			throw "you must pass in at least one parameter!";
		}
	}

    buildProxy(prefix, o) {
        return new Proxy(o, {
            set(target, property, value) {
            	const old = target[property];
            	let type;
            	if (typeof old === "undefined" && typeof value !== "undefined") {
            		type = "add";
            	} else if (typeof old !== "undefined" && typeof value === "undefined") {
            		type = "remove";
            	} else if (old !== value) {
            		type = "modify";
            	}
                target[property] = value;
                fn(type, prefix + property, value);
            },

            get(target, property) {
                let out = target[property];
                if (out instanceof Object) {
                    // console.log(prefix + property + ".", out);
                    return this.buildProxy(prefix + property + ".", out);
                }
                return out;
            },
        });
    }

}

module.exports = ObjectObverse;