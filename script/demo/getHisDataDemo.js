/*
 * @Author: your name
 * @Date: 2021-04-17 20:49:51
 * @LastEditTime: 2021-04-17 20:49:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \basicService\内网数据\历史数据导出\内网\getHisDataDemo.js
 */
var request = require("request");
// var request = require("request");
const XLSX = require("xlsx");
const xlsx = require("node-xlsx");
var fs = require("fs");
var moment = require("moment");
var os = require("os");
var path=require('path');  /*nodejs自带的模块*/
var cheerio = require("cheerio");
const jsdom = require("jsdom");
const json2xls = require("json2xls");
// var res = {"E20720":0,"E52440":21.65,"NEI_CODE":null,"E53532":93.98,"E53531":22.85,"E53534":218.69,"E53533":105.35,"WCA_MN_CODE":"320407000102486888889101","E53535":12.79,"E524E1":224.73,"E524E2":15.5,"E546C2":112.72,"E546C1":88.19,"E546C4":10.02,"E546C3":214.7,"E90700":16.34,"E546C6":19.94,"E546C5":13.13,"Longitude":"119.985904","E52571":18.6,"E52451":21.09,"E52572":17.19,"E52452":18.55,"E52573":16.77,"E52453":83.98,"E52574":86.89,"E52454":106.24,"E52575":113.93,"E52455":224.63,"E52576":222.12,"E52456":19.3,"E52577":17.51,"E10810":0,"E535E2":92.62,"E535E1":20.4,"E537E2":24.73,"E537E1":12.18,"E20620":10.26,"E11112":20181336,"E11111":2427.16,"E11110":16777216,"E52781":18.18,"E52782":16.59,"E11116":13235,"E11115":4749.97,"E537F1":84.15,"E535B1":16.57,"E537F2":113.59,"E535B3":18.81,"E535B2":12.12,"E535B5":108.61,"E90800":84.45,"E535B4":92.98,"E535B7":14.77,"E535B6":217.65,"E54052":12.36,"E535B9":17.14,"E54051":214.13,"E535B8":16.87,"E54053":15.05,"E52430":7.82,"E52431":1.6,"E52432":102.31,"E52433":223.07,"E52434":17.38,"E10710":17.54,"E20920":0,"E53051":16.48,"E54382":18.46,"E54381":213.25,"Latitude":"31.950996","E53053":20.6,"E54384":22.36,"E53052":15.15,"E54383":15.16,"E54386":94.12,"E54385":20.06,"Name":"常州溧阳第二污水处理厂","E53732":13.83,"E53731":10,"E53733":18.86,"E20121":2321,"E20120":103,"E540C2":18.3,"E20122":1089,"E540C1":18.45,"E540C4":108.66,"E540C3":81.54,"E540C6":15.34,"E540C5":217.41,"USC_CODE":null,"E524A1":27.65,"E524A2":89.96,"E524A3":101.37,"AE_CODE":null,"SI_CODE":null,"E10210":186.5,"E90100":83.55,"E52891":23.25,"E_CODE":"320407000102486","E20820":0,"E52861":13.23,"E541C1":11.84,"E541C3":23.84,"E541C2":13.58,"E541C5":106.97,"E541C4":83.09,"E541C6":215.9,"E537B1":17.99,"E537B3":20.1,"E537B2":19.54,"E537B5":84.43,"E537B4":23.37,"E537B7":210.53,"E10113":0,"E537B6":108.54,"E10112":1097,"E537B9":17.05,"E10111":3932.08,"E537B8":19,"E10110":4.5,"E90200":101.73,"E10910":0,"E10116":1407.08,"E10115":0,"E10114":0,"E21122":17910600,"E21121":12.77,"E21120":0,"E56081":18.03,"E56084":27.71,"Address":"常州市新北区长江北路1201号","E56082":19.51,"E56083":16.66,"E52961":108.24,"EIP_CODE":null,"E20320":1.97,"E542C2":13.77,"E542C1":13.64,"E542C4":16.77,"E542C3":18.77,"E542C6":104.92,"E11182":7722.09,"E542C5":94.66,"E11181":3093.1,"E10410":0,"E90300":217.71,"E53592":107.27,"E53591":86.1,"E53594":14.84,"E53593":223.37,"E20220":43.78,"E90400":16.92,"E56073":113.09,"E56074":214.58,"E56071":22.03,"E56072":88.36,"E10310":9.95,"E20520":7.98,"E10171":1288.03,"E90500":15.54,"E528A1":86.61,"E52491":13.47,"E10173":0,"E10172":571.83,"E10610":6.89,"E10182":1242.21,"E10181":0,"E52581":11.94,"E53792":91.89,"E52582":18.38,"E52461":19.35,"E53791":20.46,"E52583":17.39,"E53552":12.88,"E53794":213.61,"E52584":84.36,"E53551":19.56,"E53793":114.33,"E52585":109.17,"E52586":216.04,"E53553":17,"E20420":0.23,"E535F1":106.07,"E545C1":107.3,"E535F2":224.46,"E545C3":10.81,"E545C2":223.07,"E90600":23.4,"E545C5":22.37,"E545C4":21.07,"E545C6":24.02,"E529A1":221.77,"INONE_CODE":"污水处理及其再生利用","E10510":0}

const basicSourceFolder = __dirname+"\\企业历史json数据";
const basicDirectFolder = __dirname+"\\企业历史excel数据";
const creatFile =function(filePath){
    if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath);
      }
      
}
const dataJsonToExcel = function (dataJsonArr,presentFactory) {
    //   let dataTrueJsonArr = []
        const presentFactoryInfoFolder = basicDirectFolder + "\\" +presentFactory
        creatFile(presentFactoryInfoFolder)
      dataJsonArr.forEach((item) => {
        let { hasNext, ...param } = item;
        excelJson = param[Object.keys(param)];
    
        // ws= XLSX.utils.json_to_sheet(excelJson);
        // XLSX.utils.book_append_sheet(wb, ws, paramArr[ii]);
        let xls = json2xls(excelJson);
        console.log(xls);
        
        fs.writeFileSync(
            presentFactoryInfoFolder+"\\"+ Object.keys(param) + ".xlsx",
          xls,
          "binary"
        );
      });
    };
/**
 * Todo：1
 */
/* var paramArrInNet_0_99 = Object.keys(res).slice(0,99)
var paramArrInNet_99_ = Object.keys(res).slice(99)

// var pramArrayOrginAll = ["E20720","E52440","NEI_CODE","E53532","E53531","E53534","E53533","WCA_MN_CODE","E53535","E524E1","E524E2","E546C2","E546C1","E546C4","E546C3","E90700","E546C6","E546C5","Longitude","E52571","E52451","E52572","E52452","E52573","E52453","E52574","E52454","E52575","E52455","E52576","E52456","E52577","E10810","E535E2","E535E1","E537E2","E537E1","E20620","E11112","E11111","E11110","E52781","E52782","E11116","E11115","E537F1","E535B1","E537F2","E535B3","E535B2","E535B5","E90800","E535B4","E535B7","E535B6","E54052","E535B9","E54051","E535B8","E54053","E52430","E52431","E52432","E52433","E52434","E10710","E20920","E53051","E54382","E54381","Latitude","E53053","E54384","E53052","E54383","E54386","E54385","Name","E53732","E53731","E53733","E20121","E20120","E540C2","E20122","E540C1","E540C4","E540C3","E540C6","E540C5","USC_CODE","E524A1","E524A2","E524A3","AE_CODE","SI_CODE","E10210","E90100","E52891","E_CODE","E20820","E52861","E541C1","E541C3","E541C2","E541C5","E541C4","E541C6","E537B1","E537B3","E537B2","E537B5","E537B4","E537B7","E10113","E537B6","E10112","E537B9","E10111","E537B8","E10110","E90200","E10910","E10116","E10115","E10114","E21122","E21121","E21120","E56081","E56084","Address","E56082","E56083","E52961","EIP_CODE","E20320","E542C2","E542C1","E542C4","E542C3","E542C6","E11182","E542C5","E11181","E10410","E90300","E53592","E53591","E53594","E53593","E20220","E90400","E56073","E56074","E56071","E56072","E10310","E20520","E10171","E90500","E528A1","E52491","E10173","E10172","E10610","E10182","E10181","E52581","E53792","E52582","E52461","E53791","E52583","E53552","E53794","E52584","E53551","E53793","E52585","E52586","E53553","E20420","E535F1","E545C1","E535F2","E545C3","E545C2","E90600","E545C5","E545C4","E545C6","E529A1","INONE_CODE","E10510"]var paramArrOrgin = pramArrayOrginAll
var paramArrOrgin = Object.keys(res)


var paramArr = []
 paramArrOrgin.forEach(item=>{
  if(item.search(/E[0-9]/)==0){
    paramArr.push(item)
  }

}) */
/**
 * Todo：2
 */
// var factoryName = [
//   "常州溧阳第二污水处理厂",
//   "常州市金坛区第二污水处理有限公司",
//   "常州市深水江边污水处理厂",
//   "光大城乡再生能源(灌云)",
//   "扬州污泥发电厂",
//   "句容市深水水务有限公司",
//   "光大环保能源(镇江)",
// ];
var factoryName = []
// var basicDirectory = ".\\内网数据\\溧阳水厂\\"
// var preDir = '溧阳_100_'
// var resonFileName = basicDirectory+"参数历史数据\\"+preDir
// var jsonFileName = basicDirectory+preDir
// var fileDirectory =jsonFileName+".json";
/**
 * Todo: 定义源文件与目标文件目录，若没有目标目录，则建立相应目录
 */

creatFile(basicDirectFolder)
if (fs.existsSync(basicSourceFolder)) {
  var files = fs.readdirSync(basicSourceFolder);
  for (var i = 0; i < files.length; i++) {
    var presentFile = files[i];
    var presentSourceFilePath = basicSourceFolder + "\\" + presentFile;
    var presentFactory = path.basename(presentSourceFilePath,path.extname(presentFile))
    var fileFactoryResult = fs.readFileSync(presentSourceFilePath)
    if(fileFactoryResult.length > 0) {
        var fileFactoryJson = JSON.parse(fileFactoryResult);
        var dataJsonArr = fileFactoryJson.list;
        dataJsonToExcel(dataJsonArr,presentFactory);
    }
    
  }
} else {
  console.log(fileDirectory + " Not Found!");
}


//   var excelJson, ws;
//   const wb = XLSX.utils.book_new();

//   /**
//    * @json转excel后放置到多个excel中
//    */

//   for (let ii = 0; ii < dataJsonArr.length; ii++) {
//     excelJson = dataJsonArr[ii][paramArr[ii]];

//     // ws= XLSX.utils.json_to_sheet(excelJson);
//     // XLSX.utils.book_append_sheet(wb, ws, paramArr[ii]);
//     let xls = json2xls(excelJson);
//     console.log(xls);
//     fs.writeFileSync(
//       resonFileName + "\\" + paramArr[ii] + ".xlsx",
//       xls,
//       "binary"
//     );
//   }


/**
 * @json转excel后放置到一个excel中
 */
// /* for(let ii = 0; ii < dataJsonArr.length; ii++) {

//     excelJson = dataJsonArr[ii][paramArr[ii]]

//   ws= XLSX.utils.json_to_sheet(excelJson);
//   XLSX.utils.book_append_sheet(wb, ws, paramArr[ii]);

// }
// XLSX.writeFile(wb, resonFileName+'\\' + 'SheetJS.xlsx'); //直接定义死文件名 */
// // let xls = json2xls(excelJson);
// // console.log(xls)
// // fs.writeFileSync(resonFileName+ '\\' + '测试'+'.xlsx', xls, 'binary');

// //

// // const ws2= XLSX.utils.json_to_sheet(config);
//   //  const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.aa);
//    // const ws2: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.aa);

//  /* generate workbook and add the worksheet */

// // XLSX.utils.book_append_sheet(wb, ws2, '测试');
// //   console.log(wb)
//  /*  if(!wb.Props) wb.Props = {};
//    wb.Props.Title = "Insert Title Here"+res;*/
//  /* save to file */
