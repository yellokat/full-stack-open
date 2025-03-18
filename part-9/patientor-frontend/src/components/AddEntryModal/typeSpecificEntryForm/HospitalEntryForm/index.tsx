import {Box, Input, InputLabel, TextField} from "@mui/material";
import {HospitalEntryProps} from "../propTypes.ts";

const HospitalEntryForm = (props: HospitalEntryProps) => {
    return (
        <Box sx={{width: 500}}>
            <Box>
                <InputLabel>Discharge Date</InputLabel>
                <Input type="date" onChange={props.handleDischargeDateChange}
                       sx={{minWidth: 250, input: {color: "grey"}}}></Input>
            </Box>
            <TextField variant="standard" label="Discharge Criteria" onChange={props.handleDischargeCriteriaChange}
                       sx={{minWidth: 250}}></TextField>
        </Box>
    );
};

export default HospitalEntryForm;
