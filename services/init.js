const validate = require('validate.js');
const moment = require('moment')

validate.extend(validate.validators.datetime, {
    /**
     * 该函数会自动用于日期转换格式
     * 会在验证的自动触发，它会将任何数据转换为时间戳返回
     * 如何无法转换，返回NaN
     * @param {*} value 要传入的值
     * @param {*} options 针对某个属性的验证配置
     */
    parse(value, options) {
        let format = ['YYYY-MM-DD HH:mm:ss', 'YYYY-M-D H:m:s', 'x'];
        if (options.dateOnly) {
            format = ['YYYY-MM-DD', 'YYYY-M-D', 'x'];
        }
        return +moment.utc(value, format, true)
    },
    /**
     * 用于显示错误消息
     * @param {*} value 
     * @param {*} options 
     */
    format(value, options) {
        let format = 'YYYY-MM-DD';
        if(!options.dateOnly){
            format += ' HH:mm:ss'
        }
        return moment.utc(value).format(format)
    }
})