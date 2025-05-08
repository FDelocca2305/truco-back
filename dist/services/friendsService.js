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
exports.acceptFriendRequestService = exports.sendFriendRequestService = void 0;
const User_1 = __importDefault(require("../models/User"));
const pusherController_1 = __importDefault(require("../controllers/pusherController"));
const sendFriendRequestService = (username, targetUsername) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ username });
    if (!user)
        return false;
    const targetUser = yield User_1.default.findOne({ username: targetUsername });
    if (!targetUser)
        return false;
    const alreadyFriends = user.friends.includes(targetUser._id);
    if (alreadyFriends)
        return false;
    const alreadyRequested = user.friendRequests.includes(targetUser._id);
    if (alreadyRequested)
        return false;
    const alreadyReceived = targetUser.friendRequests.includes(user._id);
    if (alreadyReceived)
        return false;
    targetUser.friendRequests.push(user._id);
    try {
        yield targetUser.save();
        pusherController_1.default.sendFriendRequest(targetUsername, user);
    }
    catch (err) {
        console.log(err);
        return false;
    }
    return true;
});
exports.sendFriendRequestService = sendFriendRequestService;
const acceptFriendRequestService = (username, targetUsername) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ username });
    const targetUser = yield User_1.default.findOne({ username: targetUsername });
    if (!user || !targetUser)
        return false;
    const alreadyFriends = user.friends.includes(targetUser._id);
    if (alreadyFriends)
        return false;
    const wasRequested = user.friendRequests.includes(targetUser._id);
    if (!wasRequested)
        return false;
    user.friends.push(targetUser._id);
    targetUser.friends.push(user._id);
    const index = user.friendRequests.indexOf(targetUser._id);
    user.friendRequests.splice(index, 1);
    try {
        yield user.save();
        yield targetUser.save();
    }
    catch (err) {
        console.log(err);
        return false;
    }
    return true;
});
exports.acceptFriendRequestService = acceptFriendRequestService;
