const express = require("express");

const { UsersController, ImagesController } = require("../controllers");

const router = express.Router();

router.get("/", UsersController.browse);
router.post("/login", UsersController.login);
router.get("/logout", UsersController.logout);
router.get("/:id", UsersController.read);
router.put("/:id", ImagesController.uploadUser, UsersController.edit);

module.exports = router;
