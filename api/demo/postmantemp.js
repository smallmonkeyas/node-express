/*
 * @Author: your name
 * @Date: 2021-07-16 20:09:48
 * @LastEditTime: 2021-07-16 22:34:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SolidPollutionItem\tmp\postmantemp.js
 */
var request = require('request');
var fun1 = require('./fun1');
var fun2 = require('./fun2');
var options = {
  'method': 'POST',
  'url': 'http://123.60.12.183:8080/api/auth/users/login',
  'headers': {
    'Content-Type': 'application/json',
    'Cookie': 'vertx-web.session=79b80599135735456f355b89d4775ac8'
  },
  body: JSON.stringify({
    "username": "admin",
    "password": "Supos1304@",
    "autoLogin": false,
    "type": "account"
  })

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});

function test(){
    console.log("调用了app的test方法");
    fun1.add(1,2);
    fun2.print();
}
test();