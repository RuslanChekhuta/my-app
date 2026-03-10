import { Link } from "react-router";
import styled from "styled-components";

const StyledLink = styled(Link)`
  color: blue;
  text-decoration: none;
  margin-right: 30px;
  &:hover {
    color: darkblue;
    text-decoration: underline;
  }
`;

const Navbar = () => {
  return (
    <nav style={{ backgroundColor: "grey" }}>
      <StyledLink to={"/"}>Главная</StyledLink>
      <StyledLink to={"/about"}>О нас</StyledLink>
      <StyledLink to={"/auth"}>Войти</StyledLink>
    </nav>
  );
};

export default Navbar;
