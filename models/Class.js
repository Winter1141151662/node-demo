const sequelize = require('./db');
const Student = require('./Student')
const {
    DataTypes
} = require('sequelize');
const Class = sequelize.define(
    "Class", {
        className: {
            type: DataTypes.STRING,
            allowNull: false
        },
        openDate: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        createdAt: false,
        updatedAt: false,
        paranoid: true
    }

)

module.exports = Class;