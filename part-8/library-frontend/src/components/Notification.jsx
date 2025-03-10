import PropTypes from "prop-types";

const Notification = ({ errorMessage }) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}

Notification.propTypes = {
  errorMessage: PropTypes.string,
}

export default Notification