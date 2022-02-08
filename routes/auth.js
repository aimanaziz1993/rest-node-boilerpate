const router = require("express").Router();
const User = require('../models/User');
const bcrypt = require("bcrypt");
const { exists } = require("../models/User");

// register user
router.post('/register', async (req, res) => {
    
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        const user = await newUser.save();
        
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json(error);
    }
});

// login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(404).send("user not found");

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).json("invalid credentials");

        return res.status(200).json(user);

    } catch (error) {
        return res.status(500).json(error);
    }
})

module.exports = router;