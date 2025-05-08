"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pusher_1 = __importDefault(require("pusher"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class PusherController {
    constructor() {
        this.pusher = new pusher_1.default({
            appId: process.env.PUSHER_APP_ID,
            key: process.env.PUSHER_KEY,
            secret: process.env.PUSHER_SECRET,
            cluster: process.env.PUSHER_CLUSTER,
            useTLS: true
        });
    }
    authorizeChannel(req, res) {
        const socketId = req.body.socket_id;
        const channel = req.body.channel_name;
        const user = JSON.parse(req.body.user);
        // This authenticates every user. Don't do this in production!
        const authResponse = this.pusher.authorizeChannel(socketId, channel, user);
        res.json(authResponse);
    }
    authenticateUser(req, res) {
        const socketId = req.body.socket_id;
        const user = JSON.parse(req.body.user);
        // This authenticates every user. Don't do this in production!
        const authResponse = this.pusher.authenticateUser(socketId, user);
        res.send(authResponse);
    }
    challengeFriend(req, res) {
        const challengerName = req.body.challengerName;
        const challengerRating = req.body.challengerRating;
        this.pusher.sendToUser(req.body.opponentName, "game-challenge", { challengerName, challengerRating });
        res.sendStatus(200);
    }
    sendFriendRequest(targetUsername, friendUser) {
        this.pusher.sendToUser(targetUsername, "friend-request", friendUser);
    }
    acceptFriendRequest(acceptedUsername, username) {
        this.pusher.sendToUser(acceptedUsername, "friend-request-accepted", username);
    }
}
exports.default = new PusherController();
