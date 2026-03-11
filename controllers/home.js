module.exports = {
    getIndex: (req, res) => {
        //console.log(req)
        //console.log(req.body)
        res.render('index.ejs')
    }
}