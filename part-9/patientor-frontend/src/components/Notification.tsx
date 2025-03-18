import {ReactElement} from "react";

const Notification = ({errorMessage}: { errorMessage: string }): ReactElement => {
    if (errorMessage==="") {
        return (<></>);
    }
    return (
        <div style={{color: 'red'}}>
            {errorMessage}
        </div>
    );
};

export default Notification;