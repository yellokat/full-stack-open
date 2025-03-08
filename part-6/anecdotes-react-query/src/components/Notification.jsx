import {useContext} from "react";
import NotificationContext from "../notificationContext.jsx";

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const [notificationString] = useContext(NotificationContext)
  
  if (!notificationString) return null

  return (
    <div style={style}>
      {notificationString}
    </div>
  )
}

export default Notification
