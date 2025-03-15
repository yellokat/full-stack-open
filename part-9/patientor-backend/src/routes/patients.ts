import express, {Response} from 'express';
import {getPublicPatientEntries} from "../service/patientService";
import {PublicPatientEntry} from "../types";

const router = express.Router();

router.get('/', (_req, res: Response<PublicPatientEntry[]>) => {
    const publicPatientEntries: PublicPatientEntry[] = getPublicPatientEntries();
    res.send(publicPatientEntries);
});

export default router;