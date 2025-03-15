"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diaryService_1 = require("../service/diaryService");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    const diagnoses = (0, diaryService_1.getDiagnosisEntries)();
    res.send(diagnoses);
});
exports.default = router;
