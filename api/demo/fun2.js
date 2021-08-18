/*
 * @Author: your name
 * @Date: 2021-07-16 22:29:47
 * @LastEditTime: 2021-07-16 22:33:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SolidPollutionItem\tmp\fun2.js
 */
/* module.exports = function  print(){
    console.log("调用了fun2的print方法");
}
// 这种的调用方法为: fun2();
 */
module.exports = {
    print:function(){
        console.log("调用了fun2的print方法");
    },
    copy:function(a,b){
          console.log("我是fun2的copy方法");
    }
}

// 这种的调用方法为：fun2.print();