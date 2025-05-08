"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidParamType = exports.missingParam = void 0;
const missingParam = (param) => `Missing parameter: "${param}"`;
exports.missingParam = missingParam;
const invalidParamType = (param, expected, received) => `Invalid parameter type: "${param}". Expected "${expected}", received "${received}"`;
exports.invalidParamType = invalidParamType;
