// middleware de proteção de rota, sem estar logado e autenticado não entra
module.exports.checkAuth = function(req, res, next) {
    const userId = req.session.userid

    if(!userId) {
        res.redirect('/login')
    }
    next()
}