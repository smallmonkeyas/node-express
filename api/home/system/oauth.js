/*
 * @Author: your name
 * @Date: 2021-07-18 14:16:23
 * @LastEditTime: 2021-07-18 14:17:17
 * @LastEditors: Please set LastEditors
 * @Description: 系统授权
 * @FilePath: \SolidPollutionItem\tmp\api\home\system\oauth.js
 */



var request = require("request");
var authorization, ip;
function login(IP) {
  global.ip = IP;
  ip = IP;
  var options = {
    method: "POST",
    url: `http://${ip}:8080/api/auth/users/login`,
    headers: {
      "Content-Type": "application/json",
      Cookie: "vertx-web.session=79b80599135735456f355b89d4775ac8",
    },
    body: JSON.stringify({
      username: "admin",
      password: "Supos1304@",
      autoLogin: false,
      type: "account",
    }),
  };
  return new Promise(function (resolve, reject) {
    request(options, function (error, response) {
      if (error) throw new Error(error);
      const result = JSON.parse(response.body);
      authorization = `Bearer ${result.ticket}`;
      global.authorization = authorization;
      // console.log(response.body);
      resolve(result);
    });
  });
}


module.exports = {
  login,
};
