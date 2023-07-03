const express = require("express");
const { login, signup, getCustomer, updateCustomer, createPackage, getPackage, getTracking} = require("../controllers/customers_ctl")
const { IsCustomer } = require("../middlewares/authenticated");

const router = express.Router();


router.route("/login")
    .post(login);

router.route("/signup")
    .post(signup);

router.route("/me")
    .get(IsCustomer, getCustomer)
    .post(IsCustomer, updateCustomer);

router.route("/packages")
    .get(IsCustomer, getPackage)
    .post(IsCustomer, createPackage);

router.route("/trackings/:id")
    .get(IsCustomer, getTracking);

module.exports = router;