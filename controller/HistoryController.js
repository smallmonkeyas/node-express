/*
 * @Author: your name
 * @Date: 2021-08-08 23:11:44
 * @LastEditTime: 2021-08-15 18:18:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SolidPollutionItem\tmp\controller\HistoryController.js
 */

//TODO: 引入第三方库
const request = require("request");
const fs = require("fs");
const readlineSync = require("readline-sync");
const moment = require("moment");
const os = require("os");
const path = require("path");
const wxm = require("wxmnode");
//TODO: 引入本地库
const XLSX_JSON = require("../script/XLSX_JSON");
const system = require("../script/system");
const table = require("../api/home/runtime/datatable");
const oauth = require("../api/home/system/oauth");
const properties = require("../api/home/metadata/properity");
const object = require("../api/home/metadata/object");
const metadata = require("../api/home/metadata/data");

const database = require("../api/home/runtime/database");

const vendor = require("../api/vendor/vendor");

//TODO: vendor.get('serverapi/cfg/collector')获取采集器所有企业对象-对象实例：name ==>names

//TODO: 遍历所有对象实例names(每个对象实例objName),获取每个对象实例objName下所有属性properties.getList(objName)

//TODO: 获取每个属性历史值(json数据)

//TODO: json数据转xlsx写到对应目录下的excel中

const iptestEnv = "123.60.12.183";
const ipactualEnv = "10.32.203.157";
const ipSelect = ipactualEnv;

// const getHistory8080 = async function (){
//     //TODO: 0、 登录supOS系统,获取系统信息
//   const loginInfo = await oauth.login(ipSelect);
//     const data = {
//         "list": [
//             // {
//             //     // "dataSource": "GK_YZ_GY_WSCL.E101B4",
//             //     "dataSource": "GK_CZ_GD_GXHB.G22211",
//             //     "type": "Property",
//             //     "filters": {
//             //         "minDate": "2021-07-27T14:02:00Z",
//             //         "maxDate": "2021-07-27T14:42:00Z",
//             //         "aggrType": "",//first|last
//             //         "group": "", //10s(20s)
//             //         "isHistory": true,
//             //         "limit": 10000
//             //         // "order": "DESC"
//             //     }
//             // },
//             {
//                 // "dataSource": "GK_YZ_GY_WSCL.E101B4",
//                 "dataSource": "GK_CZ_GD_GXHB.G20811",
//                 "type": "Property",
//                 "filters": {
//                     "minDate": "2021-07-06T18:30:00Z",
//                     "maxDate": "2021-08-09T18:40:10Z",
//                     "aggrType": "", //first|last
//                     "group": "", //10s(20s)
//                     "isHistory": true,
//                     "limit": 10000
//                     // "order": "DESC"
//                 }
//             }
//         ]
//     }
//     return await database.batchQuery(data)
// }

// getHistory().then(result => console.log(result))
//*vendor接口返回出错后持续获取历史值
const getVendorWhile = async function (route, params) {
  var res = await vendor.get(route, JSON.stringify(params));
  let num = 0;

  while (!!res.error) {
    res = await vendor.get(route, JSON.stringify(params));
    if(!res.error&&res.info.toLowerCase() === "success"){
      let resObjectValue = res.data;
      if(!!resObjectValue&&!!resObjectValue[0]&&resObjectValue[0].length>0){
        // console.log("res",resObjectValue[0])
      }
      
    }
    num++;
    if (num > 0) break;
  }
  // if (res.error) {
  //   res = { info: res.error };
  // }

  return res;
};

//*根据企业编码、对象属性、开始时间、结束时间获取该对象属性历史数据
const getTrend = async function (factory, factor, beginTime, endTime) {
  const arrTimeSplit = splitTime(beginTime, endTime);
  let together = new Array(arrTimeSplit.length - 1).fill(null);
  // let propName = factor.name.replace(/.{0,}\./g, "");
  let propName = factor.name;
  let description = factor.description.replace(/[\？\?\*\\\/:|<>\"]{1,}/g, "_");
  // const promise = together.map((item, index) => {
  //   let params = {
  //     epcode: factory.epcode,
  //     name: propName,
  //     begintime: moment(arrTimeSplit[index]).format("YYYY-MM-DD HH:mm:ss"),
  //     endtime: moment(arrTimeSplit[index + 1]).format("YYYY-MM-DD HH:mm:ss"),
  //   };
  //   return getVendorWhile("serverapi/data/trend", params);
  // });
  // const promiseall = await Promise.all(promise);
  let promiseall = []
  for(let i = 0; i < together.length; i++) {
    let params = {
          epcode: factory.epcode,
          name: propName,
          begintime: moment(arrTimeSplit[i]).format("YYYY-MM-DD HH:mm:ss"),
          endtime: moment(arrTimeSplit[i + 1]).format("YYYY-MM-DD HH:mm:ss"),
        };
    let res = await getVendorWhile("serverapi/data/trend", params);
    // let res = await getBatchQueryWhile(objName, propName, beginTime, endTime);
    promiseall.push(res)
  }


  let propTrend = [];
  promiseall.forEach((item) => {
    // if(!Array.isArray(item))return
    let data = (!item.error&&item.info&&item.info.toLowerCase() === "success") ? item.data : {};
    if (Array.isArray(data)) {
      if(Array.isArray(data[0])){
        propTrend.push(data[0][0]);
      }else{
        propTrend.push({});
      }
      
    } else {
      propTrend.push(item);
    }
  });
  return { [`${description}_${propName}`]: propTrend };
};
//*内置home接口返回出错后持续获取历史值

const getBatchQueryWhile = async function (
  objName,
  propName,
  beginTime,
  endTime
) {
  let data = {
    list: [
      {
        dataSource: `${objName}.${propName}`,
        type: "Property",
        filters: {
          minDate: beginTime,
          maxDate: endTime,
          aggrType: "", //first|last
          group: "", //10s(20s)
          isHistory: true,
          limit: 10000,
        },
      },
    ],
  };
  let num = 0;
  var res = {error:true};
  while (!!res.error) {
    res = await database.batchQuery(data);
    if(!res.error){
      let resObjectValue = Object.values(res)[0];
      if(!!resObjectValue&&!!resObjectValue["list"]&&resObjectValue["list"].length>0){
        console.log("res",res)
      }
      
    }
    num++;
    if (num > 50) break;
  }

  if (!!res) {
    const list = Object.values(res);
    const timeData = Object.values(list[0]);
    return timeData[0];
  } else {
    return [];
  }
};
//*根据企业对象实例、对象属性、开始时间、结束时间获取该对象属性历史数据
const getBatchQuery = async function (factory, factor, beginTime, endTime) {
  const arrTimeSplit = splitTime(beginTime, endTime);
  let together = new Array(arrTimeSplit.length - 1).fill(null);
  let objName = factory.objName;
  let propName = factor.name;
  // let propName = factor.name.split(".");
  let arrName = factor.name.split(".");
  if (arrName.length == 2) {
    objName = arrName[0];
    propName = arrName[1];
  }
  let description = factor.description.replace(/[\？\?\*\\\/:|<>\"]{1,}/g, "_");
  let promiseall = []
  for(let i = 0; i < together.length; i++) {
    let beginTime = moment(arrTimeSplit[i]).utc().format(),
      endTime = moment(arrTimeSplit[i + 1])
        .utc()
        .format();
    let res = await getBatchQueryWhile(objName, propName, beginTime, endTime);
    promiseall.push(res)
  }
  // const promiseall = together.map((item, index) => {
  //   let beginTime = moment(arrTimeSplit[index]).utc().format(),
  //     endTime = moment(arrTimeSplit[index + 1])
  //       .utc()
  //       .format();
  //   return await getBatchQueryWhile(objName, propName, beginTime, endTime);
  // });
  // const promiseall = await Promise.all(promise);

  let propTrend = [];
  promiseall.forEach((item) => {
    if (Array.isArray(item)) {
      propTrend.push(...item);
    } else {
      propTrend.push({});
    }
  });
  return { [`${description}_${propName}`]: propTrend };
  return promiseall;
};

const splitTime = function (beginTime, endTime) {
  const beginTimestamp = moment(beginTime).valueOf();
  const endTimestamp = moment(endTime).valueOf();
  // const rangeDays = moment(endTime).diff(beginTime,'days',true);//精确计算时间差
  const rangeDays = moment(endTimestamp).diff(beginTimestamp, "days");
  let together = new Array(rangeDays + 1).fill(beginTimestamp);
  let timesSplit = together.map((item, index) => {
    return moment(beginTimestamp).add(index, "days").valueOf();
  });
  if (endTimestamp === timesSplit[rangeDays]) {
    return timesSplit;
  } else {
    timesSplit.push(endTimestamp);
    return timesSplit;
  }
};
const getFactors = async function (epcode) {
  //TODO: 获取企业所有参数
  let params = { epcode: epcode };
  const factorsRes = await getVendorWhile("serverapi/cfg/factor", params);
  if (factorsRes.info.toLowerCase() === "success") {
    return factorsRes.data;
  } else {
    return [];
  }
};
//*获取某企业历史数据
const getFactoryHistory = async function (factory, beginTime, endTime) {
  //TODO: 获取企业所有参数
  const factors = await getFactors(factory.epcode);

  // const promise = factors.map((item) => {
  //   let factor = item;
  //   return getTrend(factory, factor, beginTime, endTime);
  //   // return getBatchQuery(factory, factor, beginTime, endTime);
  // });
  let promiseall=[]
  for(let i = 0; i < factors.length; i++) {
    let factor = factors[i]
    let res = await getTrend(factory, factor, beginTime, endTime);;
    promiseall.push(res)
  }
  // const promiseall = await Promise.all(promise);

  return {
    [`${factory.factoryName}_${factory.objName}_${factory.epcode}`]: promiseall,
  };
};

//*获取所有企业信息
const getFactories = async function () {
  //TODO: 获取企业所有参数
  // let params = {"epcode": epcode}
  const factoriesRes = await vendor.get("serverapi/cfg/collector");
  if (factoriesRes.info.toLowerCase() === "success") {
    const datas = factoriesRes.data;
    let epcodes = [],
      factories = [];
    datas.forEach((item) => {
      if (!epcodes.includes(item.epcode)) {
        let displayName = item.displayname.match(
          /.{2,}(处理厂|公司|南厂|水务)(\)|）)*/g
        );
        epcodes.push(item.epcode);
        factories.push({
          factoryName: displayName[0],
          objName: item.objname,
          epcode: item.epcode,
        });
      } else if (item.type == "GK") {
        let index = epcodes.indexOf(item.epcode);
        // let factoriesRaw = {...factories[index]};
        factories[index]["objName"] = item.objname;
      }
    });
    return factories;
  } else {
    return [];
  }
};
//*获取所有企业历史数据
const getFactoriesHistory = async function (beginTime, endTime) {
  const factories = await getFactories();
  const promise = factories.map((item) => {
    return getFactoryHistory(item, beginTime, endTime);
  });
  const promiseall = await Promise.all(promise);

  return promiseall;
};
// JSON.s;
//* 保存历史数据到本地
const saveHisdata = function (hisdata) {
  const basicPath = path.resolve(
    __dirname,
    `../data/history/${moment(beginTime).format(
      "YYYY-MM-DD_HH_mm_ss"
    )}to${moment(endTime).format("YYYY-MM-DD_HH_mm_ss")}`
  );
  //TODO:导出json文件
  XLSX_JSON.saveJsonToFile(
    hisdata,
    basicPath,
    `${moment(beginTime).format("YYYY-MM-DD_HH_mm_ss")}to${moment(
      endTime
    ).format("YYYY-MM-DD_HH_mm_ss")}`
  );
  for (let i = 0; i < hisdata.length; i++) {
    let fortoryHis = Object.values(hisdata[i])[0];
    for (let j = 0; j < fortoryHis.length; j++) {
      let excelJson = Object.values(fortoryHis[j])[0],
        pathFileDir = path.resolve(basicPath, `./${Object.keys(hisdata[i])[0]}`),
        fileName = Object.keys(fortoryHis[j]);
      // console.log('data',Object.values(fortoryHis[j])[0])
      //TODO:转为excel文件
      XLSX_JSON.jsonToExcel(excelJson, pathFileDir, fileName);
    }
  }
};
/**
 * @微信提示
 */

function sendMessage(message) {
  let name = "289768";
  let pwd = "79523";
  let txt1 = message;
  let txt2 = "b";
  let txt3 = "c";

  setTimeout(async () => {
    // wxm.sendMsgToUser(name, pwd, txt1, txt2, txt3);  //是这个函数或者下面  两个函数
    // or
    wxm.init(name, pwd); //init 只需要一次就可以了
    let ret = await wxm.sendMsg(txt1, txt2, txt3);
    console.log("ret:", ret);
  }, 1000);
}
//!________________________________________________________________________________________________________________________________
//*主程序
const beginTime = "2021-07-06 11:16:00",
  endTime = moment().format("YYYY-MM-DD HH:mm:ss");
const historyController = async function () {
  //TODO:登录
  const loginInfo = await oauth.login(ipSelect);
  //TODO:规定开始时间、结束时间，获取该时间段内所有企业所有因子历史数据

  const hisdata = await getFactoriesHistory(beginTime, endTime);
  //TODO: 遍历历史数据，保存到相应目录下的文件中
  saveHisdata(hisdata);
  return hisdata;
};
const starttime = moment().format("YYYY-MM-DD HH:mm:ss");
historyController().then((result) => {
  console.log(result);
  console.log(
    `程序运行开始时间:${starttime}<==>结束时间:${moment().format(
      "YYYY-MM-DD HH:mm:ss"
    )}`
  );
  sendMessage(
    `程序运行开始时间:${starttime}<==>结束时间:${moment().format(
      "YYYY-MM-DD HH:mm:ss"
    )}`
  );
});
