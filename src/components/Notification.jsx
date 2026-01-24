const Notification = ({ messages }) => {
  // TODO: Реализуйте логику здесь.
  return (
    <>
      {messages.length > 0 && (
        <div>У вас {messages.length} новых сообщений.</div>
      )}
    </>
  );
};

export default Notification;
