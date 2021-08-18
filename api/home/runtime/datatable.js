/*
 * @Author: your name
 * @Date: 2021-07-18 00:28:41
 * @LastEditTime: 2021-07-18 12:16:58
 * @LastEditors: Please set LastEditors
 * @Description: 数据库接口
 * @FilePath: \SolidPollutionItem\tmp\interface\database.js
 */

var request = require("request");

function add(data, tblObjName) {
  const ip = global.ip;
  const authorization = global.authorization;
  const options = {
    method: "POST",
    url: `http://${ip}:8080/api/runtime/objects/${tblObjName}/services/AddDataTableEntry`,
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

function deleteAll(data, tblObjName) {
    const ip = global.ip;
    const authorization = global.authorization;
    const options = {
      method: "POST",
      url: `http://${ip}:8080/api/runtime/objects/${tblObjName}/services/DeleteDataTableEntries`,
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
  function update(data, tblObjName) {
    const ip = global.ip;
    const authorization = global.authorization;
    const options = {
      method: "POST",
      url: `http://${ip}:8080/api/runtime/objects/${tblObjName}/services/UpdateDataTableEntry`,
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
  function select(data, tblObjName) {
    const ip = global.ip;
    const authorization = global.authorization;
    const options = {
      method: "POST",
      url: `http://${ip}:8080/api/runtime/objects/${tblObjName}/services/querySQLExec`,
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
    add,
    deleteAll,
    update,
    select
}