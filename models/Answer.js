const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const Think = require('./Think')
const User = require('./User')

const Answer = db.define('Answer', {
    answerText: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },

    edit: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        require: true
    },

    answerImage: {
        type: DataTypes.STRING,
        allowNull: true,
        require: false,
    }
})

// Uma resposta pertece a um pensamento
Answer.belongsTo(Think)
// Um pensamento pode ter varias respostas
Think.hasMany(Answer)

// Uma resposta pertece a um usuario
Answer.belongsTo(User)
// Um usuario pode ter varias respostas
User.hasMany(Answer)

module.exports = Answer