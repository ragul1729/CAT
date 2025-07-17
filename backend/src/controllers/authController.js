const authService = require('../services/authService');

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        await authService.registerUser(username, password);
        res.status(201).send('User registered successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const success = await authService.loginUser(username, password);
        if (success) {
            res.send('Login successful');
        } else {
            res.status(400).send('Invalid credentials');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
};
