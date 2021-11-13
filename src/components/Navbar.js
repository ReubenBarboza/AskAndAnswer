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

function Navbar({ user }) {
  const [animate, setAnimate] = useState(false);
  const location = useLocation();

  // const links = [
  //   {
  //     name: "Home",
  //     path: "/",
  //   },
  //   {
  //     name: "Ask",
  //     path: "/Ask",
  //   },
  //   {
  //     name: "Answer",
  //     path: "/Answer",
  //   },
  //   {
  //     name: "Login",
  //     path: "/Login",
  //   },
  // ];

  return (
    <NavContainer>
      <GlobalStyles />
      <span>
        <LogoTitle to="/">Ask&amp;Answer</LogoTitle>
      </span>
      <HamburgerIcon icon={faBars} onClick={() => setAnimate(!animate)} />
      <LinkContainer animate={animate}>
        <StyledLink
          to="/"
          className={location.pathname === "/" ? "active" : null}
        >
          Home
        </StyledLink>
        <StyledLink
          to="/Ask"
          className={location.pathname === "/Ask" ? "active" : null}
        >
          Ask
        </StyledLink>
        <StyledLink
          to="/Answer"
          className={location.pathname === "/Answer" ? "active" : null}
        >
          Answer
        </StyledLink>
        <StyledLink
          to={user ? "/Logout" : "/Login"}
          className={
            location.pathname === "/Login" || location.pathname === "/Logout"
              ? "active"
              : null
          }
        >
          {user ? "Logout" : "Login"}
        </StyledLink>
        {/* {links.map((link, index) => {
          return (
            <StyledLink
              key={index}
              to={link.path}
              className={location.pathname === link.path ? "active" : null}
            >
              {link.name}
            </StyledLink>
          );
        })} */}
      </LinkContainer>
    </NavContainer>
  );
}

export default Navbar;
