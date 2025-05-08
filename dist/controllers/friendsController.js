"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.acceptFriendRequestController = exports.sendFriendRequestController = void 0;
const friendsService_1 = require("../services/friendsService");
const authService_1 = require("../services/authService");
const User_1 = __importDefault(require("../models/User"));
const pusherController_1 = __importDefault(require("./pusherController"));
const sendFriendRequestController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { targetUsername } = req.params;
    if (!req.session.user)
        return res.status(401).send("Not logged in");
    if (!targetUsername)
        return res.status(400).send("No target username");
    if (targetUsername === req.session.user.username)
        return res.status(400).send("Cannot add yourself");
    const added = yield (0, friendsService_1.sendFriendRequestService)(req.session.user.username, targetUsername);
    if (!added)
        return res.status(400).send("Could not add friend");
    return res.status(200).send("Friend request sent");
});
exports.sendFriendRequestController = sendFriendRequestController;
const acceptFriendRequestController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { targetUsername } = req.params;
    if (!req.session.user)
        return res.status(401).send("Not logged in");
    if (!targetUsername)
        return res.status(400).send("No target username");
    const added = yield (0, friendsService_1.acceptFriendRequestService)(req.session.user.username, targetUsername);
    if (!added)
        return res.status(400).send("Could not add friend");
    const user = yield (0, authService_1.getUser)(req.session.user.username);
    if (!user)
        return res.status(500).send("Internal server error");
    yield User_1.default.populate(user, "friends");
    yield User_1.default.populate(user, "friendRequests");
    pusherController_1.default.acceptFriendRequest(targetUsername, req.session.user.username);
    return res.status(200).send({
        _id: user._id,
        username: user.username,
        rating: user.rating,
        wins: user.wins,
        losses: user.losses,
        friends: user.friends,
        friendRequests: user.friendRequests,
        created_at: user.createdAt,
        updated_at: user.updatedAt,
    });
});
exports.acceptFriendRequestController = acceptFriendRequestController;
