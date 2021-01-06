// 同步所有模型
require('./Admin');
require('./Class');
require('./Book');
require('./Student');
const sequelize = require('./db');
sequelize.sync({alter: true}).then(res => {
    console.log('所有模型同步完成')
})