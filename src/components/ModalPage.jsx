import { useState } from "react";
import Modal from "./Modal";
import Container from "./Container";

const ModalPage = () => {
  // TODO: Реализуйте логику здесь.

  const [modalId, setModalId] = useState(null);

  const toggleModal = (id) => {
    setModalId((prevId) => (prevId === id ? null : id));
  };

  return (
    <Container>
      <h2>Управление модальными окнами</h2>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => toggleModal(1)} style={{ marginRight: "10px" }}>
          Открыть Модалку 1
        </button>
        <button onClick={() => toggleModal(2)}>Открыть Модалку 2</button>
      </div>

      {/* Модальное окно №1 */}
      <Modal isOpen={modalId === 1} onClose={() => setModalId(null)}>
        <h3>Вход</h3>
        <input
          type="text"
          placeholder="Логин"
          style={{ display: "block", marginBottom: "10px" }}
        />
        <input type="password" placeholder="Пароль" />
        <button style={{ display: "block", marginTop: "10px" }}>Войти</button>
      </Modal>

      {/* Модальное окно №2 */}
      <Modal isOpen={modalId === 2} onClose={() => setModalId(null)}>
        <h3>Информация</h3>
        <p>Этот контент прокинут через пропс children! Очень удобно, правда?</p>
      </Modal>
    </Container>
  );
};

export default ModalPage;
