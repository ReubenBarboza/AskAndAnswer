import React from "react";
import { useState } from "react";
import { NavContainer } from "./styles/Navbar/NavContainer.styled";
import GlobalStyles from "./styles/Global.styles";
import { LogoTitle } from "./styles/Navbar/LogoTitle.styled";
import { StyledLink } from "./styles/Navbar/StyledLink.styled";
import { LinkContainer } from "./styles/Navbar/LinkContainer.styled";
import { HamburgerIcon } from "./styles/Navbar/HamburgerIcon.styled";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router";

function Navbar() {
  const [animate, setAnimate] = useState(false);
  const location = useLocation();

  const links = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Ask",
      path: "/Ask",
    },
    {
      name: "Answer",
      path: "/Answer",
    },
    {
      name: "Login",
      path: "/Login",
    },
  ];

  return (
    <NavContainer>
      <GlobalStyles />
      <span>
        <LogoTitle to="/">Ask&amp;Answer</LogoTitle>
      </span>
      <HamburgerIcon icon={faBars} onClick={() => setAnimate(!animate)} />
      <LinkContainer animate={animate}>
        {/* <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/Ask">Ask</StyledLink>
        <StyledLink to="/Answer">Answer</StyledLink>
        <StyledLink to="/Login">Login</StyledLink> */}
        {links.map((link, index) => {
          return (
            <StyledLink
              key={index}
              to={link.path}
              className={location.pathname === link.path ? "active" : null}
            >
              {link.name}
            </StyledLink>
          );
        })}
      </LinkContainer>
    </NavContainer>
  );
}

export default Navbar;
