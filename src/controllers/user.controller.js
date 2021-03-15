const {User} = require('../models/');
const jwt = require('jsonwebtoken');

module.exports = {
    async login({body: {username, password}}, res) {
        if (await User.find(current => current.username === username && current.password === password)) {
            const token = await jwt.sign(
                {username},
                process.env.ACCESS_TOKEN,
                {
                    expiresIn: `20m`,
                }
                );
            res.status(200).json(token);
        } else {
            res.status(404).send(`User not found`);
        }
    },
    async register({body: {username, password}}, res) {
        if (!(await User.find(current => current.username === username))) {
            await User.push({username, password})
            return module.exports.login({body: {username,password}}, res);
        } else {
            res.sendStatus(400)
        }
    },
    async authenticateJWT(req, res, next) {
        const token = req.headers.authorization;
        if (token) {
            await jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
                if (err) {
                    return res.sendStatus(403);
                }
                req.user = user;
                next();
            });
        } else {
            res.sendStatus(401);
        }
    }
}