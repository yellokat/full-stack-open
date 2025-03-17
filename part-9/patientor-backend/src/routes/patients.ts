import express, {Request, Response} from 'express';
import patientService from "../service/patientService";
import {Entry, NewEntry, NewPatient, Patient, PublicPatient} from "../types/types";
import middleware from "../utils/middleware";
import NotExistResourceError from "../utils/errors";
import {ErrorDto} from "../types/dtos";

const router = express.Router();

router.get('/', (_req, res: Response<PublicPatient[]>) => {
    const publicPatients: PublicPatient[] = patientService.getPatients().map((patient: Patient) => patientService.toPublicPatient(patient));
    res.send(publicPatients);
});

router.get('/:id', (req, res: Response<PublicPatient | ErrorDto>) => {
    try {
        const patient: Patient = patientService.findByIdOrError(req.params.id);
        res.send(patient);
    } catch (error: unknown) {
        if (error instanceof NotExistResourceError) {
            res.sendStatus(404);
        } else {
            res.sendStatus(500);
        }
    }
});

router.post('/:id/entries', middleware.newEntryParser, (req: Request<{id:string}, unknown, NewEntry>, res: Response<Entry|ErrorDto>) => {
    try {
        const createdEntry: Entry = patientService.addEntry(req.params.id, req.body);
        res.send(createdEntry);
    } catch (error: unknown) {
        if (error instanceof NotExistResourceError) {
            res.sendStatus(404);
        } else {
            res.sendStatus(500);
        }
    }
});

router.post('/', middleware.newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<PublicPatient>) => {
    const addedPatient = patientService.addPatient(req.body);
    res.json(addedPatient);
});

export default router;