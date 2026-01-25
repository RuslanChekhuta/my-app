import styled from "styled-components";

export const StyledInput = styled.input.attrs((props) => ({
  type: "text",
  placeholder: props.placeholder || "Введите текст...",
}))`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 4px;
  width: 100%;
  max-width: 300px;
  outline: none;
  background: transparent;
  color: inherit;

  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
  }
`;
