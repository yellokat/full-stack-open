"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = require("../service/patientService");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    const publicPatientEntries = (0, patientService_1.getPublicPatientEntries)();
    res.send(publicPatientEntries);
});
exports.default = router;
