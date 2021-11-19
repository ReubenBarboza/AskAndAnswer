import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  signUpContainer: {
    height: "calc(100vh - 100px)",
    width: "100vw",
    overflow: "auto",
    boxShadow: "0 0 200px rgba(0,0,0,0.9) inset",
  },
  paper: {
    padding: 20,
    height: "65vh",
    maxWidth: "400px",
    margin: "50px auto",
  },
  gridContainer: {
    height: "100%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  successText: {
    textAlign: "center",
    padding: "3px",
    backgroundColor: "#b5f5c6",
    border: "1px solid #4e6e56",
    borderRadius: "3px",
  },
  link: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  errorText: {
    textAlign: "center",
    padding: "5px",
    margin: "10px",
    backgroundColor: "#fcd4e0",
    border: "1px solid #854953",
    borderRadius: "3px",
  },
});
