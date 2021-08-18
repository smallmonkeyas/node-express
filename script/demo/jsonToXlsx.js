/*
 * @Author: your name
 * @Date: 2021-07-17 16:42:53
 * @LastEditTime: 2021-07-17 17:53:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SolidPollutionItem\tmp\script\jsonToxlsx.js
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

const wxm = require("wxmnode");

const creatFolder = function (filePath) {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath);
  }
};

/**
 * @json转excel格式后写到excel文件中
 */
 const convertJsonToExcel = function (dataJson, pathFileDir,fileName) {
    //   let dataTrueJsonArr = []
    var excelJson;
    var  newfileDirectory = `${pathFileDir}\\${fileName}.xlsx`
    // var newfileDirectory = "d:\\b";
    if (!fs.existsSync(pathFileDir)) {
    //   var files = fs.readdirSync(fileDirectory);
    //   for (var i = 0; i < files.length; i++) {
        // var filePath = fileDirectory + "\\" + files[i];
        // var newfilepath = newfileDirectory + "\\" + files[i];
        // var fileObj = fs.readFileSync(fileDirectory)
        // var filestr = JSON.parse(fs.readFileSync(fileDirectory))
        // fs.writeFileSync(newfileDirectory, JSON.stringify(dataJson))
        creatFolder(pathFileDir); 
    //   console.log(fileDirectory + " Not Found!");
    }
      excelJson = dataJson.list;
  
      // ws= XLSX.utils.json_to_sheet(excelJson);
      // XLSX.utils.book_append_sheet(wb, ws, paramArr[ii]);
      let xls = json2xls(excelJson);
    //   console.log(xls);
  
      fs.writeFileSync(
        newfileDirectory,
        xls,
        "binary"
      );
    // });
  };

  module.exports = {
    convertJsonToExcel,
  };