import axios from "axios";
import { Diagnosis } from '../types/types.ts';

import { apiBaseUrl } from "../constants";

const getAll = async ():Promise<Diagnosis[]> => {
    const { data } = await axios.get<Diagnosis[]>(
        `${apiBaseUrl}/diagnoses`
    );
    return data;
};

export default {
    getAll
};

