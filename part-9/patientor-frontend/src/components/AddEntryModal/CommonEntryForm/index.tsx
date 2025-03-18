import {ReactElement} from 'react';
import Index from "./DiagnosisCodeMultiSelect";
import {Box, Input, InputLabel, Stack, TextField} from "@mui/material";
import {CommonEntryFormProps} from "./propTypes.ts";

function CommonEntryForm(props: CommonEntryFormProps): ReactElement {
    return (
        <div>
            <Stack direction="row" spacing={2}>
                <TextField variant="standard" label="Description" onChange={props.handleDescriptionChange}
                           sx={{minWidth: 250}}></TextField>
                <Box>
                    <InputLabel>Date</InputLabel>
                    <Input type="date" onChange={props.handleDateChange}
                           sx={{minWidth: 250, input: {color: "grey"}}}></Input>
                </Box>
            </Stack>
            <Stack direction="row" spacing={2}>
                <TextField variant="standard" label="Specialist" onChange={props.handleSpecialistChange}
                           sx={{minWidth: 250}}></TextField>
                <Index codes={props.diagnosisCodes} onChange={props.handleDiagnosisCodeChange}/><br/>
            </Stack>
            <br/>
            <br/>
        </div>
    );
}

export default CommonEntryForm;