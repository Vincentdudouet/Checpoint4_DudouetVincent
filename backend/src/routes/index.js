const express = require("express");

const usersRoutes = require("./users.routes");
const projectsRoutes = require("./projects.routes");

const router = express.Router();

router.use("/users", usersRoutes);
router.use("/projects", projectsRoutes);

module.exports = router;
