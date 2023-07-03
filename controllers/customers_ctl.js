const asyncHandler = require("../middlewares/asyncHandler");
const { tracking, packages, customers } = require("../models")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");

let customer_ctl = {}

customer_ctl.login = asyncHandler(async (req, res, next) => {
    const data = await customers.findOne({ where: { email: req.body.email } });
    if (data) {
        const verified = await bcrypt.compare(req.body.password, data.password);
        if (verified) {
            const token = jwt.sign({
                id: data.id
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

customer_ctl.signup = asyncHandler(async (req, res, next) => {
    const salt = await bcrypt.genSalt(5);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    const data = await customers.create(req.body);
    const token = jwt.sign({
        id: data.id
    },process.env.JWT_SECRET,{
        expiresIn: 1000 * 60 * 60 * 24,
    });
    res.json({
        success: true,
        data: data,
        token: token,
    });
});


// customer management
customer_ctl.getCustomer = asyncHandler(async (req, res, next) =>  {
    const data = await customers.findByPk(req.user.id)
    res.json({
        success: true,
        data: data,
    })
});

customer_ctl.updateCustomer = asyncHandler(async (req, res, next) => {
    const data = await customers.update(req.body, {where: {id: req.user.id}})
    res.json({
        success: true,
        data: data,
    })
});


// package management
customer_ctl.createPackage = asyncHandler(async (req, res, next) => {
    const data = await packages.create(req.body)
    res.json({
        success: true,
        data: data,
    })
});

customer_ctl.getPackage = asyncHandler(async (req, res, next) => {
    const data = packages.findAll({where: {
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
            }
        ]
    },
    limit: Number(req.query.limit),
    offset: Number(req.query.offset),
    order: [["createdAt","desc"]]
    })
    res.json({
        success: true,
        data: data,
    })
})

// trackings management
customer_ctl.getTracking = asyncHandler(async (req, res, next) => {
    const data = tracking.findAll({
        include: [
            {
                model: packages,
                where: {
                    $or: [
                        {
                            sender_email: req.user.email
                        },
                        {
                            sender_phone: req.user.phone
                        },
                        {
                            receiver_email: req.user.email
                        },
                        {
                            receiver_phone: req.user.phone
                        }
                    ]
                }
            }
        ],
        limit: Number(req.query.limit),
        offset: Number(req.query.offset),
        order: [["createdAt","desc"]]
    })
    res.json({
        success: true,
        data: data,
    })
})


module.exports = customer_ctl;