"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPublicPatientEntries = exports.getPatientEntries = void 0;
const patients_1 = __importDefault(require("../data/patients"));
const getPatientEntries = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, ssn, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation
    }));
};
exports.getPatientEntries = getPatientEntries;
const getPublicPatientEntries = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
exports.getPublicPatientEntries = getPublicPatientEntries;
