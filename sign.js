const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => res.render('signup')); // Renders Signup Page

// Signup Route
router.post('/', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already exists.', redirectUrl: '/login' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });

        await newUser.save();
        res.json({ success: true, message: 'Signup successful! Redirecting...', redirectUrl: '/admin' });

    } catch (error) {
        console.error('Error saving user:', error.message);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
});

module.exports = router;
