import PropTypes from "prop-types";

const Notification = ({ notificationString }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  if (!notificationString) return null

  return (
    <div style={style}>
      {notificationString}
    </div>
  )
}

Notification.propTypes = {
  notificationString : PropTypes.string
}

export default Notification
