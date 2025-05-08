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
exports.sessionController = exports.logoutController = exports.loginController = exports.registerController = void 0;
const User_1 = __importDefault(require("../models/User"));
const authService_1 = require("../services/authService");
const sessionService_1 = require("../services/sessionService");
const registerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const newUser = yield (0, authService_1.createUser)(username, password);
    if (!newUser) {
        return res.status(500).send("Error creating user");
    }
    req.session.user = newUser;
    res.cookie("qid", req.sessionID, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: "none",
        secure: true,
    });
    // send evything except password
    res.status(201).send({
        _id: newUser._id,
        username: newUser.username,
        rating: newUser.rating,
        wins: newUser.wins,
        losses: newUser.losses,
        friends: newUser.friends,
        friendRequests: newUser.friendRequests,
        created_at: newUser.createdAt,
        updated_at: newUser.updatedAt,
    });
});
exports.registerController = registerController;
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield (0, authService_1.authenticateUser)(username, password);
    if (!user) {
        return res.status(401).send("Wrong username or password");
    }
    req.session.user = user;
    res.cookie("qid", req.sessionID, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: "none",
        secure: true,
    });
    yield User_1.default.populate(user, "friends");
    yield User_1.default.populate(user, "friendRequests");
    res.status(200).send({
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
exports.loginController = loginController;
const logoutController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.session.user)
        return res.status(401).send("Not logged in");
    req.session.destroy((err) => {
        if (err)
            return res.status(500).send("Internal Server Error");
        (0, sessionService_1.destroySession)(req.cookies.qid);
        res.clearCookie("qid");
        res.status(200).send("Logged out");
    });
});
exports.logoutController = logoutController;
const sessionController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.session.user)
        return res.status(401).send("Not logged in");
    const user = yield (0, authService_1.getUser)(req.session.user.username);
    if (!user)
        return res.status(500).send("Internal Server Error");
    yield User_1.default.populate(user, "friends");
    yield User_1.default.populate(user, "friendRequests");
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
exports.sessionController = sessionController;
