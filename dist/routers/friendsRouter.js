"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const friendsController_1 = require("../controllers/friendsController");
const router = (0, express_1.Router)();
router.get("/friendRequest/:targetUsername", friendsController_1.sendFriendRequestController);
router.get("/acceptFriendRequest/:targetUsername", friendsController_1.acceptFriendRequestController);
exports.default = router;
