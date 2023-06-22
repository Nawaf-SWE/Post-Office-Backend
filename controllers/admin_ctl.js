const asyncHandler = require("../middlewares/asyncHandler");
const { users } = require("../models")
const bceypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse")

let admins = {};

admins.login = asyncHandler(async (req, res, next) => {
    const data = await users.findOne({ where: { email: req.body.email } });
    if (data) {
        const verified = await bceypt.compare(req.body.password, data.password);
        if (verified) {
            const token = jwt.sign({
                id: data.id,
                role: data.role,
            },process.env.JWT_SECRET,{
                expiresIn: 1000 * 60 * 60 * 24,
            });
            res.json({
                success: true,
                token: token,
            });
        } else {
            return next(new ErrorResponse("wrong credintials", 400));
        }
    } else {
        return next(new ErrorResponse("user not found", 400));
    }
});

admins.createUser = asyncHandler(async (req, res, next) => {
    console.log(req.user);
    const salt = await bceypt.genSalt(5);
    req.body.password = await bceypt.hash(req.body.password, salt);
    const data = await users.create(req.body);
    res.json({
        success: true,
        token: data,
    });
});

module.exports = admins;