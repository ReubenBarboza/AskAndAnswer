import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  paperStyle: {
    padding: 20,
    height: "55vh",
    maxWidth: "400px",
    margin: "50px auto",
  },
  gridContainerStyle: {
    height: "100%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  gridItem: {
    width: "100%",
  },
  showPassword: {
    fontSize: "12px",
    cursor: "pointer",
  },
  loginContainer: {
    height: "calc(100vh - 100px)",
    overflow: "auto",
    boxShadow: "0 0 200px rgba(0,0,0,0.9) inset",
  },
  link: {
    textAlign: "center",
    textDecoration: "none",
    "& p": {
      marginTop: "8px",
    },
    "& p:hover": {
      textDecoration: "underline",
    },
  },
});
