import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  questionContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "75%",
  },
  sendIcon: {
    fontSize: "30px",
    zIndex: 300,
    margin: "0px 5px",
    padding: "10px",
    borderRadius: "20%",
    background: "none",
    border: "1px solid transparent",
    transition: "background 1s ease ",
    "&:hover": {
      background: "#e6e6e6",
      border: "1px solid #e6e6e6",
    },
  },
  divider: {
    width: "50%",
    height: "1px",
    margin: "0px auto",
  },
  inner: {
    width: "100%",
    height: "100%",
    backgroundColor: "#f0f0f0",
  },
  expandedAnswerTextFieldContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
