const express = require("express");
const router = express.Router();


router.route("/login").post();
router.route("/signup").post();

router.route("/me").get().post();

router.route("/packages").get().post();

router.route("/trackings/:id").get();

module.exports = router;