/*
 * @Author: your name
 * @Date: 2021-07-17 17:48:18
 * @LastEditTime: 2021-08-14 23:58:44
 * @LastEditors: Please set LastEditors
 * @Description: 引用的库-excel和json数据转换库
 * @FilePath: \SolidPollutionItem\tmp\script\XLSX_JSON.js
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
var system = require("./system");

const creatFolder = function (filePath) {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath);
  }
};
let mkDirsSync = function mkDirsSync(dirname) {
  if (fs.existsSync(dirname)) {
      return true;
  } else {
      if (mkDirsSync(path.dirname(dirname))) {
          fs.mkdirSync(dirname);
          return true;
      }
  }
};
const saveJsonToFile = (dataJson, pathFileDir, fileName) => {
  // var fileDirectory = "E:\\files\\program\\supOS\\NanjinTechUniversity\\xlsx\\demo\\"+resonFileName+".xlsx";
  // var newfileDirectory = "E:\\files\\program\\supOS\\NanjinTechUniversity\\xlsx\\demo\\"+resonFileName+".json";
  var newfileDirectory = `${pathFileDir}\\${fileName}.json`;
  // var newfileDirectory = "d:\\b";
  if (!fs.existsSync(pathFileDir)) {
    //   var files = fs.readdirSync(fileDirectory);
    //   for (var i = 0; i < files.length; i++) {
    // var filePath = fileDirectory + "\\" + files[i];
    // var newfilepath = newfileDirectory + "\\" + files[i];
    // var fileObj = fs.readFileSync(fileDirectory)
    // var filestr = JSON.parse(fs.readFileSync(fileDirectory))
    // fs.writeFileSync(newfileDirectory, JSON.stringify(dataJson))
    mkDirsSync(pathFileDir);
    //   console.log(fileDirectory + " Not Found!");
  }
  fs.writeFileSync(newfileDirectory, JSON.stringify(dataJson));
};
const excelToJson = function (pathFileDir, fileName) {
  var xlsxFileName = `${pathFileDir}\\${fileName}.xlsx`
  var workbook = XLSX.readFile(xlsxFileName);
  var sheetNames = workbook.SheetNames;
  var worksheet = workbook.Sheets[sheetNames[0]];
  // var worksheet = workbook.Sheets;
  var datas = XLSX.utils.sheet_to_json(worksheet);
  return datas;
  // saveJsonToFile(datas)
};

/**
 * @json转excel格式后写到excel文件中
 */
const jsonToExcel = function (dataJson, pathFileDir, fileName) {
  //   let dataTrueJsonArr = []
  var ws,tmpexcelJson;
  const wb = XLSX.utils.book_new();;
  var newfileDirectory = `${pathFileDir}\\${fileName}.xlsx`;
  if (!fs.existsSync(pathFileDir)) {
    //   var files = fs.readdirSync(fileDirectory);
    //   for (var i = 0; i < files.length; i++) {
    // var filePath = fileDirectory + "\\" + files[i];
    // var newfilepath = newfileDirectory + "\\" + files[i];
    // var fileObj = fs.readFileSync(fileDirectory)
    // var filestr = JSON.parse(fs.readFileSync(fileDirectory))
    // fs.writeFileSync(newfileDirectory, JSON.stringify(dataJson))
    mkDirsSync(pathFileDir);
    //   console.log(fileDirectory + " Not Found!");
  }
  tmpexcelJson = dataJson;
  const excelJson = tmpexcelJson.map(item =>{
    if(!system.isJSON(item)){
      return {error:item}
    }else{
      return item
    }
  })
  ws= XLSX.utils.json_to_sheet(excelJson);
  XLSX.utils.book_append_sheet(wb, ws, fileName);
  XLSX.writeFile(wb, newfileDirectory);
  /* let xls = json2xls(excelJson);
  fs.writeFileSync(newfileDirectory, xls, "binary"); */

};
/**
 * @json转excel后放置到一个excel中
 * @dataJsonArr->{list:[key1:dataJson,key2:dataJson]}
 */
 const jsonsToOneExcel = function (dataJsonArr, pathFileDir, fileName) {
  //   let dataTrueJsonArr = []
  var excelJson, ws;
  const wb = XLSX.utils.book_new();
  var newfileDirectory = `${pathFileDir}\\${fileName}.xlsx`;
  if (!fs.existsSync(pathFileDir)) {
    mkDirsSync(pathFileDir);
  }
  dataJsonArr.forEach((item) => {
    let param = item;
    excelJson = param[Object.keys(param)];
    ws = XLSX.utils.json_to_sheet(excelJson);
    XLSX.utils.book_append_sheet(wb, ws, Object.keys(param));
  });
  XLSX.writeFile(wb, newfileDirectory); //直接定义死文件名
};

const readJsonFile = function(pathFileDir, fileName){
  var basicDir = `${pathFileDir}\\${fileName}`;
  var jsonfileDirectory = `${basicDir}.json`;
  if (fs.existsSync(jsonfileDirectory)) {
    var fileFactoryResult = fs.readFileSync(jsonfileDirectory);
    if (fileFactoryResult.length > 0) { 
      return JSON.parse(fileFactoryResult);
    }
  } else {
    console.log(jsonfileDirectory + " Not Found!");
    return false
  }
}


const jsonfileToExcel = function (pathFileDir, fileName) {
  //   let dataTrueJsonArr = []
  var excelToJsonArr;
  var basicDir = `${pathFileDir}\\${fileName}`;
  var jsonfileDirectory = `${basicDir}.json`;
  var xlsxfileDirectory = `${basicDir}.xlsx`;
  if (fs.existsSync(jsonfileDirectory)) {
    var fileFactoryResult = fs.readFileSync(jsonfileDirectory);
    if (fileFactoryResult.length > 0) { 
      var fileFactoryJson = JSON.parse(fileFactoryResult);
      excelToJsonArr = fileFactoryJson.list;
      let xls = json2xls(excelToJsonArr);
      //   console.log(xls);
    
      fs.writeFileSync(xlsxfileDirectory, xls, "binary");
    }
  } else {
    console.log(jsonfileDirectory + " Not Found!");
  }

};

/**
 *@csv与json转换 
 */

 const readcsvFile = function (pathFileDir, fileName) {
  var basicDir = `${pathFileDir}\\${fileName}`;
  var jsonfileDirectory = `${basicDir}.csv`;
  if (fs.existsSync(jsonfileDirectory)) {
    var fileFactoryResult = fs.readFileSync(jsonfileDirectory);
    // if (fileFactoryResult.length > 0) { 
    //   return JSON.parse(fileFactoryResult);
    // }
    return true;
  } else {
    console.log(jsonfileDirectory + " Not Found!");
    return false
  }
 }

 const csvToJson = function(pathFileDir, fileName){
  var basicDir = `${pathFileDir}\\${fileName}`;
  var csvfileDirectory = `${basicDir}.csv`;
  var jsonfileDirectory = `${basicDir}.json`;
  return new Promise(function (resolve, reject) {
  fs.createReadStream(csvfileDirectory)
    .pipe(csv2json({
      // Defaults to comma.
      separator: ';'
    }))
    .pipe((function(){
     fs.createWriteStream(jsonfileDirectory)
     resolve(1)
    })());

  })
  

 }
 const csvToExcel = async function(pathFileDir, fileName){
  var basicDir = `${pathFileDir}\\${fileName}`;
  var csvfileDirectory = `${basicDir}.csv`;
  var jsonfileDirectory = `${basicDir}.json`;
  const jsonArray=await csv().fromFile(csvfileDirectory);
  return jsonArray
  // return await csvToJson(pathFileDirfileName,)
//   fs.createReadStream('data.csv')
//   .pipe(csv2json({
//     // Defaults to comma.
//     separator: ';'
//   }))
//   .pipe(fs.createWriteStream('data.json'));
 }




module.exports = {
  saveJsonToFile,
  jsonToExcel,
  jsonsToOneExcel,
  jsonfileToExcel,
  readJsonFile,
  excelToJson,
  readcsvFile,
  csvToJson,
  csvToExcel,
};
