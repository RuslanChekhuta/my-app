import "./Footer.css"; // Глобальный импорт
import styles from "./Footer.module.css"; // Модульный импорт

const Footer = () => {
  return (
    <footer className="global-footer">
      <p className={styles.text}>© 2026 Мое React Приложение</p>
    </footer>
  );
};

export default Footer;
