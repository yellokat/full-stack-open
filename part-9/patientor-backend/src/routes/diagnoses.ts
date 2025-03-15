import express, { Response } from 'express';
import {DiagnosisEntry} from "../types";
import {getDiagnosisEntries} from "../service/diaryService";

const router = express.Router();

router.get('/', (_req, res: Response<DiagnosisEntry[]>) => {
    const diagnoses:DiagnosisEntry[] = getDiagnosisEntries();
    res.send(diagnoses);
});

export default router;