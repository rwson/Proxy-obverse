const observe = require("./dist");
var expect = require("chai").expect;

let x = {
        model: {
            name: "Falcon",
            test: {
                obj: {
                    num: 1,
                    arr: [1, 2, 3]
                }
            },
            testRemove: "remove"
        }
    },

    p = observe(x, function(type, prop, oldV, newV) {
        console.log("-------------------");
        console.info(type, " | ", prop, " | ", oldV, " | ", newV);
        console.log("-------------------");
    });

// p.model.name = 'Commodore';
// p.model.year = 2016;
// p.model.test.obj.num = 2;
// p.model.test.obj.arr = {
//     newObj: "test"
// };
// p.model.testRemove = undefined;

let arr = [1,2,3],
      arrOb = observe(arr, function(type, changed, oldV, newV) {
        console.log("-------------------");
        console.info(type, " | ", JSON.stringify(changed), " | ", oldV.toString(), " | ", newV.toString());
        console.log("-------------------");
      });

// arrOb.push(4);

arrOb.splice(1, 1);
arrOb.splice(1, 1, "2", "4", 4);
console.log(arrOb.toString());

