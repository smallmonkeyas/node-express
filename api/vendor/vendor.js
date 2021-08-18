/*
 * @Author: your name
 * @Date: 2021-07-18 00:14:38
 * @LastEditTime: 2021-08-15 04:37:17
 * @LastEditors: Please set LastEditors
 * @Description: 第三方接口
 * @FilePath: \SolidPollutionItem\tmp\interface\vendor.js
 */

var request = require("request");
var system = require("../../script/system");
function get() {
  const ip = global.ip;
  let paramsObj,url,router,params;
  router = arguments[0];
  if(arguments.length===1){
    
    url = `http://${ip}:8999/${router}`
  }else{
    paramsObj = arguments[1];
    // params = paramsObj.replace(/[\"\"{}]/g,"").replace(/:/g,"="),replace(/,/g,"&");
    params = paramsObj.replace(/\"(:{1})\"/g,"=").replace(/\"(,{1})\"/g,"&").replace(/[{}\"]/g,"");
    url = `http://${ip}:8999/${router}?${params}`
  }
//   const authorization = global.authorization;
  let options = {
    method: "GET",
    url: url,
    headers: {
    //   Authorization: authorization,
      Cookie: "vertx-web.session=79b80599135734456f355ba9d47a5ac8",
    },
  };
  return new Promise(function (resolve, reject) {
    request(options, function (error, response) {
      // if (error) throw new Error(error);
      // // console.log(response.body);
      // resolve(JSON.parse(response.body));
      if (error){
        // const urltmp = url;
        resolve({"error":error});
      } 
      // console.log(response.body);
      // resolve(JSON.parse(response.body));

      const body = response?response.body:"";
      const res = system.isJSON(body)?JSON.parse(body):{"error":`response_${response}`}
      resolve(res)
    });
  });
}
function post() {
    const ip = global.ip;
    let paramsObj,url,router,params,data;
    data = arguments[1]
    router = arguments[0];
      url = `http://${ip}:8999/${router}`
     
  //   const authorization = global.authorization;
    let options = {
      method: "GET",
      url: url,
      headers: {
      //   Authorization: authorization,
        Cookie: "vertx-web.session=79b80599135734456f355ba9d47a5ac8",
      },
      body: JSON.stringify(data),
    };
    return new Promise(function (resolve, reject) {
      request(options, function (error, response) {
        if (error) throw new Error(error);
        // console.log(response.body);
        resolve(JSON.parse(response.body));
      });
    });
  }

module.exports = {
  get,
  post
};
