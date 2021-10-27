import React from "react";
import { useState, useEffect } from "react";
import { NavContainer } from "./styles/NavContainer.styled";
import { Flex } from "./styles/Flex.styled";
import GlobalStyles from "./styles/Global.styles";
import { LogoTitle } from "./styles/LogoTitle.styled";
import { StyledLink } from "./styles/StyledLink.styled";
import { LinkContainer } from "./styles/LinkContainer.styled";
import { HamburgerIcon } from "./styles/HamburgerIcon.styled";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [show, setShow] = useState(false);

  return (
    <NavContainer>
      <GlobalStyles />
      <LogoTitle to="/">Ask&amp;Answer</LogoTitle>
      <HamburgerIcon icon={faBars} onClick={() => setShow(!show)} />
      <LinkContainer show={show}>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/Ask">Ask</StyledLink>
        <StyledLink to="/Answer">Answer</StyledLink>
        <StyledLink to="/Login">Login</StyledLink>
      </LinkContainer>
    </NavContainer>
  );
}

export default Navbar;
