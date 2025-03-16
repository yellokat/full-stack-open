import {JSX} from "react";
import {HeaderProps} from "../types/props.ts";

const Header = (props: HeaderProps): JSX.Element => {
    return (
        <h1>{props.courseName}</h1>
    )
}

export default Header;