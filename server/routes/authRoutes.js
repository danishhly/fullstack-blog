const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//register
router.post('/register', async (req, res) => {
    try {
        const {username, email, password } = req.body;
        //validation
        if(!username || !email || !password) return res.status(400).json({ message: "All fields are required"});

        const salt = await bcrypt.getSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User registered "});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Login

router.post('/login', async (req, res) => {
    try {
        const {email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user) return res.status(400).json({message: "Invalid credentials"});

        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWt_SECRET, { expiresIn: '2d'});
        res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
    }
});