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
exports.profile = exports.logout = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../libs/jwt");
const user_model_1 = __importDefault(require("../models/user.model"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, username } = req.body;
    try {
        const passwordHash = yield bcryptjs_1.default.hash(password, 10);
        const newUser = new user_model_1.default({
            username,
            email,
            password: passwordHash,
        });
        const userSaved = yield newUser.save();
        const token = yield (0, jwt_1.createAccessToken)({ id: userSaved._id });
        res.cookie("token", token),
            res.json({
                id: userSaved._id,
                username: userSaved.username,
                email: userSaved.email,
                createdAt: userSaved.createdAt,
                updatedAt: userSaved.updatedAt,
            });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const userFound = yield user_model_1.default.findOne({ email });
        if (!userFound)
            return res.status(400).json({
                message: "User not found",
            });
        const { password: userPassword } = userFound;
        if (typeof password === "string" && typeof userPassword === "string") {
            const isMatch = yield bcryptjs_1.default.compare(password, userPassword);
            if (!isMatch)
                return res.status(400).json({
                    message: "Incorrect password",
                });
        }
        else {
            return res.status(500).json({
                message: "Unexpected password type",
            });
        }
        const token = yield (0, jwt_1.createAccessToken)({ id: userFound._id });
        res.cookie("token", token),
            res.json({
                id: userFound._id,
                username: userFound.username,
                email: userFound.email,
                createdAt: userFound.createdAt,
                updatedAt: userFound.updatedAt,
            });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.login = login;
const logout = (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0),
    });
    return res.sendStatus(200);
};
exports.logout = logout;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userFound = yield user_model_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
    if (!userFound)
        return res.status(400).json({ message: "User not found" });
    const userObject = userFound.toObject();
    return res.json({
        id: userObject._id,
        username: userObject.username,
        email: userObject.email,
        createdAt: userObject.createdAt,
        updatedAt: userObject.updatedAt,
    });
});
exports.profile = profile;
