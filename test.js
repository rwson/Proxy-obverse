const observe = require("./index");
var expect = require("chai").expect;

console.log(observe);

describe("测试Object修改属性", function() {
    let obj1 = {
            name: "foo"
        },
        p1 = observe(obj1, function(type, prop, oldV, newV) {
            it("修改属性1", function(done) {
                expect(type).to.equal("modify");
                expect(prop).to.equal("name");
                expect(oldV).to.equal("foo");
                expect(newV).to.equal("bar");
                done();
            });
        });

    p1.name = "bar";

    let obj2 = {
            model: {
                name: "foo"
            }
        },

        p2 = observe(obj2, function(type, prop, oldV, newV) {
            it("修改属性2", function(done) {
                expect(type).to.equal("modify");
                expect(prop).to.equal("model.name");
                expect(oldV).to.equal("foo");
                expect(newV).to.equal("bar");
                done();
            });
        });
    p2.model.name = "bar";

    let obj3 = {
            model: {
                name: "foo",
                obj: {
                    data: [1, 2, 3, 4]
                }
            }
        },

        p3 = observe(obj3, function(type, prop, oldV, newV) {
            it("修改属性3", function(done) {
                expect(type).to.equal("modify");
                expect(prop).to.equal("model.obj.data");
                expect(oldV.join("")).to.equal([1, 2, 3, 4].join(""));
                expect(JSON.stringify(newV)).to.equal(JSON.stringify({
                    key1: "value1",
                    key2: "value2"
                }));
                done();
            });
        });
    p3.model.obj.data = {
        key1: "value1",
        key2: "value2"
    };
});

describe("测试Object新增属性", function() {
    let obj1 = {
            name: "foo"
        },
        p1 = observe(obj1, function(type, prop, oldV, newV) {
            it("新增属性1", function(done) {
                expect(type).to.equal("add");
                expect(prop).to.equal("year");
                expect(oldV).to.equal(undefined);
                expect(newV).to.equal(2017);
                done();
            });
        });
    p1.year = 2017;

    let obj2 = {
            model: {
                name: "foo"
            }
        },

        p2 = observe(obj2, function(type, prop, oldV, newV) {
            it("新增属性2", function(done) {
                expect(type).to.equal("add");
                expect(prop).to.equal("model.year");
                expect(oldV).to.equal(undefined);
                expect(newV).to.equal(2017);
                done();
            });
        });
    p2.model.year = 2017;

    let obj3 = {
            model: {
                name: "foo",
                obj: {}
            }
        },

        p3 = observe(obj3, function(type, prop, oldV, newV) {
            it("新增属性3", function(done) {
                expect(type).to.equal("add");
                expect(prop).to.equal("model.obj.year");
                expect(oldV).to.equal(undefined);
                expect(newV).to.equal(2017);
                done();
            });
        });
    p3.model.obj.year = 2017;
});

describe("测试将Object属性置空", function() {
    let obj1 = {
            name: "foo"
        },
        p1 = observe(obj1, function(type, prop, oldV, newV) {
            it("置空属性1", function(done) {
                expect(type).to.equal("remove");
                expect(prop).to.equal("name");
                expect(oldV).to.equal("foo");
                expect(newV).to.equal(undefined);
                done();
            });
        });
    p1.name = undefined;

    let obj2 = {
            model: {
                name: "foo"
            }
        },

        p2 = observe(obj2, function(type, prop, oldV, newV) {
            it("置空属性2", function(done) {
                expect(type).to.equal("remove");
                expect(prop).to.equal("model.name");
                expect(oldV).to.equal("foo");
                expect(newV).to.equal(undefined);
                done();
            });
        });
    p2.model.name = undefined;
});

describe("pop方法测试", function() {
    let arr1 = [
            1,
            2,
            3
        ],
        arrOb1 = observe(arr1, function(type, changed, oldV, newV) {
            it("pop测试1", function(done) {
                expect(type).to.equal("pop");
                expect(changed).to.equal(3);
                expect(oldV.join("-")).to.equal("1-2-3");
                expect(newV.join("-")).to.equal("1-2");
                done();
            });
        });
    arrOb1.pop();

    let arr2 = [
            1,
            2, [1, 2, 3]
        ],
        arrOb2 = observe(arr2, function(type, changed, oldV, newV) {
            it("pop测试2", function(done) {
                expect(type).to.equal("pop");
                expect(changed).to.equal(3);
                expect(oldV.map((item) => Array.isArray(item) ? `[${item.join("-")}]` : item).join("-")).to.equal("1-2-3");
                expect(newV.map((item) => Array.isArray(item) ? `[${item.join("-")}]` : item).join("-")).to.equal("1-2");
                done();
            });
        });
    arrOb2[2].pop();
});

describe("push方法测试", function() {
    let arr1 = [
            1,
            2,
            3
        ],
        arrOb1 = observe(arr1, function(type, changed, oldV, newV) {
            it("push测试1", function(done) {
                expect(type).to.equal("push");
                expect(changed.join("")).to.equal("4");
                expect(oldV.join("-")).to.equal("1-2-3");
                expect(newV.join("-")).to.equal("1-2-3-4");
                done();
            });
        });
    arrOb1.push(4);

    let arr2 = [
            1,
            2, [1, 2, 3, 4]
        ],
        arrOb2 = observe(arr2, function(type, changed, oldV, newV) {
            it("push测试2", function(done) {
                expect(type).to.equal("push");
                expect(changed.join("-")).to.equal("4");
                expect(oldV.map((item) => Array.isArray(item) ? `[${item.join("-")}]` : item).join("-")).to.equal("1-2-3-4");
                expect(newV.map((item) => Array.isArray(item) ? `[${item.join("-")}]` : item).join("-")).to.equal("1-2-3-4-4");
                done();
            });
        });

    arrOb2[2].push(4);
});

describe("splice方法测试", function() {
    let arr1 = [
            1,
            2,
            3
        ],
        arrOb1 = observe(arr1, function(type, changed, oldV, newV) {
            it("splice测试1", function(done) {
                expect(type).to.equal("splice");
                expect(oldV.join("-")).to.equal("1-2-3");
                expect(newV.join("-")).to.equal("1-2-3");
                done();
            });
        });
    arrOb1.splice();

    let arr2 = [
            1,
            2, [1, 2, 3, 4]
        ],
        arrOb2 = observe(arr2, function(type, changed, oldV, newV) {
            it("splice测试2", function(done) {
                expect(type).to.equal("splice");
                expect(oldV.join("-")).to.equal("1-2-3-4");
                expect(newV.join("-")).to.equal("1");
                done();
            });
        });

    arrOb2[2].splice(1);

    let arr3 = [
            1,
            2,
            3,
            4,
            5
        ],
        arrOb3 = observe(arr3, function(type, changed, oldV, newV) {
            it("splice测试3", function(done) {
                expect(type).to.equal("splice");
                expect(changed.removed.join("-")).to.equal("2-3");
                expect(oldV.join("-")).to.equal("1-2-3-4-5");
                expect(newV.join("-")).to.equal("1-4-5");
                done();
            });
        });

    arrOb3.splice(1, 2);
});

describe("shift方法测试", function() {
    let arr1 = [
            1,
            2,
            3
        ],
        arrOb1 = observe(arr1, function(type, changed, oldV, newV) {
            it("shift测试1", function(done) {
                expect(type).to.equal("shift");
                expect(oldV.join("-")).to.equal("1-2-3");
                expect(newV.join("-")).to.equal("2-3");
                done();
            });
        });
    arrOb1.shift();

    let arr2 = [
            1,
            2, [1, 2, 3, 4]
        ],
        arrOb2 = observe(arr2, function(type, changed, oldV, newV) {
            it("shift测试2", function(done) {
                expect(type).to.equal("shift");
                expect(oldV.join("-")).to.equal("1-2-3-4");
                expect(newV.join("-")).to.equal("2-3-4");
                done();
            });
        });

    arrOb2[2].shift();
});

describe("unshift方法测试", function() {
    let arr1 = [
            1,
            2,
            3
        ],
        arrOb1 = observe(arr1, function(type, changed, oldV, newV) {
            it("unshift测试1", function(done) {
                expect(type).to.equal("unshift");
                expect(oldV.join("-")).to.equal("1-2-3");
                expect(newV.join("-")).to.equal("111-1-2-3");
                done();
            });
        });
    arrOb1.unshift("111");

    let arr2 = [
            1,
            2, [1, 2, 3, 4]
        ],
        arrOb2 = observe(arr2, function(type, changed, oldV, newV) {
            it("unshift测试2", function(done) {
                expect(type).to.equal("unshift");
                expect(oldV.join("-")).to.equal("1-2-3-4");
                expect(newV.join("-")).to.equal("111-1-2-3-4");
                done();
            });
        });

    arrOb2[2].unshift("111");
});

describe("shift方法测试", function() {
    let arr1 = [
            1,
            2,
            3
        ],
        arrOb1 = observe(arr1, function(type, changed, oldV, newV) {
            it("shift测试1", function(done) {
                expect(type).to.equal("shift");
                expect(oldV.join("-")).to.equal("1-2-3");
                expect(newV.join("-")).to.equal("2-3");
                done();
            });
        });
    arrOb1.shift();

    let arr2 = [
            1,
            2, [1, 2, 3, 4]
        ],
        arrOb2 = observe(arr2, function(type, changed, oldV, newV) {
            it("shift测试2", function(done) {
                expect(type).to.equal("shift");
                expect(oldV.join("-")).to.equal("1-2-3-4");
                expect(newV.join("-")).to.equal("2-3-4");
                done();
            });
        });

    arrOb2[2].shift();
});

describe("修改/新增/删除值测试", function() {
    let arr1 = [
            1,
            2,
            3
        ],
        arrOb1 = observe(arr1, function(type, changed, oldV, newV) {
            it("修改值测试", function(done) {
                expect(type).to.equal("modify");
                expect(oldV).to.equal(2);
                expect(newV).to.equal("111");
                done();
            });
        });
    arrOb1[1] = "111";

    let arr2 = [
            1,
            2,
            3
        ],
        arrOb2 = observe(arr2, function(type, changed, oldV, newV) {
            it("新增值测试", function(done) {
                expect(type).to.equal("add");
                expect(oldV).to.equal(undefined);
                expect(newV).to.equal("111");
                done();
            });
        });

    arrOb2[3] = "111";

    let arr3 = [
            1,
            2,
            3
        ],
        arrOb3 = observe(arr3, function(type, changed, oldV, newV) {
            it("删除值测试", function(done) {
                expect(type).to.equal("remove");
                expect(oldV).to.equal(3);
                expect(newV).to.equal(undefined);
                done();
            });
        });

    arrOb3[2] = undefined;

    let arr4 = [
        1,
        2,
        [3, 4, 5]
    ],
    arrOb4 = observe(arr4, function(type, changed, oldV, newV) {
        it("多级修改值测试", function(done) {
            expect(type).to.equal("modify");
            expect(oldV).to.equal(4);
            expect(newV).to.equal("3");
            done();
        });
    });
    arrOb4[2][1] = "3";
});
