/*
 * @Author: your name
 * @Date: 2021-07-16 22:41:30
 * @LastEditTime: 2021-08-09 22:09:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SolidPollutionItem\tmp\controller\stdService0Controller.js
 */

var request = require("request");
// var request = require("request");
const XLSX = require("xlsx");
const xlsx = require("node-xlsx");
var fs = require("fs");
var moment = require("moment");
var os = require("os");
var path = require("path"); /*nodejs自带的模块*/
var cheerio = require("cheerio");
const jsdom = require("jsdom");
const json2xls = require("json2xls");

var oauth = require("../api/home/system/oauth");
var properties = require("../api/home/metadata/properity");
var XLSX_JSON = require("../script/XLSX_JSON");

const iptestEnv = "123.60.12.183"
const ipactualEnv = "10.32.203.157"
const ipEnvSelected = iptestEnv;

async function test() {

  const loginInfo = await oauth.login(ipEnvSelected);
  const objName = 'stdService0';
  const propertiesList = await properties.getList(objName)
  return propertiesList;
}
// supos.login().then(res=>{console.log(res)})
test()
  .then((res) => {
    let dataJson  = {list:res},
    pathFileDir = path.resolve(__dirname,'../data/stdService0');
    let currentTime = moment().format('YYYY_MM_DD_HH_mm_ss')
    fileName = "stdService0_"+currentTime
    XLSX_JSON.saveJsonToFile(dataJson,pathFileDir,fileName);
    XLSX_JSON.jsonToExcel(dataJson,pathFileDir,fileName)
    // console.log(res);
  })
  .catch((e) => console.log(e));


/* 
function getStdService() {
  pathFileDir = path.resolve(__dirname, "../data/ruletable");
  fileName = "actual";
  XLSX_JSON.jsonfileToExcel(pathFileDir, fileName);
}
getStdService() */