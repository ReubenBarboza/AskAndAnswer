import React from "react";
import { useState } from "react";
import { NavContainer } from "./styles/Navbar/NavContainer.styled";
import GlobalStyles from "./styles/Global.styles";
import { LogoTitle } from "./styles/Navbar/LogoTitle.styled";
import { StyledLink } from "./styles/Navbar/StyledLink.styled";
import { LinkContainer } from "./styles/Navbar/LinkContainer.styled";
import { HamburgerIcon } from "./styles/Navbar/HamburgerIcon.styled";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [animate, setAnimate] = useState(false);

  return (
    <NavContainer>
      <GlobalStyles />
      <LogoTitle to="/">Ask&amp;Answer</LogoTitle>
      <HamburgerIcon icon={faBars} onClick={() => setAnimate(!animate)} />
      <LinkContainer animate={animate}>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/Ask">Ask</StyledLink>
        <StyledLink to="/Answer">Answer</StyledLink>
        <StyledLink to="/Login">Login</StyledLink>
      </LinkContainer>
    </NavContainer>
  );
}

export default Navbar;
