"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const controles_1 = tslib_1.__importDefault(require("./controles"));
const router = express_1.Router();
router.use('/', controles_1.default);
exports.default = router;
