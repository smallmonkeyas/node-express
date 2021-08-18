/*
 * @Author: your name
 * @Date: 2021-07-17 20:25:18
 * @LastEditTime: 2021-07-18 18:35:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SolidPollutionItem\tmp\controller\RuleTableController.js
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

var ruleTable = require("../api/home/runtime/datatable");
var supos = require("../api/home/system/oauth");
//TODO: 读取excel文件，转为json数据

//
async function test() {
  const iptestEnv = "123.60.12.183";
  const ipactualEnv = "10.32.203.157";
  let data;
  const loginInfo = await supos.login(ipactualEnv);
  data = {
    input: JSON.stringify({sql:"select * from tbl_RuleDepot_RuleDepotCMH limit 300 offset 40",pageSize:100})
}
const resSelectData = await ruleTable.select(data, "RuleDepot")
  data = {
    "where": {
        "id": "2997"
    },
    "update": {
        "content": "一定时间内，数据最大值或最小值相同",
        "paramInclude": "好氧池溶解氧浓度三期北",
        "factoryCatatory": "污水厂",
        "ruleType": "设限值",
        "creatTime": "2021-04-06 21:30:10"
    }
}
const resUpdate = await ruleTable.update(data, "RuleDepot")

  data = {
    "id": "4505"
}
const res = await ruleTable.deleteAll(data, "RuleDepot")
  data = {
    content: "55",
    paramInclude: "555",
    factoryCatatory: "生物发电厂",
    ruleType: "满屏跳",
    creatTime: "2021-7-17 20:20:43",
    epcode: "320200800029",
    id: 4505,
  };
  return await ruleTable.add(data, "RuleDepot");
}
test().then((res) => {
  console.log(res);
});
