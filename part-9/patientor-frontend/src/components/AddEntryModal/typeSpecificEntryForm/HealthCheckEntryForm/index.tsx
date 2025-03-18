import {Box, Slider, Typography} from "@mui/material";
import {HealthCheckEntryProps} from "../propTypes.ts";

const HealthCheckEntryForm = (props:HealthCheckEntryProps) => {
    return (
        <Box sx={{ padding:"0px 30px", width: 300}}>
            <Typography gutterBottom>Health Check Grade</Typography>
            <Slider
                value={props.healthCheckRating}
                onChange={props.handleHealthCheckRatingChange}
                min={0}
                max={3}
                step={1}
                marks={[
                    {value: 0, label: "Healthy"},
                    {value: 1, label: "Low Risk"},
                    {value: 2, label: "High Risk"},
                    {value: 3, label: "Critical Risk"},
                ]}
                valueLabelDisplay="auto"  // Display the value label when sliding
                valueLabelFormat={(value) => value}  // Format the value label
            />
        </Box>
    );
};

export default HealthCheckEntryForm;
