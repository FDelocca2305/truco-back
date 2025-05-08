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
const Errors_1 = require("../../utils/Errors");
const challengeBodyValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = [];
    const opponentName = req.body.opponentName;
    if (!opponentName) {
        errors.push((0, Errors_1.missingParam)("opponentName"));
    }
    else if (typeof opponentName !== "string") {
        errors.push((0, Errors_1.invalidParamType)("opponentName", "string", typeof opponentName));
    }
    const challengerName = req.body.challengerName;
    if (!challengerName) {
        errors.push((0, Errors_1.missingParam)("challengerName"));
    }
    else if (typeof challengerName !== "string") {
        errors.push((0, Errors_1.invalidParamType)("challengerName", "string", typeof challengerName));
    }
    const challengerRating = req.body.challengerRating;
    if (!challengerRating) {
        errors.push((0, Errors_1.missingParam)("challengerRating"));
    }
    else if (typeof challengerRating !== "number") {
        errors.push((0, Errors_1.invalidParamType)("challengerRating", "number", typeof challengerRating));
    }
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    next();
});
exports.default = challengeBodyValidation;
