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
exports.loginValidation = exports.registerValidation = void 0;
const authService_1 = require("../services/authService");
const userRegex = /^[a-zA-Z0-9]+$/; // only letters and numbers
const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()-_+=<>?]{8,}$/; // at least 8 characters, only letters, numbers and !@#$%^&*()-_+=<>?
const registerValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // if (req.session.user) return res.status(401).send("User already logged in");
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send('Missing username or password');
    }
    if (!userRegex.test(username) || !passwordRegex.test(password)) {
        return res.status(400).send('Invalid username or password');
    }
    const existingUser = yield (0, authService_1.getUser)(username);
    if (existingUser) {
        return res.status(400).send('Username already exists');
    }
    next();
});
exports.registerValidation = registerValidation;
const loginValidation = (req, res, next) => {
    // if (req.session.user) return res.status(401).send("User already logged in");
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send('Missing username or password');
    }
    if (!userRegex.test(username) || !passwordRegex.test(password)) {
        return res.status(400).send('Invalid username or password');
    }
    next();
};
exports.loginValidation = loginValidation;
