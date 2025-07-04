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
exports.populateSession = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../models/User"));
const populateSession = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const qid = req.cookies.qid;
    if (!qid)
        return next();
    const session = yield mongoose_1.default.connection.db
        .collection("sessions")
        .findOne({ _id: qid });
    if (!session) {
        res.clearCookie("qid");
        return next();
    }
    ;
    const sessionInfo = JSON.parse(session.session);
    const user = yield User_1.default.findOne({ username: sessionInfo.user.username });
    if (!user)
        return next();
    req.session.user = user;
    next();
});
exports.populateSession = populateSession;
