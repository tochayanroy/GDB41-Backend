const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../modules/userSchema')
const jwt = require('jsonwebtoken')
const passport = require('passport')



router.post('/register', async (req, res) => {
    try {
        const { userName, phoneNumber, email, password } = req.body;

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "User already exist" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)

        user = new User({
            userName,
            phoneNumber,
            email,
            password: hashPassword
        })

        await user.save();


        const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN_SECRET_KEY)


        res.status(200).json({ message: "Account created Successfully", token })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" })
    }
})





router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ message: "User not exist" })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN_SECRET_KEY)

        res.status(200).json({ message: "Login Successfully", token })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" })
    }
})





router.get('/profile', passport.authenticate('jwt', {session:false}), async (req, res) => {
    try {

        const user = await User.findById(req.user.id).select('-password')

        res.status(200).json({ user })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" })
    }
})





module.exports = router