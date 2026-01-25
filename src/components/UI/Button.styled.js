import styled, { css, keyframes } from "styled-components";

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const StyledButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  border: 2px solid ${(props) => props.theme.colors.primary};
  background: transparent;
  color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
  margin: 5px;
  transition: 0.3s;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.$filled &&
    css`
      background: ${props.theme.colors.primary};
      color: ${props.theme.colors.background};
    `}

  &:hover {
    opacity: 0.8;
  }
`;

// Расширяем StyledButton (Task 03)
export const AnimatedButton = styled(StyledButton)`
  animation: ${rotate} 2s linear infinite;
  border-radius: 50px;
  width: 50px;
  height: 50px;
  padding: 0;
`;
