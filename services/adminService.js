// 管理员初始化
// 判断数据库中是否有管理员,如果没有,自动添加一个默认管理员
const Admin = require('../models/Admin')
exports.addAdmin = async function(adminObj){
    // 判断adminObj的各种属性是否合理，以及账号是否已存在
    const ins = await Admin.create(adminObj);
    return ins.toJSON()
}
exports.deleteAdmin = async function(adminId){
    // 方式1
    // // 1.得到实例
    // const ins = await Admin.findByPk(adminId);
    // // console.log(ins)
    // // 2.删除实例
    // await ins.destroy()

    // 方式2 
    Admin.destroy({
        where: {
            id: adminId
        }
    })

}
exports.updateAdmin = async function(id, adminObj){
    // 方式1
    // 得到实例
    // const ins = await Admin.findByPk(id);
    // ins.loginId = adminObj.loginId;
    // ins.save();

    // 方式2
    const res = await Admin.update(adminObj,{
        where: {
            id,
        }
    })
    console.log(res)
}
exports.login = async function(loginId, loginPwd){
    const result = await Admin.findOne({
        where:{
            loginId,
            loginPwd
        }
    })
    if(result && result.loginId === loginId && result.loginPwd === loginPwd){
        return result.toJSON();
    }
    return null;
}
exports.getAdminById = async function(id){
    const result = await Admin.findByPk(id);
    if(result){
        return result.toJSON();
    }
}
