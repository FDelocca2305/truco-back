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
exports.getUser = exports.authenticateUser = exports.createUser = void 0;
const hashing_1 = require("../utils/hashing");
const User_1 = __importDefault(require("../models/User"));
const createUser = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = (0, hashing_1.hashPassword)(password);
    const newUser = new User_1.default({ username, password: hashedPassword });
    try {
        yield newUser.save();
        return newUser;
    }
    catch (err) {
        console.log(err);
        return null;
    }
});
exports.createUser = createUser;
const authenticateUser = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ username });
    if (!user)
        return null;
    if (!(0, hashing_1.comparePassword)(password, user.password))
        return null;
    return user;
});
exports.authenticateUser = authenticateUser;
const getUser = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ username });
    return user;
});
exports.getUser = getUser;
