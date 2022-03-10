import React from "react";
import { Link } from "react-router-dom";
import { useStyles } from "../Footer/styleFooter";

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.footerMainContainer}>
      <div className={classes.footerLinkContainer}>
        <Link className={classes.footerLinkItem} to="/">
          Home
        </Link>
        <Link className={classes.footerLinkItem} to="/Ask">
          Ask
        </Link>
        <Link className={classes.footerLinkItem} to="/Login">
          Log In
        </Link>
        <Link className={classes.footerLinkItem} to="/SignUp">
          Sign In
        </Link>
        <Link className={classes.footerLinkItem} to="/About">
          About
        </Link>
      </div>
      <div className={classes.footerCopyright}>Reuben Barboza &copy; 2022</div>
    </div>
  );
};

export default Footer;
