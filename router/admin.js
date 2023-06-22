const express = require("express");
const { login, createUser } = require("../controllers/admin_ctl");
const { IsAdmin } = require("../middlewares/authenticated");
const router = express.Router();


router.route("/login").post(login);

router.route("/me").get().post();

router.route("/cities").get().post();
router.route("/cities/:id").put();

router.route("/branches").get().post();
router.route("/branches/:id").put();

router.route("/users").get().post(IsAdmin,createUser);
router.route("/users/:id").put();

router.route("/trackings").get().post();

router.route("/packages").get().post();



module.exports = router;