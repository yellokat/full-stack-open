"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDiagnosisEntries = void 0;
const diasnoses_1 = __importDefault(require("../data/diasnoses"));
const getDiagnosisEntries = () => {
    return diasnoses_1.default.map(({ code, name, latin }) => ({
        code,
        name,
        latin
    }));
};
exports.getDiagnosisEntries = getDiagnosisEntries;
