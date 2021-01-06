const { mock } = require('mockjs');
const Mock = require('mockjs');
const result = Mock.mock({
    "datas|13-16":[{
        "id|+1": 1,
        className: '我是第 @id 帅',
        openDate: '@date'
    }]
}).datas;
const Class = require('../models/Class');
Class.bulkCreate(result)