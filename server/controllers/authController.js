const User = require('../model/User');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    console.log(user, pwd);
    if (!user || !pwd)
        return res
            .status(400)
            .json({ message: 'Username & Password are required' });

    const foundUser = await User.findOne({ username: user }).exec();

    if (!foundUser) return res.sendStatus(401); //unauthorized
    // evaluate password
    const match = await bcrypt.compare(pwd, foundUser.password);

    if (match) {
        // create JWT (Access + Refresh)
        const accessToken = jwt.sign(
            {
                UserInfo: {
                    username: foundUser.username,
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        );
        const refreshToken = jwt.sign(
            { username: foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        //save refresh token with current user in DB
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(result);

        // send refreshToken as httpOnly cookie which is more secure as not accessible by the javascript
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            // secure: true,
            sameSite: 'None',
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.json({ accessToken });
    } else {
        res.sendStatus(401);
    }
};

module.exports = { handleLogin };
