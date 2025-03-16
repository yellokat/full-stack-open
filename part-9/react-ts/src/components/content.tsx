import {JSX} from "react";
import {ContentProps} from "../types/props.ts";
import {assertNever} from "../utils/helper.ts";

const Content = (props: ContentProps): JSX.Element => {
    return (<>
        {props.courseParts.map((e) => {
            switch(e.kind){
                case "group":
                    return (<>
                        <span><b>{e.name} {e.exerciseCount}</b></span><br/>
                        <span>{e.groupProjectCount} Project exercises</span><br/><br/>
                    </>)
                case "basic":
                    return(<>
                        <span><b>{e.name} {e.exerciseCount}</b></span><br/>
                        <span><i>{e.description}</i></span><br/><br/>
                    </>)
                case "background":
                    return(<>
                        <span><b>{e.name} {e.exerciseCount}</b></span><br/>
                        <span><i>{e.description}</i></span><br/>
                        <span>For more information see : {e.backgroundMaterial}</span><br/><br/>
                    </>)
                default:
                    return assertNever(e)
            }
        })}
    </>);
}

export default Content;