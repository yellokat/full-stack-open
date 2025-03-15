import express from 'express';
import cors from 'cors';
import pingRouter from './routes/ping';
import patientRouter from './routes/patients';
import diagnosisRouter from './routes/diagnoses';
import middleware from "./utils/middleware";

// ========================================================================
// initialize app
// ========================================================================

const app = express();
app.use(cors());
app.use(express.json());

// ========================================================================
// include routers
// ========================================================================

app.use('/api/ping', pingRouter);
app.use('/api/patients', patientRouter);
app.use('/api/diagnosis', diagnosisRouter);

// ========================================================================
// middleware
// ========================================================================

app.use(middleware.errorMiddleware);

// ========================================================================
// start server
// ========================================================================

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});