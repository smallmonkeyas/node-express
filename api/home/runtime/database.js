/*
 * @Author: your name
 * @Date: 2021-07-18 13:55:30
 * @LastEditTime: 2021-08-14 23:43:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SolidPollutionItem\tmp\api\home\runtime\database.js
 */
var request = require("request");
var system = require("../../../script/system");
function batchQuery(data) {
    const ip = global.ip;
    const authorization = global.authorization;
    const options = {
      method: "POST",
      url: `http://${ip}:8080/api/compose/manage/objectdata/batchQuery`,
      headers: {
        Authorization: authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    return new Promise(function (resolve, reject) {
      request(options, function (error, response) {
        // if (error) throw new Error(error);
        if (error){
          // const urltmp = url;
          resolve({"error":error});
        } 
      const body = response?response.body:"";
      const res = system.isJSON(body)?JSON.parse(body):{"error":`response_${response}`}
      resolve(res)
      });
    });
  }

  function getPropertyVQTValues(data, objName) {
    const ip = global.ip;
    const authorization = global.authorization;
    const options = {
      method: "POST",
      url: `http://${ip}:8080/api/runtime/objects/${objName}/debugServices/getPropertyVQTValues`,
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


  function setPropertyValues(data, objName) {
    const ip = global.ip;
    const authorization = global.authorization;
    // const str = data.replace(/\"/g,"").replace(/\'/g,"")
    // str = str.concat('"',str,'"')
    const str = JSON.stringify(data).replace(/\"/g,"")
    const options = {
      method: "POST",
      url: `http://${ip}:8080/api/runtime/objects/${objName}/debugServices/setPropertyValues`,
      headers: {
        Authorization: authorization,
        "Content-Type": "application/json",
        Cookie: "vertx-web.session=79b80599135735456f355b89d4775ac8",
      },
      body: JSON.stringify({propValues:str}),
    };
    return new Promise(function (resolve, reject) {
      request(options, function (error, response) {
        if (error) throw new Error(error);
        const result = JSON.parse(response.body);
        resolve(result);
      });
    });
  }

  function setPropertyValue(data, objName) {
    const ip = global.ip;
    const authorization = global.authorization;
    // const str = data.replace(/"/g,"")
    const options = {
      method: "POST",
      url: `http://${ip}:8080/api/runtime/objects/${objName}/debugServices/setPropertyValue`,
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
    batchQuery,
    getPropertyVQTValues,
    setPropertyValues,
    setPropertyValue
  };
