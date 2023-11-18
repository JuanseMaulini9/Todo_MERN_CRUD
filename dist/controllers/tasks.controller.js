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
exports.putTask = exports.deleteTask = exports.getTask = exports.createTask = exports.getTasks = void 0;
const task_model_1 = __importDefault(require("../models/task.model"));
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const tasks = yield task_model_1.default.find({
        user: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
    }).populate("user");
    res.json(tasks);
});
exports.getTasks = getTasks;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { title, description, date } = req.body;
    const newTask = new task_model_1.default({
        title,
        description,
        date,
        user: (_b = req.user) === null || _b === void 0 ? void 0 : _b.id,
    });
    const savedTask = yield newTask.save();
    res.json(savedTask);
});
exports.createTask = createTask;
const getTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield task_model_1.default.findById(req.params.id).populate("user");
    if (!task)
        return res.status(404).json({ message: "task not found" });
    res.json(task);
});
exports.getTask = getTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield task_model_1.default.findByIdAndDelete(req.params.id);
    if (!task)
        return res.status(404).json({ message: "task not found" });
    return res.sendStatus(204);
});
exports.deleteTask = deleteTask;
const putTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield task_model_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    if (!task)
        return res.status(404).json({ message: "task not found" });
    res.json(task);
});
exports.putTask = putTask;
