
const Student = require("../models/Student");
const { Op }  = require('sequelize');
const Class = require('../models/Class')
const validate = require('validate.js')
const moment = require('moment');
const { pick } = require('../util/propertyHelper')

exports.addStudent = async function (stuObj) {
  stuObj = pick(stuObj,'name','birthday','sex','mobile','ClassId')
  validate.validators.classExits = async function(value){
    const c = await Class.findByPk(value);
    if(c){
      return;
    }
    return 'is not exits'
  }
  const rule = {
    name:{
      presence: {
        allowEmpty: false
      },
      type: "string",
      length: {
        minimum: 1,
        maximum: 5 
      }
    },
    birthday: {
      presence: {
        allowEmpty: false
      },
      datetime: {
        dateOnly: true,
        earliest: +moment.utc().subtract(100,'y'),
        latest: +moment.utc().subtract(5,'y')
      }
    },
    sex: {
      presence: true,
      type: 'boolean'
    },
    mobile: {
      presence: {
        allowEmpty: false
      },
      format: /1\d{10}/
    },
    ClassId: {
      presence: true,
      numericality: {
        onlyInterger: true,
        strict: false
      },
      classExits: true
    }
  }
  await validate.async(stuObj,rule);

  const ins = await Student.create(stuObj);
  return ins.toJSON();
  // if(!result){

  // }

};

exports.deleteStudent = async function (id) {
  return await Student.destroy({
    where: {
      id,
    },
  });
};

exports.updateStudent = async function (id, obj) {
  return await Student.update(obj, {
    where: {
      id,
    },
  });
};
exports.getAdminALL = async function(page = 1, limit = 10, sex = -1,name = "" ){
  // const result = await Student.findAll({
  //     offset: (page - 1) * limit,
  //     limit: +limit
  // });
  // // result.toJSON
  // const total = await Student.count()
  // const datas =  JSON.parse(JSON.stringify(result));
  // return {
  //   total,
  //   datas
  // }
  const condition = {};
  if(sex === 0  && sex === 1){
    condition.sex = sex
  }
  if(name){
    condition.name = {
      [Op.like]: `%${name}%`
    }
  }
  const result = await Student.findAndCountAll({
      attributes: ['id', 'name', 'sex', 'birthday', 'age'],
      where:condition,
      offset: (page - 1) * limit,
      include: Class,
      limit: +limit
  })
  return {
    total: result.count,
    datas: JSON.parse(JSON.stringify(result.rows))
  }
}