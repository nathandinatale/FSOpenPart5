import PropTypes from "prop-types";

const Notification = ({ message, color }) => {
  const style = message ? { color } : { display: "none" };
  return (
    <div className="notification" style={style}>
      {message}
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string,
  color: PropTypes.string,
};

export default Notification;
