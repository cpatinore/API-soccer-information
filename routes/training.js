const { Router } = require("express");
const router = Router();
const { getMainTeam } = require("../controller/training");

router.get("/", getMainTeam);

module.exports = router;
