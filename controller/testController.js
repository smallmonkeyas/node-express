/*
 * @Author: your name
 * @Date: 2021-08-11 02:24:36
 * @LastEditTime: 2021-08-14 02:30:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SolidPollutionItem\tmp\controller\Untitled-1.js
 */
const path = require("path");
const wxm = require("wxmnode");
const moment = require("moment");

var fs = require("fs");

const WebSocket = require("ws"); //模块引入
// const creatFolder = function (filePath) {
//     if (!fs.existsSync(filePath)) {
//       fs.mkdirSync(filePath);
//     }
//   };
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

mkDirsSync("e:\\files\\program\\supOS\\SolidPollutionSource\\solidpollution\\SolidPollutionItem\\tmp\\data\\history\\2021-07-15T03_16_00Zto2021-07-18T10_55_27Z")
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
sendMessage('是')
const beginTime = "2021-07-06 11:16:00",
  endTime = moment().format("YYYY-MM-DD HH:mm:ss");
const basicPath = path.resolve(
  __dirname,
  `../data/history/${moment(beginTime).format(
    "YYYY-MM-DD_HH_mm_ss"
  )}to${moment(endTime).format("YYYY-MM-DD_HH_mm_ss")}`
);
let pathFileDir = path.resolve(
  basicPath,
`./shi`
),
hh;
hh = pathFileDir