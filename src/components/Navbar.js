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
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
const useStyles = makeStyles({
  dropdown: {
    position: "relative",
    display: "inline-block",
    "@media (max-width:900px)": {
      margin: "30px",
    },
    "&:hover": {
      "& $dropdownContent": {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        borderRadius: "5px",
        "@media (max-width:900px)": {
          display: "none",
        },
      },
      "& $dropbtn": {
        backgroundColor: "#3f51b5",
      },
    },
  },
  dropbtn: {},
  link: {
    textDecoration: "none",
    color: "white",
    display: "block",
    padding: "5px",
    width: "100%",
    "&:hover": {
      backgroundColor: "#3f51b5",
    },
  },
  dropdownContent: {
    display: "none",
    position: "absolute",
    left: "40px",
    marginTop: "20px",
    backgroundColor: "#100d38",
    border: "1px solid white",
    minWidth: "max-content",
    boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
    zIndex: "1",
  },
  displayName: {
    color: "white",
    padding: "5px",
  },
});

function Navbar({ user, isUserModerator }) {
  const classes = useStyles();
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
        {isUserModerator && (
          <div className={classes.dropdown}>
            <StyledLink
              to={"/ModerateQuestions" || "/ModerateAnswers"}
              className={
                location.pathname === "/ModerateQuestions" ||
                location.pathname === "/ModerateAnswers"
                  ? `active ${classes.dropbtn}`
                  : `${classes.dropbtn}`
              }
            >
              Moderate
            </StyledLink>
            <div className={classes.dropdownContent}>
              <Link className={classes.link} to="/ModerateQuestions">
                Moderate Questions
              </Link>
              <Link className={classes.link} to="/ModerateAnswers">
                Moderate Answers
              </Link>
            </div>
          </div>
        )}
        <div className={classes.dropdown}>
          <StyledLink
            to={user ? "/Logout" : "/Login"}
            className={
              location.pathname === "/Login" || location.pathname === "/Logout"
                ? `active ${classes.dropbtn}`
                : `${classes.dropbtn}`
            }
          >
            {user ? "Logout" : "Login"}
          </StyledLink>
          {user ? (
            <div className={classes.dropdownContent}>
              <span className={classes.displayName}>{user.displayName}</span>
            </div>
          ) : null}
        </div>
        <StyledLink
          to="/About"
          className={location.pathname === "/About" ? "active" : null}
        >
          About
        </StyledLink>
      </LinkContainer>
    </NavContainer>
  );
}

export default Navbar;
