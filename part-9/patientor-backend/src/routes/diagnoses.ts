import express, { Response } from 'express';
import {Diagnosis} from "../types/types";
import diagnosisService from "../service/diagnosisService";

const router = express.Router();

router.get('/', (_req, res: Response<Diagnosis[]>) => {
    const diagnoses:Diagnosis[] = diagnosisService.getDiagnoses();
    res.send(diagnoses);
});

export default router;