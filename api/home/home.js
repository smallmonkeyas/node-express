/*
 * @Author: your name
 * @Date: 2021-07-16 22:34:59
 * @LastEditTime: 2021-07-18 12:16:47
 * @LastEditors: Please set LastEditors
 * @Description: 内置的接口库
 * @FilePath: \SolidPollutionItem\tmp\interface\home.js
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

function getProperties(pageIndex, perPage) {
  // ip = global.ip
  let options = {
    method: "GET",
    url: `http://${ip}:8080/api/metadata/objects/stdService0/properties?type=own&page=${pageIndex}&per_page=${perPage}`,
    headers: {
      Authorization: authorization,
      Cookie: "vertx-web.session=79b80599135734456f355ba9d47a5ac8",
    },
  };
  return new Promise(function (resolve, reject) {
    request(options, function (error, response) {
      if (error) throw new Error(error);
      // console.log(response.body);
      resolve(JSON.parse(response.body));
    });
  });
}
// function getPropertiesList() {
//   return 
const getPropertiesList = async function () {
    let pageIndex = 1,
      perPage = 30000,
      propList = [];
    // try {
      let onePageProperitiesObj = await getProperties(pageIndex, perPage);
      propList.push(...onePageProperitiesObj.list);
      const pageSum = Math.ceil(
        onePageProperitiesObj.pagination.total / perPage
      );
      for (let index = 2; index < pageSum+1; index++) {
        onePageProperitiesObj = await getProperties(index, perPage);
        propList.push(...onePageProperitiesObj.list);
        
      }
      return propList;
    // } catch (err) {
    //   next(err);
    // }
  };
// }

function addObject(data) {
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
      const result = JSON.parse(response.body);
      resolve(result);
    });
  });
}
function addObject(data) {
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
      const result = JSON.parse(response.body);
      resolve(result);
    });
  });
}
function addProperities(data,objName) {
  const ip = global.ip;
  const authorization = global.authorization;
  const options = {
    method: "POST",
    url: `http://${ip}:8080/api/metadata/objects/${objName}/properties`,
    headers: {
      Authorization: authorization,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  return new Promise(function (resolve, reject) {
    request(options, function (error, response) {
      if (error) throw new Error(error);
      const result = JSON.parse(response.body);
      resolve(result);
    });
  });
}

module.exports = {
  login,
  getPropertiesList,
  addObject,
  addProperities
};
