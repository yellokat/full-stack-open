import {ReactElement} from "react";
import {Box, Chip, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

interface Props {
    codes: string[];
    onChange: (event: SelectChangeEvent<string[]>) => void;
}

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const diagnosisCodes: string[] = [
    'L20',
    'S62.5',
    'Z74.3',
    'M24.2',
    'Z57.1',
    'J10.1',
    'S03.5',
    'M51.2',
    'H54.7',
    'J03.0',
    'H35.29',
    'J06.9',
    'N30.0',
    'L60.1',
    'F43.2',
];

const DiagnosisCodeMultiSelect = (props:Props): ReactElement => {
    return (
        <FormControl sx={{minWidth: 250}}>
            <InputLabel>Diagnosis Codes</InputLabel>
            <Select
                label="Diagnosis Codes"
                variant="standard"
                multiple
                value={props.codes}
                onChange={(event)=>props.onChange(event)}
                // input={<OutlinedInput label="Diagnosis Codes"/>}
                renderValue={(selected) => (
                    <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                        {selected.map((value) => (
                            <Chip key={value} label={value}/>
                        ))}
                    </Box>
                )}
                MenuProps={MenuProps}
            >
                {diagnosisCodes.map((code) => (
                    <MenuItem
                        key={code}
                        value={code}
                    >
                        {code}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default DiagnosisCodeMultiSelect;