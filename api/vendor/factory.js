/*
 * @Author: your name
 * @Date: 2021-07-25 23:06:24
 * @LastEditTime: 2021-07-26 00:45:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SolidPollutionItem\tmp\api\vendor\factory.js
 */


var request = require("request");

function get() {
  const ip = global.ip;
  let paramsObj,url,router,params;
  router = arguments[0];
  if(arguments.length===1){
    
    url = `http://${ip}:8999/${router}`
  }else{
    paramsObj = arguments[1];
    // params = paramsObj.replace(/[\"\"{}]/g,"").replace(/:/g,"="),replace(/,/g,"&");
    params = paramsObj.replace(/\\"(:{1})\\"/g,"=").replace(/\\"(,{1})\\"/g,"&").replace(/[{}\\"]/g,"");
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
      if (error) throw new Error(error);
      // console.log(response.body);
      resolve(JSON.parse(response.body));
    });
  });
}


module.exports = {
  get,
  add,
  remove,
};
