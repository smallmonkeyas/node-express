/*
 * @Author: your name
 * @Date: 2021-07-16 22:29:43
 * @LastEditTime: 2021-07-16 22:31:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SolidPollutionItem\tmp\fun1.js
 */
function reduce(a,b){
    console.log("调用了fun1的reduce方法");
    console.log(a-b);
}

function add(a,b){
    console.log("调用了fun1的add方法");
    console.log(a+b);
}
module.exports = {
 reduce,
 add
}