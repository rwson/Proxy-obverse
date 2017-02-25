const observe = require("./dist");
var expect = require("chai").expect;

// describe("测试Object修改属性", function() {
//     let obj1 = {
//             name: "foo"
//         },
//         p1 = observe(obj1, function(type, prop, oldV, newV) {
//             it("修改属性1", function(done) {
//                 expect(type).to.equal("modify");
//                 expect(prop).to.equal("name");
//                 expect(oldV).to.equal("foo");
//                 expect(newV).to.equal("bar");
//                 done();
//             });
//         });

//     p1.name = "bar";

//     let obj2 = {
//             model: {
//                 name: "foo"
//             }
//         },

//         p2 = observe(obj2, function(type, prop, oldV, newV) {
//             it("修改属性2", function(done) {
//                 expect(type).to.equal("modify");
//                 expect(prop).to.equal("model.name");
//                 expect(oldV).to.equal("foo");
//                 expect(newV).to.equal("bar");
//                 done();
//             });
//         });
//     p2.model.name = "bar";

//     let obj3 = {
//             model: {
//                 name: "foo",
//                 obj: {
//                   data: [1,2,3,4]
//                 }
//             }
//         },

//         p3 = observe(obj3, function(type, prop, oldV, newV) {
//             it("修改属性3", function(done) {
//                 expect(type).to.equal("modify");
//                 expect(prop).to.equal("model.obj.data");
//                 expect(oldV.join("")).to.equal([1,2,3,4].join(""));
//                 expect(JSON.stringify(newV)).to.equal(JSON.stringify({
//                   key1: "value1",
//                   key2: "value2"
//                 }));
//                 done();
//             });
//         });
//     p3.model.obj.data = {
//       key1: "value1",
//       key2: "value2"
//     };
// });

// describe("测试Object新增属性", function() {
//     let obj1 = {
//             name: "foo"
//         },
//         p1 = observe(obj1, function(type, prop, oldV, newV) {
//             it("新增属性1", function(done) {
//                 expect(type).to.equal("add");
//                 expect(prop).to.equal("year");
//                 expect(oldV).to.equal(undefined);
//                 expect(newV).to.equal(2017);
//                 done();
//             });
//         });
//     p1.year = 2017;

//     let obj2 = {
//             model: {
//                 name: "foo"
//             }
//         },

//         p2 = observe(obj2, function(type, prop, oldV, newV) {
//             it("新增属性2", function(done) {
//                 expect(type).to.equal("add");
//                 expect(prop).to.equal("model.year");
//                 expect(oldV).to.equal(undefined);
//                 expect(newV).to.equal(2017);
//                 done();
//             });
//         });
//     p2.model.year = 2017;

//     let obj3 = {
//             model: {
//                 name: "foo",
//                 obj: {}
//             }
//         },

//         p3 = observe(obj3, function(type, prop, oldV, newV) {
//             it("新增属性3", function(done) {
//                 expect(type).to.equal("add");
//                 expect(prop).to.equal("model.obj.year");
//                 expect(oldV).to.equal(undefined);
//                 expect(newV).to.equal(2017);
//                 done();
//             });
//         });
//     p3.model.obj.year = 2017;
// });

// describe("测试将Object属性置空", function() {
//     let obj1 = {
//             name: "foo"
//         },
//         p1 = observe(obj1, function(type, prop, oldV, newV) {
//             it("置空属性1", function(done) {
//                 expect(type).to.equal("remove");
//                 expect(prop).to.equal("name");
//                 expect(oldV).to.equal("foo");
//                 expect(newV).to.equal(undefined);
//                 done();
//             });
//         });
//     p1.name = undefined;

//     let obj2 = {
//             model: {
//                 name: "foo"
//             }
//         },

//         p2 = observe(obj2, function(type, prop, oldV, newV) {
//             it("置空属性2", function(done) {
//                 expect(type).to.equal("remove");
//                 expect(prop).to.equal("model.name");
//                 expect(oldV).to.equal("foo");
//                 expect(newV).to.equal(undefined);
//                 done();
//             });
//         });
//     p2.model.name = undefined;
// });

let arr = [1, 2, 3, 4, 5, 6, [1,2,3,4], 8, 9, 10],
    arrOb = observe(arr, function(type, changed, oldV, newV) {
        console.log("-------------------");
        console.info(type, " | ", changed, " | ", oldV, " | ", newV);
        // console.info(type, " | ", JSON.stringify(changed), " | ", oldV.toString(), " | ", newV.toString());
        console.log("-------------------");
    });

arrOb.push(4);

// arrOb.splice(1, 1);
// arrOb.splice(1, 3, "2", "4", 4);
// arrOb.splice();
// arrOb.splice(1);

// arrOb.pop();

// arrOb.pop();

// arrOb[0] = 123;

// arrOb[0] = undefined;

arrOb[6][0] = 123;

// arrOb.unshift();

