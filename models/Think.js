const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const User = require('./User')

// User
const Think = db.define('Think', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },

    image: {
        type: DataTypes.STRING,
        allowNull: true,
        require: false
    }
})

// Um pensamento pertece a um usuario
Think.belongsTo(User)
// Um usuario pode ter varios pensamentos
User.hasMany(Think)

module.exports = Think