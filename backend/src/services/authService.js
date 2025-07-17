const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.registerUser = async (username, password) => {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();

    return { message: 'User registered successfully', userId: user._id };
};

exports.loginUser = async (username, password) => {
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    return { message: 'Login successful', userId: user._id, username: user.username };
};

