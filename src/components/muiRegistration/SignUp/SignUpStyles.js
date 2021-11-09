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
    height: "55vh",
    maxWidth: "400px",
    margin: "50px auto",
  },
  gridContainer: {
    height: "100%",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
