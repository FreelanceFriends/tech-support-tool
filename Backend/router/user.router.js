const userController = require("../controller/user.controller");
const { checkAuth } = require("../middleware/check-auth.middleware");
const router = require("express").Router()

router.route("/")
       .get(checkAuth,userController.getAllUsers)
       .post(userController.createUser)

router.route("/login")
       .post(userController.loginUser)

router.route("/technicians")
       .get(checkAuth, userController.getTechnicians)

router.route("/:id")
        .get(checkAuth, userController.getUser)
        .put(checkAuth, userController.updateUser)
        .delete(checkAuth, userController.deleteUser)

module.exports = router