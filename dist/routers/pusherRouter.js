"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pusherController_1 = __importDefault(require("../controllers/pusherController"));
const chAuthBodyValidation_1 = __importDefault(require("../middlewares/pusher/chAuthBodyValidation"));
const userAuthBodyValidation_1 = __importDefault(require("../middlewares/pusher/userAuthBodyValidation"));
const challengeBodyValidation_1 = __importDefault(require("../middlewares/pusher/challengeBodyValidation"));
const router = (0, express_1.Router)();
router.post("/channel", chAuthBodyValidation_1.default, pusherController_1.default.authorizeChannel.bind(pusherController_1.default));
router.post("/user", userAuthBodyValidation_1.default, pusherController_1.default.authenticateUser.bind(pusherController_1.default));
router.post("/challenge", challengeBodyValidation_1.default, pusherController_1.default.challengeFriend.bind(pusherController_1.default));
exports.default = router;
