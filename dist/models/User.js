"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    username: {
        type: mongoose_1.default.Schema.Types.String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: mongoose_1.default.Schema.Types.String,
        required: true,
        trim: true,
    },
    rating: {
        type: mongoose_1.default.Schema.Types.Number,
        required: true,
        default: 400,
    },
    wins: {
        type: mongoose_1.default.Schema.Types.Number,
        required: true,
        default: 0,
    },
    losses: {
        type: mongoose_1.default.Schema.Types.Number,
        required: true,
        default: 0,
    },
    friends: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
        ref: "User",
        required: true,
        default: [],
    },
    friendRequests: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
        ref: "User",
        required: true,
        default: [],
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("User", UserSchema);
