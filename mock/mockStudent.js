const Mock = require("mockjs");
const result = Mock.mock({
    "datas|500-700": [{
        "id|+1": 1,
        name: "@cname",
        birthday: "@date",
        "sex|1-2": true,
        mobile: /1\d{10}/,
        //   location: "@city(true)",
        "ClassId|1-14": 0,
    }, ],
}).datas;
console.log(result);
const Student = require("../models/Student");
Student.bulkCreate(result);