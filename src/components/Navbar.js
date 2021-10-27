import React from "react";
import { NavContainer } from "./styles/NavContainer.styled";
import { Flex } from "./styles/Flex.styled";
import GlobalStyles from "./styles/Global.styles";
import { LogoTitle } from "./styles/LogoTitle.styled";
import { StyledLink } from "./styles/StyledLink.styled";
import { LinkContainer } from "./styles/LinkContainer.styled";

function Navbar() {
  return (
    <NavContainer>
      <GlobalStyles />
      <LogoTitle to="/">Ask&amp;Answer</LogoTitle>
      <LinkContainer>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/Ask">Ask</StyledLink>
        <StyledLink to="/Answer">Answer</StyledLink>
        <StyledLink to="/Login">Login</StyledLink>
      </LinkContainer>
    </NavContainer>
  );
}

export default Navbar;
