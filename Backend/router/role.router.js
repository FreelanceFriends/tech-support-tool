const roleController = require("../controller/role.controller");

const router = require("express").Router()

router.route("/")
       .get(roleController.getAllRoles)
       .post(roleController.createRole)

router.route("/:name")
        .get(roleController.getRole)
        .put(roleController.updateRole)
        .delete(roleController.deleteRole)

module.exports = router