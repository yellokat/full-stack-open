import {ReactElement} from "react";
import HospitalEntryForm from "./HospitalEntryForm";
import {TextField} from "@mui/material";
import HealthCheckEntryForm from "./HealthCheckEntryForm";
import {assertNever} from "../../../utils/helper.ts";
import {HospitalEntryProps, TypeSpecificEntryFormProps} from "./propTypes.ts";

const TypeSpecificContent = (props: TypeSpecificEntryFormProps): ReactElement => {
    switch (props.type) {
        case "Hospital":
            const hospitalEntryProps: HospitalEntryProps = {
                dischargeDate: props.dischargeDate,
                dischargeCriteria: props.dischargeCriteria,
                handleDischargeDateChange: props.handleDischargeDateChange,
                handleDischargeCriteriaChange: props.handleDischargeCriteriaChange,
            };
            return (<div>
                <HospitalEntryForm {...hospitalEntryProps}/>
            </div>);
        case "OccupationalHealthcare":
            return (<div>
                <TextField variant="standard" label="Employer" value={props.employerName}
                           onChange={props.handleEmployerNameChange}
                           sx={{minWidth: 250}}></TextField>
            </div>);
        case "HealthCheck":
            return (<div>
                <HealthCheckEntryForm healthCheckGrade={props.healthCheckRating} handleHealthCheckGradeChange={props.handleHealthCheckRatingChange}/>
            </div>);
        default:
            return assertNever(props.type);
    }
};

export default TypeSpecificContent;