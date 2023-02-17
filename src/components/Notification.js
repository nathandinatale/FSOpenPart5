const Notification = ({ message, color }) => {
  if (!message) return null;
  return (
    <div className="notification" style={{ color }}>
      {message}
    </div>
  );
};

export default Notification;
