const request = require("request");
const fs = require("fs");
const readlineSync = require("readline-sync");
const moment = require("moment");
const os = require("os");
const path = require("path");

const XLSX_JSON = require("../script/XLSX_JSON");
const system = require("../script/system");
const ruleTable = require("../api/home/runtime/datatable");
const oauth = require("../api/home/system/oauth");
const properties = require("../api/home/metadata/properity");

//TODO: 1、读取规则库文件（Excel格式）

//TODO: 2、excel文件转为json文件

//TODO: 3、读取json文件写到系统用户所建的规则库数据表中

//TODO: 4、截取步骤2中json文件所有的参数配置对象实例、对象属性和默认值列并放置到一个对象中

//TODO: 5、遍历4中对象中的对象实例、对象属性和默认值依次在系统中新建对象属性

const getRuleJson = function (pathFileDir, fileName) {
  //TODO: 1.1读取规则库文件（Excel格式）-读取为json格式

  let dataJson = XLSX_JSON.excelToJson(pathFileDir, fileName);
  //TODO: 1.2保存到json文件中
  XLSX_JSON.saveJsonToFile(dataJson, pathFileDir, fileName);
  //TODO: 1.3读取json文件，确认写入成功，同时获取json格式数据
  const arrRuleTable = XLSX_JSON.readJsonFile(pathFileDir, fileName);
  return arrRuleTable;
};
const iptestEnv = "123.60.12.183";
const ipactualEnv = "10.32.203.157";
const ipSelect = iptestEnv;

const configRule = async function () {
  //TODO: 0、 登录supOS系统,获取系统信息
  const loginInfo = await oauth.login(ipSelect);
  //TODO: 1、读取规则库文件（Excel格式）-读取为json格式
  let pathFileDir = path.resolve(__dirname, "../data/config");
  // let pathFileDir = path.resolve(process.cwd(), "./tmp/data/ruletable");
  // let pathFileDir = path.resolve(process.cwd(), "../data/config");
  let fileName = "factoryex";
  const arrRuleTable = getRuleJson(pathFileDir, fileName);
  //TODO: 2、删除原有规则
  const ruleTableObjName = "FactoryTable";
  const deleteRes = await ruleTable.deleteAll(
    { deletenumber: true },
    ruleTableObjName
  );
  
  console.log("删除数据个数：", deleteRes.result);
  //TODO: 3、将1中json数据写到系统用户所建的规则库数据表中
  let resAdd = 0,
    item;
  for (let ii = 0; ii < arrRuleTable.length; ii++) {
    // 不宜使用forEach，会await报错
    item = arrRuleTable[ii];
    res = await ruleTable.add(item, ruleTableObjName);
    resAdd += res.result;
  }
  console.log("添加数据个数：", resAdd);
  // await system.delayms(2000);
  // process.stdin.pause();
  // var userName = readlineSync.question("May I have your name? ");
  // console.log("Hi " + userName + "!");
  return true;
};
//配置规则，下方代码解除注释即可往系统中添加规则，规则实例：RuleBaseCMH(0717新建)
configRule()

  .then((res) => {
    console.log(res);
  })
  .catch((error) => console.log("error", error));

/************************************************************************** */
const cutItemToProperitiesList = function (item) {
  if (!item) return {};
  const {
    objectName,
    ruleConfigParam,
    flagParam,
    SetValue,
    SetFlagValue,
    ruleType,
    paramInclude,
  } = item;
  const configParamList = ruleConfigParam
    .toString()
    .replace(/\ /g, "")
    .split(",");
  const setValueList = SetValue.toString().replace(/\ /g, "").split(",");
  const flagEnabledParam = flagParam.toString().replace(/\ /g, "");
  const flagDefaultValue = SetFlagValue.toString().replace(/\ /g, "");

  if (configParamList.length !== setValueList.length) {
    return { error: "表格配置参数个数和默认值个数不匹配" };
  }
  let arr = [];
  let desUP = configParamList.length === 1 ? ["", ""] : ["下限", "上限"];
  configParamList.forEach((item, index) => {
    arr.push({
      objectName: objectName,
      propName: item,
      defaultValue: parseFloat(setValueList[index]),
      description: `${ruleType}-${paramInclude}--${desUP[index]}`,
    });
  });
  arr.push({
    objectName: objectName,
    propName: flagEnabledParam,
    defaultValue: parseFloat(flagDefaultValue),
    description: `${ruleType}-${paramInclude}--是否使能标记`,
  });
  return arr;
};

const getProperitiesList = function (arrRuleTable) {
  //TODO: 2.1 遍历每条规则
  let arr = [],
    obj;
  arrRuleTable.forEach((item, index) => {
    //TODO: 2.2 截取每条规则中的objectName,ruleConfigParam,flagParam,SetValue,SetFlagValue
    obj = cutItemToProperitiesList(item);
    if (obj.error) {
      console.log(`第${index + 1}行${obj.error}`);
      return false;
    }
    arr.push(...obj);
  });
  return arr;
};

const configProperties = async function () {
  //TODO: 0、 登录supOS系统,获取系统信息
  const loginInfo = await oauth.login(ipSelect);
  //TODO: 1、读取规则库文件（Excel格式）-读取为json格式
  // let pathFileDir = path.resolve(__dirname, "../data/ruletable");
  // let pathFileDir = path.resolve(process.cwd(), "./tmp/data/ruletable");
  let pathFileDir = path.resolve(process.cwd(), "../data/ruletable");
  let fileName = "规则库初始三家";
  const arrRuleTable = getRuleJson(pathFileDir, fileName);
  //TODO: 2、截取json数据所有的参数配置对象实例、对象属性和默认值列并放置到一个数组中(包括参数和规则使能的对象属性)
  const properitiesList = getProperitiesList(arrRuleTable);

  //TODO: 3、删除上次添加的对象属性
  let rmSuccessNumber = 0;
  let index = 0,
    propLen = properitiesList.length;
  while (index < propLen) {
    let item = properitiesList[index];
    const propRm = await properties.remove(item.objectName, item.propName);
    if (!propRm) continue;
    let oneOrzero = propRm.succeeded ? 0 : 1;
    rmSuccessNumber += oneOrzero;
    index++;
  }
  //   for (let i = 0; i < properitiesList.length; i++) {
  //     let item = properitiesList[i];
  //     const propRm = await properties.remove(item.objectName,item.propName)
  //     let oneOrzero = propRm.succeeded?1:0;
  //     rmSuccessNumber+=oneOrzero;

  //   }
  console.log(
    `成功删除${rmSuccessNumber}个，失败删除${
      properitiesList.length - rmSuccessNumber
    }个`
  );

  //TODO: 4、按照2中数组依次写到对应对象实例下的属性中
  let addSuccessNumber = 0;
  for (let i = 0; i < properitiesList.length; i++) {
    let item = properitiesList[i];
    let data = {
      name: item.propName,
      primitiveType: "Double",
      showName: item.propName,
      description: item.description,
      readonly: false,
      timestampType: 1,
      defaultValue: {
        value: item.defaultValue,
      },
    };
    const propAdd = await properties.add(data, item.objectName);
    let oneOrzero = propAdd.succeeded ? 1 : 0;
    addSuccessNumber += oneOrzero;
  }
  console.log(
    `成功添加${addSuccessNumber}个属性，失败添加${
      properitiesList.length - addSuccessNumber
    }个属性`
  );
  // await system.delayms(2000);
  // process.stdin.pause();
  var userName = readlineSync.question("May I have your name? ");
  console.log("Hi " + userName + "!");
  return properitiesList;
};

// 往系统中增加属性
// configProperties()
//   .then((res) => {
//     // console.log(res);
//   })
//   .catch((error) => console.log("error", error));
