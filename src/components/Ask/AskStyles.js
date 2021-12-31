import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  questionContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  sendIcon: {
    fontSize: "30px",
    zIndex: 300,
    margin: "0px 5px",
    padding: "10px",
    border: "none",
    borderRadius: "20%",
    background: "none",
    transition: "background 1s ease ",
    "&:hover": {
      background: "#d9e0ff",
      border: "1px solid #929ca6",
    },
  },
});
