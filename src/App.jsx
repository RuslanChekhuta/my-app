import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyles";
import { StyledButton, AnimatedButton } from "./components/UI/Button.styled";
import { StyledInput } from "./components/UI/Input.styled";

const lightTheme = {
  colors: {
    primary: "#6200ee",
    background: "#ffffff",
    text: "#000000",
    border: "#cccccc",
  },
};

const darkTheme = {
  colors: {
    primary: "#bb86fc",
    background: "#121212",
    text: "#ffffff",
    border: "#333333",
  },
};

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const currentTheme = theme === "light" ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h1>Styled Components Lab</h1>

        <div>
          <StyledInput />
        </div>

        <div>
          <StyledButton onClick={toggleTheme}>
            Сменить на {theme === "light" ? "Темную" : "Светлую"} тему
          </StyledButton>

          <StyledButton $filled={true}>Filled Button</StyledButton>

          <AnimatedButton>↻</AnimatedButton>

          {/* Полиморфизм: компонент ведет себя как ссылка */}
          <StyledButton
            as="a"
            href="https://styled-components.com"
            target="_blank"
          >
            Я ссылка
          </StyledButton>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
