const { Router } = require("express");
const router = Router();
const { getMainTeam, addTraining } = require("../controller/training");

router.get("/:week", getMainTeam);
router.post("/", addTraining);

module.exports = router;
