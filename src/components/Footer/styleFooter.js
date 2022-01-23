import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  footerMainContainer: {
    backgroundColor: "#100d38",
    minHeight: "100px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  footerLinkContainer: {
    display: "flex",
    justifyContent: "space-between",
    minWidth: "25%",
    "@media screen and (max-width:500px)": {
      flexDirection: "column",
      justifyContent: "center",
      gap: "5px",
    },
  },
  footerLinkItem: {
    flexShrink: "0",
    padding: "0px 10px",
    textAlign: "center",
    textDecoration: "none",
    cursor: "pointer",
    color: "#fcf5e3",
  },
  footerCopyright: {
    display: "flex",
    justifyContent: "center",
    color: "#fcf5e3",
    marginTop: "10px",
    position: "relative",
    "& ::after": {
      content: "''",
      position: "absolute",
      height: "1px",
      width: "120%",
      top: "0",
      backgroundColor: "white",
    }, //doesnt work
  },
});
