import SuccessMessage from './successMessage.jsx'
import ErrorMessage from './errorMessage.jsx'

const NotificationComponent = ({ notificationState }) => {
  console.log(`notification state is ${notificationState}`)
  if (!notificationState) {
    return null
  } else if (notificationState.success) {
    return <SuccessMessage message={notificationState.content} />
  } else {
    return <ErrorMessage message={notificationState.content} />
  }
}

export default NotificationComponent