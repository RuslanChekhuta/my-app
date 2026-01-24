const Footer = ({ userName, setUserName, isDark }) => {
  // TODO: Реализуйте логику здесь.
  return (
    <footer className={isDark ? "footer-active" : ""}>
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
    </footer>
  );
};

export default Footer;
