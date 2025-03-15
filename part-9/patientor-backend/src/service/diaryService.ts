import {DiagnosisEntry} from "../types";
import diagnosisEntries from "../data/diasnoses";

export const getDiagnosisEntries = (): DiagnosisEntry[] => {
    return diagnosisEntries.map(({code, name, latin}) => ({
        code,
        name,
        latin
    }));
};