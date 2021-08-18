/*
 * @Author: your name
 * @Date: 2021-07-18 13:57:34
 * @LastEditTime: 2021-08-09 22:04:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SolidPollutionItem\tmp\api\home\metadata\properity.js
 */

var request = require("request");
var system = require("../../../script/system");
function get(objName,pageIndex, perPage) {
  const ip = global.ip;
  const authorization = global.authorization;
  let options = {
    method: "GET",
    url: `http://${ip}:8080/api/metadata/objects/${objName}/properties?type=own&page=${pageIndex}&per_page=${perPage}`,
    headers: {
      Authorization: authorization,
      Cookie: "vertx-web.session=79b80599135734456f355ba9d47a5ac8",
    },
  };
  return new Promise(function (resolve, reject) {
    request(options, function (error, response) {
      if (error) throw new Error(error);
      // console.log(response.body);
      // resolve(JSON.parse(response.body));

      const body = response?response.body:"";
      const res = system.isJSON(body)?JSON.parse(body):false
      resolve(res)
    });
  });
}
// function getPropertiesList() {
//   return
const getList = async function (objName) {
  let pageIndex = 1,
    perPage = 3000,
    propList = [];
  // try {
  let onePageProperitiesObj = await get(objName,pageIndex, perPage);
  propList.push(...onePageProperitiesObj.list);
  const pageSum = Math.ceil(onePageProperitiesObj.pagination.total / perPage);
  // for (let index = 2; index < 3; index++) {
  //   onePageProperitiesObj = await get(objName,index, perPage);
  //   propList.push(...onePageProperitiesObj.list);
  // }
  let together = new Array(pageSum+1).fill(null);
  const promise = together.map((item,index)=>{

    return get(objName,index+1, perPage)
  })
  const promiseall = await Promise.all(promise);

  // return propList;
  return promiseall;
  // } catch (err) {
  //   next(err);
  // }
};
// }

function add(data, objName) {
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

function remove(objName, propName) {
  const ip = global.ip;
  const authorization = global.authorization;
  const options = {
    method: "DELETE",
    url: `http://${ip}:8080/api/metadata/objects/${objName}/properties/${propName}`,
    headers: {
      Authorization: authorization,
      "Content-Type": "application/json",
    },
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

module.exports = {
  getList,
  add,
  remove,
};
