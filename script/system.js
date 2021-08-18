/*
 * @Author: your name
 * @Date: 2021-07-18 00:06:35
 * @LastEditTime: 2021-08-09 21:57:49
 * @LastEditors: Please set LastEditors
 * @Description: 系统库函数
 * @FilePath: \SolidPollutionItem\tmp\interface\system.js
 */

// 时间延时
function delayms(time) {
    return new Promise(function (resolve, reject) {
      setTimeout(()=>{
        resolve(time)
      },time)
    });
  }
  const isJSON = function(str) {
    if(typeof(str) === 'string') {
        try{
            var obj = JSON.parse(str);
            if(typeof(obj) === 'object' && obj) {
                return true;
            }
            else {
                return false;
            }
        }
        catch(e) {
            return false;
        }
    }
  }  
  module.exports = {
    delayms,
    isJSON,
  };