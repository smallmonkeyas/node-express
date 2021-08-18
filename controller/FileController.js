/*
 * @Author: your name
 * @Date: 2021-07-23 09:11:13
 * @LastEditTime: 2021-07-25 00:39:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SolidPollutionItem\tmp\controller\FactoryController.js
 */
const fs = require("fs");
const readlineSync = require("readline-sync");
const moment = require("moment");
const os = require("os");
const path = require("path");

const XLSX_JSON = require("../script/XLSX_JSON");
const file = require("../script/file");
const getFactoryJson = async function (pathFileDir, fileName) {
  //TODO: 1.1读取配置文件（csv格式）-读取为json格式
  
  

  // let dataJson = XLSX_JSON.readcsvFile(pathFileDir, fileName);
  let dataJson = await XLSX_JSON.csvToExcel(pathFileDir, fileName);

  //TODO: 1.2保存到json文件中
  XLSX_JSON.saveJsonToFile(dataJson, pathFileDir, fileName);
  //TODO: 1.3读取json文件，确认写入成功，同时获取json格式数据
  const arrJson = XLSX_JSON.readJsonFile(pathFileDir, fileName);
  return { list: arrJson };
};

const singleCsvController = async function (pathFileDir, fileName) {
  
  const dataJson = await getFactoryJson(pathFileDir, fileName);
  XLSX_JSON.jsonToExcel(dataJson, pathFileDir, fileName);
  return true;
};

// singleCsvController(pathFileDir, fileName).then((res) => {
//   console.log(res);
// });
/**************************************************** */
//TODO: 批量csv转excel
const BatchCsvController = async function (pathFileDir) {
  // let name = 'ex'
  // let fileName =await file.rmfile('.json',pathFileDir);
  let filesName = file.get('.csv',pathFileDir);
  let together = new Array(filesName.length).fill(null);
  for(let i = 0; i < filesName.length; i++){
    let fileName = filesName[i];
    together[i] = await singleCsvController(pathFileDir, fileName) 
  }
  const result = Promise.all(together);
  // result = together;
  return result;
  // return []
}

let pathFileDir = path.resolve(__dirname, "../data/config");
// let fileName = "factory";
// let pathFileDir = path.resolve(process.cwd(), "../data/ruletable");
// let fileName = "规则库常高新";
BatchCsvController(pathFileDir).then((res) => {
  console.log(`完成${res.length}项修改`);
});
