import axios from "axios";
import { Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async ():Promise<Patient[]> => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const findById = async (id: string):Promise<Patient> => {
  const { data } = await axios.get<Patient>(
      `${apiBaseUrl}/patients/${id}`
  );

  return data;
};

const create = async (object: PatientFormValues):Promise<Patient> => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

export default {
  getAll, findById, create
};

