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
    flexWrap: "wrap",
    justifyContent: "space-between",
    minWidth: "50%",
    paddingBottom: "10px",
    borderBottom: "1px solid #e6e6e6",
  },
  footerLinkItem: {
    flex: "1 1 100px",
    marginTop: "5px",
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
    marginBottom: "5px",
    position: "relative",
  },
});
