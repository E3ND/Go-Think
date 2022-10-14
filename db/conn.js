const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('gothink', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
})

//  try {
//     sequelize.authenticate()
//     console.log('Conectado com sucesso!')
// } catch(err) {
//     console.log(`Erro ao conectar no banco -> ${err}`)
// }

module.exports = sequelize