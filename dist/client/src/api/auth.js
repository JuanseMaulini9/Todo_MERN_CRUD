"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRequest = void 0;
const axios_1 = __importDefault(require("axios"));
const API = "http://localhost:4000/api";
const registerRequest = (user) => axios_1.default.post(`${API}/register`, user);
exports.registerRequest = registerRequest;
