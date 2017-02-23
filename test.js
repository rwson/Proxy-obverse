const observe = require("./lib");

let x = {
	model:
	 { 
	 	name: "Falcon"
	 } 
 };
let p = observe(x, function(property, value) { 
	// console.info(property, value);
});
p.model.name = 'Commodore';
p.model.year = 2016;
delete p.model.year;

console.log(p.model);

let arr = [];
let a = observe(arr, function(prop, value) {
	// console.log(prop, value);
});

arr = arr.push(1);
