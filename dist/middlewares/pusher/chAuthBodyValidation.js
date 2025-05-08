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
const chAuthBodyValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = [];
    const socketId = req.body.socket_id;
    if (!socketId) {
        errors.push((0, Errors_1.missingParam)("socket_id"));
    }
    else if (typeof socketId !== "string") {
        errors.push((0, Errors_1.invalidParamType)("socket_id", "string", typeof socketId));
    }
    const channel = req.body.channel_name;
    if (!channel) {
        errors.push((0, Errors_1.missingParam)("channel_name"));
    }
    else if (typeof channel !== "string") {
        errors.push((0, Errors_1.invalidParamType)("channel_name", "string", typeof channel));
    }
    const user = req.body.user;
    if (!user) {
        errors.push((0, Errors_1.missingParam)("user"));
    }
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }
    next();
});
exports.default = chAuthBodyValidation;
