/*
 * @Author: your name
 * @Date: 2021-07-18 13:57:25
 * @LastEditTime: 2021-07-28 15:54:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SolidPollutionItem\tmp\api\home\metadata\object.js
 */


var request = require("request");

 
function add(data) {
  const ip = global.ip;
  const authorization = global.authorization;
  const options = {
    method: "POST",
    url: `http://${ip}:8080/api/metadata/objects`,
    headers: {
      Authorization: authorization,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  return new Promise(function (resolve, reject) {
    request(options, function (error, response) {
      if (error) throw new Error(error);
      const body = response.body;
      if (body.length === 0) {
        resolve(false);
      } else {
        const result = JSON.parse(body);
        resolve(result);
      }
    });
  });
}
function remove(objName) {
  const ip = global.ip;
  const authorization = global.authorization;
  const options = {
    method: "DELETE",
    url: `http://${ip}:8080/api/metadata/objects/${objName}`,
    headers: {
      Authorization: authorization,
      Cookie: "vertx-web.session=79b80599135735456f355b89d4775ac8",
    },
    
  };
  return new Promise(function (resolve, reject) {
    request(options, function (error, response) {
      if (error) throw new Error(error);
      const body = response.body;
      if (body.length === 0) {
        resolve(true);
      } else {
        const result = JSON.parse(body);
        resolve(result);
      }
    });
  });
}

module.exports = {

  add,
  remove,

};
