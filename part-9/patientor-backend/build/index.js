"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const ping_1 = __importDefault(require("./routes/ping"));
const patients_1 = __importDefault(require("./routes/patients"));
const diagnoses_1 = __importDefault(require("./routes/diagnoses"));
// ========================================================================
// initialize app
// ========================================================================
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// ========================================================================
// include routers
// ========================================================================
app.use('/api/ping', ping_1.default);
app.use('/api/patients', patients_1.default);
app.use('/api/diagnosis', diagnoses_1.default);
// ========================================================================
// start server
// ========================================================================
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
