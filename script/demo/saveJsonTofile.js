/*
 * @Author: your name
 * @Date: 2021-07-17 15:25:14
 * @LastEditTime: 2021-07-17 15:56:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SolidPollutionItem\tmp\script\saveJsonTofile.js
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

const creatFolder = function (filePath) {
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath);
    }
  };

const saveJsonToFile = (dataJson,pathFileDir,fileName)=>{
    // var fileDirectory = "E:\\files\\program\\supOS\\NanjinTechUniversity\\xlsx\\demo\\"+resonFileName+".xlsx";
    // var newfileDirectory = "E:\\files\\program\\supOS\\NanjinTechUniversity\\xlsx\\demo\\"+resonFileName+".json";
    var  newfileDirectory = `${pathFileDir}\\${fileName}.json`
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
    fs.writeFileSync(newfileDirectory, JSON.stringify(dataJson))
 }

 module.exports = {
    saveJsonToFile,
  };