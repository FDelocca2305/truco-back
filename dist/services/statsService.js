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
exports.topRatingService = exports.updateRatingService = exports.addWinOrLossService = void 0;
const User_1 = __importDefault(require("../models/User"));
const addWinOrLossService = (username, win) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ username });
    if (!user)
        return false;
    if (win) {
        user.wins += 1;
    }
    else {
        user.losses += 1;
    }
    try {
        yield user.save();
    }
    catch (err) {
        console.log(err);
        return false;
    }
    return true;
});
exports.addWinOrLossService = addWinOrLossService;
const updateRatingService = (username, iWon, myRating, opponentRating) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ username });
    if (!user)
        return false;
    const gainedPoints = Math.min(Math.round(30 / ((2 * myRating) / opponentRating)), 30);
    if (iWon) {
        user.rating += gainedPoints;
    }
    else {
        user.rating -= gainedPoints;
    }
    if (user.rating <= 0) {
        user.rating = 1;
    }
    try {
        yield user.save();
    }
    catch (err) {
        console.log(err);
        return false;
    }
    return user.rating;
});
exports.updateRatingService = updateRatingService;
const topRatingService = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_1.default.find({}).sort({ rating: -1 }).limit(20);
    return users;
});
exports.topRatingService = topRatingService;
