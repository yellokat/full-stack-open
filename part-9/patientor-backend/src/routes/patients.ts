import express, {Request, Response} from 'express';
import patientService from "../service/patientService";
import {NewPatient, PublicPatient} from "../types";
import middleware from "../utils/middleware";

const router = express.Router();

router.get('/', (_req, res: Response<PublicPatient[]>) => {
    const publicPatients: PublicPatient[] = patientService.getPublicPatients();
    res.send(publicPatients);
});

router.get('/:id', (req, res: Response<PublicPatient>) => {
    const patient = patientService.findPublicPatientsById(req.params.id);
    if(patient){
        res.send(patient);
    }else{
        res.sendStatus(404);
    }
});

router.post('/', middleware.newPatientParser, (req: Request<unknown, unknown, NewPatient>, res:Response<PublicPatient>)=>{
    const addedPatient = patientService.addPatient(req.body);
    res.json(addedPatient);
});

export default router;