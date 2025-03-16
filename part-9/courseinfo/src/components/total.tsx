import {JSX} from "react";
import {TotalProps} from "../types/props.ts";

const Total = (props: TotalProps): JSX.Element => {
    return (
        <>Number of exercises {props.totalExercises}</>
    )
}

export default Total;