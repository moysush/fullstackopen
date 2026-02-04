const Notify = ({ errorMessage, messageColor }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: messageColor }}>{errorMessage}</div>;
};

export default Notify;
