"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const statsController_1 = require("../controllers/statsController");
const router = (0, express_1.Router)();
router.put('/addWin', statsController_1.addWinController);
router.put('/addLoss', statsController_1.addLossController);
router.get('/top', statsController_1.getTopRatingController);
exports.default = router;
