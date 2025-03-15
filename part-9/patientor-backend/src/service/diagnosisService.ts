import {Diagnosis} from "../types";
import diagnosisDatabase from "../data/diasnoses";

const getDiagnoses = (): Diagnosis[] => {
    return diagnosisDatabase.map(({code, name, latin}) => ({
        code,
        name,
        latin
    }));
};

export default { getDiagnoses };