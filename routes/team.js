const { Router } = require("express");
const router = Router();
const { getMainTeam } = require("../controller/team");

router.get("/:week/:players", getMainTeam);

module.exports = router;
