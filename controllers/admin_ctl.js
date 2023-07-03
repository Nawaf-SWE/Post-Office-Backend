const asyncHandler = require("../middlewares/asyncHandler");
const { users, cities, branches, tracking, packages } = require("../models")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse")

let admins = {};

admins.login = asyncHandler(async (req, res, next) => {
    const data = await users.findOne({ where: { email: req.body.email } });
    if (data) {
        const verified = await bcrypt.compare(req.body.password, data.password);
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
    const salt = await bcrypt.genSalt(5);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    const data = await users.create(req.body);
    res.json({
        success: true,
        token: data,
    });
});


// admin data management
admins.getAdmin = asyncHandler(async (req, res, next) => {
    const data = await users.findByPk(req.user.id)
    res.json({
        success: true,
        data: data,
    })
})

admins.updateAdmin = asyncHandler(async (req, res, next) => {
    const data = await users.update(req.body, {where: {id: req.user.id}})
    res.json({
        success: true,
        data: data,
    })
})


// City management
admins.getCities = asyncHandler(async (req, res, next) => {
    const data = await cities.findAll()
    res.json({
        success: true,
        data: data,
    })
})

admins.createCity = asyncHandler(async (req, res, next) => {
    const data = await cities.create(req.body)
    res.json({
        success: true,
        data: data,
    })
})

admins.updateCity = asyncHandler(async (req, res, next) => {
    copiedObject = JSON.parse(JSON.stringify(req.body));
    delete copiedObject.id
    const data = await cities.update(copiedObject, {where : {id: req.params.id}})
    res.json({
        success: true,
        data: data,
    })
})


//  Branch management
admins.getBranches = asyncHandler(async (req, res, next) => {
    const data = await branches.findAll()
    res.json({
        success: true,
        data: data,
    })
})

admins.createBranch = asyncHandler(async (req, res, next) => {
    const data = await branches.create(req.body)
    res.json({
        success: true,
        data: data,
    })
})

admins.updateBranch = asyncHandler(async (req, res, next) => {
    copiedObject = JSON.parse(JSON.stringify(req.body));
    delete copiedObject.id
    const data = await branches.update(copiedObject, {where : {id: req.params.id}})
    res.json({
        success: true,
        data: data,
    })
})


// User management
admins.getUsers = asyncHandler(async (req, res, next) => {
    const data = await users.findAll()
    res.json({
        success: true,
        data: data,
    })
})

admins.createUser = asyncHandler(async (req, res, next) => {
    const data = await users.create(req.body)
    res.json({
        success: true,
        data: data,
    })
})

admins.updateUser = asyncHandler(async (req, res, next) => {
    copiedObject = JSON.parse(JSON.stringify(req.body));
    delete copiedObject.id
    const data = await branches.update(copiedObject, {where : {id: req.params.id}})
    res.json({
        success: true,
        data: data,
    })
})


// Tracking management
admins.getTrackings = asyncHandler(async (req, res, next) => {
    const data = await tracking.findAll()
    res.json({
        success: true,
        data: data,
    })
})

admins.createTracking = asyncHandler(async (req, res, next) => {
    const data = await tracking.create(req.body)
    res.json({
        success: true,
        data: data,
    })
})


// Package management
admins.getPackage = asyncHandler(async (req, res, next) => {
    const data = await packages.findAll()
    res.json({
        success: true,
        data: data,
    })
})

admins.createPackage = asyncHandler(async (req, res, next) => {
    const data = await packages.create(req.body)
    res.json({
        success: true,
        data: data,
    })
})


module.exports = admins;