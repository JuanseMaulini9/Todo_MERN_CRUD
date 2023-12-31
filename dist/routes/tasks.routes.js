"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateToken_1 = require("../middlewares/validateToken");
const tasks_controller_1 = require("../controllers/tasks.controller");
const router = (0, express_1.Router)();
router.get("/tasks", validateToken_1.authRequired, tasks_controller_1.getTasks);
router.get("/tasks/:id", validateToken_1.authRequired, tasks_controller_1.getTask);
router.post("/tasks", validateToken_1.authRequired, tasks_controller_1.createTask);
router.delete("/tasks/:id", validateToken_1.authRequired, tasks_controller_1.deleteTask);
router.put("/tasks/:id", validateToken_1.authRequired, tasks_controller_1.putTask);
exports.default = router;
