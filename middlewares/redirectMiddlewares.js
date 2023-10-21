module.exports = (req, res, next)  => {
    if(req.url === '/produtos'){
        return res.redirect(301, '/products')
    }
    next();
}