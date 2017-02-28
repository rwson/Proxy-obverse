#Proxy-obverse

通过ES6 Proxy实现的监测数据变化(支持多级对象或数组)

### Usage

- 测试

    git clone https://github.com/rwson/Proxy-obverse
    
    cd Proxy-obverse
    
    npm install
    
    npm test

- 引用

    git clone https://github.com/rwson/Proxy-obverse
    
    将代码拷贝到项目目录下,通过commonJS的方式引用即可


### API

    var observe = require(path/to/Proxy-obverse);

    var arr = [
        1,
        2,
        3,
        [
            4,
            5,
            6
        ]
    ];


    var arrOb = observe(arr, function(type, changed, oldV, newV) {
    
    //  当被监测的值发生变化时,触发回调函数
    
    });
    
    arrOb.push(5);
    arrOb[3].shift();
    
    //  ...

回调参数:


参数名 | 意义 | 类型
---|---|---
type | 对数据所做的操作 | String
changed | 修改的值 | Array/Object/Number/String etc.
oldV | 原来的值 | Array
newV | 修改后的值 | Array


    var observe = require(path/to/Proxy-obverse);

    var obj = {
        name: "foo"
    };


    var objOb = observe(obj, function(type, prop, oldV, newV) {
    
    //  当被监测的值发生变化时,触发回调函数
    
    });
    
    objOb.name = "bar";
    objOb.year = 2017;
    
    //  ...

回调参数:


参数名 | 意义 | 类型
---|---|---
type | 对数据所做的操作 | String
prop | 修改的属性名 | String
oldV | 原来的值 | Array/Object/Number/String etc.
newV | 修改后的值 | Array/Object/Number/String etc.



### Tips

触发回调函数的条件是对数据产生直接变化的操作。当数据类型为数组时,push/pop/shift/unshift/splice或者直接修改某个下标的值这些操作,都会触发后面的回调函数;当数据类型为对象时,直接修改某个属性值或者新增一个属性值时,也会触发后面的回调函数。
