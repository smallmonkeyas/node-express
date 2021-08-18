/*
 * @Author: your name
 * @Date: 2021-07-28 14:14:13
 * @LastEditTime: 2021-07-28 17:42:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SolidPollutionItem\tmp\api\home\metadata\data.js
 */
const objectData = function(objName,propDesc){
    return {
        "showName": `${propDesc}`,
        "templateName": "GenericObject",
        "name": `${objName}`,
        "description": "",
        "icon": "",
        "range": "public",
        "status": true
    }
}
const properitiesData = function(objName,propName,alarmParam,propDesc,defaultValue) {
    const date = new Date().getTime();
    const id = `uuid_${alarmParam}_${date}`;
    return {
        "name": `${propName}`,
        "primitiveType": "Integer",
        "showName": `${propDesc}`,
        "bindingInfo": {},
        "readonly": false,
        "minute": false,
        "hour": false,
        "day": false,
        "month": false,
        "max": false,
        "min": false,
        "mean": false,
        "sum": false,
        "timestampType": 1,
        "structName": "",
        "objectTemplateName": "",
        "maxValue": 100,
        "minValue": 0,
        "digit": 0,
        "defaultValue": {"value": defaultValue},
        "icon": "",
        "objName": `${objName}`,
        "range": "public",
        "alerts": [
            {
                "name": `${id}`,
                "templateName": "AlertObject",
                "objectType": 0,
                "visible": false,
                "changeable": true,
                "systemProperty": false,
                "description": `数据缺失-${propDesc}`,
                "properties": [
                    {
                        "name": "ownerType",
                        "primitiveType": "Integer",
                        "structType": 0,
                        "templateName": "AlertObject",
                        "override": true,
                        "defaultValue": {
                            "value": 0
                        }
                    },
                    {
                        "name": "ownerName",
                        "primitiveType": "String",
                        "structType": 0,
                        "templateName": "AlertObject",
                        "override": true,
                        "defaultValue": {
                            "value": `${objName}`
                        }
                    },
                    {
                        "name": "propertyName",
                        "primitiveType": "String",
                        "structType": 0,
                        "templateName": "AlertObject",
                        "override": true,
                        "defaultValue": {
                            "value": `${propName}`
                        }
                    },
                    {
                        "name": "showName",
                        "primitiveType": "String",
                        "structType": 0,
                        "templateName": "AlertObject",
                        "override": true,
                        "defaultValue": {
                            "value": `${alarmParam}`
                        }
                    },
                    {
                        "name": "alertType",
                        "primitiveType": "String",
                        "structType": 0,
                        "templateName": "AlertObject",
                        "override": true,
                        "defaultValue": {
                            "value": "eq"
                        }
                    },
                    {
                        "name": "limitValue",
                        "primitiveType": "DataStruct",
                        "templateName": "AlertObject",
                        "override": true,
                        "primitiveTypeDefinition": {
                            "hasDefault": false,
                            "name": "",
                            "property": {
                                "aspect": {
                                    "structName": "LimitData"
                                }
                            }
                        },
                        "structType": 1,
                        "defaultValue": {
                            "value": [
                                {
                                    "values": 1,
                                    "include": false
                                }
                            ]
                        }
                    },
                    {
                        "name": "enabled",
                        "primitiveType": "Boolean",
                        "structType": 0,
                        "templateName": "AlertObject",
                        "override": true,
                        "defaultValue": {
                            "value": true
                        }
                    },
                    {
                        "name": "priority",
                        "primitiveType": "Integer",
                        "structType": 0,
                        "templateName": "AlertObject",
                        "override": true,
                        "defaultValue": {
                            "value": 1
                        }
                    },
                    {
                        "name": "enableTTS",
                        "primitiveType": "Boolean",
                        "structType": 0,
                        "templateName": "AlertObject",
                        "override": true,
                        "defaultValue": {
                            "value": false
                        }
                    },
                    {
                        "name": "triggerLocation",
                        "primitiveType": "String",
                        "structType": 0,
                        "templateName": "AlertObject",
                        "override": true,
                        "defaultValue": {}
                    },
                    {
                        "name": "originLocation",
                        "primitiveType": "String",
                        "structType": 0,
                        "templateName": "AlertObject",
                        "override": true,
                        "defaultValue": {}
                    },
                    {
                        "name": "videoChannel",
                        "primitiveType": "String",
                        "structType": 0,
                        "templateName": "AlertObject",
                        "override": true,
                        "defaultValue": {
                            "value": ""
                        }
                    },
                    {
                        "name": "videoChannelShowName",
                        "primitiveType": "String",
                        "structType": 0,
                        "templateName": "AlertObject",
                        "override": true,
                        "defaultValue": {}
                    },
                    {
                        "name": "videoName",
                        "primitiveType": "String",
                        "structType": 0,
                        "templateName": "AlertObject",
                        "override": true,
                        "defaultValue": {
                            "value": ""
                        }
                    },
                    {
                        "name": "videoShowName",
                        "primitiveType": "String",
                        "structType": 0,
                        "templateName": "AlertObject",
                        "override": true,
                        "defaultValue": {}
                    },
                    {
                        "name": "inputs",
                        "override": true,
                        "primitiveType": "DataStruct",
                        "primitiveTypeDefinition": {
                            "name": "",
                            "hasDefault": false,
                            "property": {
                                "aspect": {
                                    "structName": "SourceEventData"
                                }
                            }
                        },
                        "structType": 1,
                        "templateName": "AlertObject",
                        "visible": false,
                        "defaultValue": {
                            "value": [
                                {
                                    "eventName": "ValueChangeEvent",
                                    "propertyName": `${propName}`,
                                    "sourceName": `${objName}`
                                }
                            ]
                        }
                    },
                    {
                        "name": "deadZone",
                        "override": true,
                        "primitiveType": "Integer",
                        "structType": 0,
                        "templateName": "AlertObject",
                        "defaultValue": {
                            "type": "number",
                            "value": 0
                        }
                    }
                ],
                "putType": "saveAlert"
            }
        ],
        "override": false,
        "hasDafault": true,
        "statisticsInfo": {
            "offsetZone": -480,
            "intervalTime": {
                "minute": false,
                "hour": false,
                "day": false,
                "month": false
            },
            "aggrType": {
                "mean": false,
                "min": false,
                "max": false,
                "sum": false
            }
        },
        "primitiveTypeDefinition": {
            "name": "Integer",
            "description": "Integer",
            "hasDefault": false,
            "property": {
                "aspect": {
                    "maxValue": 100,
                    "minValue": 0,
                    "digit": 0
                }
            }
        }
    } 
}

module.exports = {
    properitiesData,
    objectData
  };