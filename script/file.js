/*
 * @Author: your name
 * @Date: 2021-07-24 21:50:12
 * @LastEditTime: 2021-07-25 00:37:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SolidPollutionItem\tmp\script\file.js
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
const csv2json = require("csv2json");
const csv = require("csvtojson");
const wxm = require("wxmnode"); // 微信

const creatdir = function (filePath) {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath);
  }
};
const rmdir = function (filePath) {
  if (!fs.existsSync(filePath)) {
    fs.rmdirSync(filePath);
  }
};
const rmFileSync = function (filePath) {
  return new Promise((resolve, reject) => {
    //异步操作删除xxx.text
    fs.unlink(filePath, (err, data) => {
      if (err) {
        console.log(err);
        resolve(err);
      } else {
        console.log("删除文件成功");
        resolve(true)
      }
    });
  });
};

const rmfile = async function () {
  let filesName = [],
  pathFileDir = arguments[1],
  type = arguments[0],
  result

  if (fs.existsSync(pathFileDir)) {
    //   fs.mkdirSync(filePath);
    filesName = get(...arguments);
    let together = new Array(filesName.length).fill(null);
    for (let i = 0; i < filesName.length; i++) {
      let fileName = filesName[i];
      together[i] = await rmFileSync(`${pathFileDir}\\${fileName}${type}`);
    }
    result = Promise.all(together);
  }
  return result;
};
//!文件操作
//1、读取目录下固定后缀类型的文件
const get = function () {
  if (!fs.existsSync(arguments[1])) {
    console.log("目录出错，要不再调试调试？😂");
    return [];
  }
  let filesPath = [];
  if (arguments.length === 3) {
    const type = arguments[0];
    const pathFileDir = arguments[1];
    const nameIncluded = arguments[2];
    let files = fs.readdirSync(pathFileDir);
    // if(files.length===0){
    //     console.log('无匹配文件')
    //     return []
    // }
    files.forEach((item) => {
      let currentFile = item;
      let filePath = `${pathFileDir}\\${currentFile}`;
      let extName = path.extname(currentFile);
      if (extName !== type) return; //文件类型不符合则退出本次循环
      let currentName = path.basename(filePath, extName);
      const matchRegex = new RegExp(nameIncluded);
      if (!matchRegex.test(currentName)) return; //文件名不符合则退出本次循环
      filesPath.push(currentName);
    });
  } else {
    const type = arguments[0];
    const pathFileDir = arguments[1];
    let files = fs.readdirSync(pathFileDir);
    // if(files.length===0){
    //     console.log('无匹配文件')
    //     return files
    // }
    files.forEach((item) => {
      let currentFile = item;
      let filePath = `${pathFileDir}\\${currentFile}`;
      let extName = path.extname(currentFile);
      if (extName !== type) return; //文件类型不符合则退出本次循环
      let currentName = path.basename(filePath, extName);
      filesPath.push(currentName);
    });
  }
  return filesPath;
};

module.exports = {
  get,
  rmfile,
};
