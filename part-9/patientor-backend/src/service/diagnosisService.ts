import {Diagnosis} from "../types/types";
import diagnosisDatabase from "../data/diagnoses";

const getDiagnoses = (): Diagnosis[] => {
    return diagnosisDatabase.map(({code, name, latin}) => ({
        code,
        name,
        latin
    }));
};

export default { getDiagnoses };