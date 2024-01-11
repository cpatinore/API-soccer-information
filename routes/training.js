const { Router } = require("express");
const router = Router();
const { addTraining } = require("../controller/training");

router.post("/", addTraining);

module.exports = router;
