import express, {Response} from 'express';
import patientService from "../service/patientService";
import {PublicPatient} from "../types";
import toNewPatient from "../utils";

const router = express.Router();

router.get('/', (_req, res: Response<PublicPatient[]>) => {
    const publicPatients: PublicPatient[] = patientService.getPublicPatients();
    res.send(publicPatients);
});

router.post('/', (req, res:Response<PublicPatient|string>)=>{
    try {
        const newPatient = toNewPatient(req.body);
        const addedPatient = patientService.addPatient(newPatient);
        res.json(addedPatient);
    } catch (error: unknown){
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;