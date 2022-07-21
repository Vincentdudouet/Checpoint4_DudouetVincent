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

  ImagesController.uploadProject,
  ProjectsController.edit
);
router.post(
  "/",

  ImagesController.uploadProject,
  ProjectsController.add
);
router.delete("/:id", ProjectsController.delete);

module.exports = router;
