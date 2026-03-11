module.exports = {
    ensureAuth: function(req, res, next) {
        if (req.isAuthenticated() || (req.session && req.session.isGuest)){
            return next()
        } else{
            res.status(401).json({ 
                success: false, 
                message: "Not logged in" 
            });
        }
    }
}