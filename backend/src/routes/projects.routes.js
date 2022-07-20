const express = require("express");

const {
  ProjectsController,
  ImagesController,
  UsersController,
} = require("../controllers");

const router = express.Router();

router.get("/", ProjectsController.browse);
router.get("/:id", ProjectsController.read);
router.put(
  "/:id",
  UsersController.login,
  ImagesController.uploadProject,
  ProjectsController.edit
);
router.post(
  "/",
  UsersController.login,
  ImagesController.uploadProject,
  ProjectsController.add
);
router.delete("/:id", UsersController.login, ProjectsController.delete);

module.exports = router;
