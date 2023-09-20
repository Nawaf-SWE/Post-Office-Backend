const express = require("express");
const {
    login,
    getAdmin,
    updateAdmin,
    getCities,
    createCity,
    updateCity,
    getBranches,
    createBranch,
    updateBranch,
    getUsers,
    createUser,
    updateUser,
    getTrackings,
    createTracking,
    getPackages,
    createPackage,
    getFees,
    updateFee,
    getBranchesByCity,
} = require("../controllers/admin_ctl");
const { IsAdmin, IsUser } = require("../middlewares/authenticated");
const router = express.Router();

router.route("/login").post(login);

router.route("/me").get(IsAdmin, getAdmin).post(IsAdmin, updateAdmin);

router.route("/cities").get(getCities).post(IsAdmin, createCity);

router.route("/cities/:id").put(IsAdmin, updateCity);

router.route("/branches").get(getBranches).post(IsAdmin, createBranch);
router
    .route("/branches/:id")
    .get(IsAdmin, getBranchesByCity)
    .put(IsAdmin, updateBranch);

router.route("/users").get(IsUser, getUsers).post(IsAdmin, createUser);
router.route("/users/:id").put(IsAdmin, updateUser);

router
    .route("/trackings")
    .get(IsUser, getTrackings)
    .post(IsUser, createTracking);

router.route("/packages").get(IsUser, getPackages).post(IsUser, createPackage);

router.route("/fees").get(getFees);

router.route("/fees/:id").put(IsAdmin, updateFee);

module.exports = router;
