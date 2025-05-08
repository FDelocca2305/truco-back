"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requestLogger = (req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    res.on("finish", () => {
        console.log(`STATUS ${res.statusCode}`);
    });
    next();
};
exports.default = requestLogger;
