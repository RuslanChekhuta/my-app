import Button from "../Button/Button";
import styles from "./Header.module.css";

const Header = ({ toggleTheme }) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>React Theme App</h1>
      <Button onClick={toggleTheme}>Сменить тему</Button>
    </header>
  );
};

export default Header;
