const passport = require('passport')
const validator = require('validator')
const User = require('../models/User')

module.exports = {
    guestLogin: (req, res) => {
        req.session.isGuest = true

        req.session.guestId = "654321_demo_id"

        res.status(200).json({
            success: true,
            message: "Guest Mode active"
        })
    },

    getLogin: (req, res) => {
        if (req.user){
            res.status
        }
    },

    postLogin: (req, res, next) => {
        const validationErrors = []
        if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
        if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' })

        if (validationErrors.length) {
            return res.status(400).json({ errors: validationErrors });
        }

        req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false })

        passport.authenticate('local', (err, user, info) => {
        if (err) { return next(err) }
        if (!user) {
            return res.status(401).json({ errors: [info] });
        }
        req.logIn(user, (err) => {
            if (err) { return next(err) }
            res.json({ success: true, message: 'Success! You are logged in.' });
        })
        })(req, res, next)
    },

    logout: (req, res) => {
        req.logout((err) => {
            if (err) { 
                return next(err); 
            }
            if (req.session) {
                req.session.destroy((err) => {
                    if (err) {
                        console.log("Error: Failed to destroy the session during logout.", err);
                    }
                    res.clearCookie('connect.sid'); 
                    return res.status(200).json({ success: true, message: "Logged out" });
                });
            } else {
                return res.status(200).json({ success: true });
            }
        })
    },
    postSignup: async (req, res, next) => {
        try {
            //console.log(req.headers)
            //console.log(req.body)

            const validationErrors = []
            if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' })
            if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' })
            if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' })

            if (validationErrors.length) {
            return res.status(400).json({ errors: validationErrors });
            }

            req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false });   

            const existingUser = await User.findOne({
                $or: [{ email: req.body.email }]
            });

            if (existingUser) {
                return res.status(409).json({ errors: [{ msg: 'Account already exists.' }] });
            }
            const user = new User({
                email: req.body.email,
                password: req.body.password
            });

            await user.save(); 

            req.logIn(user, (err) => {
                if (err) return next(err);
                res.status(201).json({ success: true, message: 'User created' });
            })
        } catch (err) {
            console.log("Signup failer: ", err)
            next(err)
        }
    }
    
}