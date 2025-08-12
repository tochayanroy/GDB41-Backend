const express = require('express');
const router = express.Router();

const User = require('../modules/userSchema')



router.post('/register', async (req, res) => {
    try {
        const { userName, phoneNumber, email, password } = req.body;

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "User already exist" })
        }

        user = new User({
            userName,
            phoneNumber,
            email,
            password
        })

        await user.save();
        res.status(200).json({ message: "Account created Successfully" })
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

        if (user.password != password) {
            return res.status(400).json({ message: "User not exist" })
        }

        res.status(200).json({ message: "Login Successfully" })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" })
    }
})





router.get('/profile', async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not exist" })
        }

        if (user.password != password) {
            return res.status(400).json({ message: "User not exist" })
        }

        res.status(200).json({ user })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" })
    }
})





module.exports = router