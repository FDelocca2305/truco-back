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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTopRatingController = exports.addLossController = exports.addWinController = void 0;
const statsService_1 = require("../services/statsService");
const addWinController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.session.user)
        return res.status(401).send("Unauthorized");
    const updated = yield (0, statsService_1.addWinOrLossService)(req.session.user.username, true);
    if (!updated)
        return res.status(500).send("Internal server error");
    const { myRating, opponentRating } = req.body;
    if (!myRating || !opponentRating)
        return res.status(400).send("Bad request");
    const updatedRating = yield (0, statsService_1.updateRatingService)(req.session.user.username, true, myRating, opponentRating);
    if (!updatedRating)
        return res.status(500).send("Internal server error");
    return res.status(200).send({ updatedRating });
});
exports.addWinController = addWinController;
const addLossController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.session.user)
        return res.status(401).send("Unauthorized");
    const updated = yield (0, statsService_1.addWinOrLossService)(req.session.user.username, false);
    if (!updated)
        return res.status(500).send("Internal server error");
    const { myRating, opponentRating } = req.body;
    const updatedRating = yield (0, statsService_1.updateRatingService)(req.session.user.username, false, myRating, opponentRating);
    if (!updatedRating)
        return res.status(500).send("Internal server error");
    return res.status(200).send({ updatedRating });
});
exports.addLossController = addLossController;
const getTopRatingController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topUsers = yield (0, statsService_1.topRatingService)();
    return res.status(200).json(topUsers);
});
exports.getTopRatingController = getTopRatingController;
