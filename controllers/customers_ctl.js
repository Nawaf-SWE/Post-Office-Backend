const asyncHandler = require("../middlewares/asyncHandler");
const { tracking, packages, customers } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const calculatePackageCost = require("../utils/costCalculator");

let customer_ctl = {};

customer_ctl.login = asyncHandler(async (req, res, next) => {
    const data = await customers.findOne({ where: { email: req.body.email } });
    if (data) {
        const verified = await bcrypt.compare(req.body.password, data.password);
        if (verified) {
            const token = jwt.sign(
                {
                    id: data.id,
                    role: "client",
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: 1000 * 60 * 60 * 24,
                }
            );
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

customer_ctl.signup = asyncHandler(async (req, res, next) => {
    const salt = await bcrypt.genSalt(5);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    const data = await customers.create(req.body);
    const token = jwt.sign(
        {
            id: data.id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: 1000 * 60 * 60 * 24,
        }
    );
    res.json({
        success: true,
        data: data,
        token: token,
    });
});

// customer management
customer_ctl.getCustomer = asyncHandler(async (req, res, next) => {
    const data = await customers.findByPk(req.user.id);
    res.json({
        success: true,
        data: data,
    });
});

customer_ctl.updateCustomer = asyncHandler(async (req, res, next) => {
    const data = await customers.update(req.body, {
        where: { id: req.user.id },
    });
    res.json({
        success: true,
        data: data,
    });
});

// package management
customer_ctl.createPackage = asyncHandler(async (req, res, next) => {
    let id = "0000000000";
    req.body.sender_name = req.user.name;
    req.body.sender_phone = req.user.phone;
    const count = await packages.count({ where: {} });
    id =
        id.substring(0, 10 - (count + 1).toString().length) +
        (count + 1).toString();
    req.body.tracking_no = "SA" + id;

    req.body.cost = await calculatePackageCost(
        req.body.shipping_type,
        req.body.weight,
        req.body.package_category
    );

    const data = await packages.create(req.body);
    await tracking.create({
        package_id: data.id,
        user_id: process.env.DUMMY_USER_ID,
        delivery_status: "Initiated",
    });
    res.json({
        success: true,
        data: data,
    });
});

customer_ctl.getPackage = asyncHandler(async (req, res, next) => {
    let filter = {
        $or: [
            {
                sender_email: req.user.email,
            },
            {
                sender_phone: req.user.phone,
            },
            {
                receiver_email: req.user.email,
            },
            {
                receiver_phone: req.user.phone,
            },
        ],
    };
    const data = await packages.findAll({
        where: filter,
        limit: Number(req.query.limit),
        offset: Number(req.query.offset),
        order: [["createdAt", "desc"]],
    });
    const total = await packages.count({ where: filter });
    res.json({
        success: true,
        data: data,
        total,
    });
});

// trackings management
customer_ctl.getTracking = asyncHandler(async (req, res, next) => {
    let dummy = await packages.findOne({
        where: {
            tracking_no: req.params.tracking_no,
        },
    });
    if (!dummy) {
        return next(new ErrorResponse("Tracking not found error", 401));
    }
    dummy = dummy.dataValues.id;

    const data = await tracking.findAll({
        where: {
            package_id: dummy,
        },
    });
    const total = await tracking.count({ where: { package_id: dummy } });
    res.json({
        success: true,
        data: data,
        total,
    });
});

module.exports = customer_ctl;
