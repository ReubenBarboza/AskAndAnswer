import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  aboveQuestionContainer: {
    display: "flex",
    flexDirection: "column",

    width: "75%",
  },
  questionContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
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
  expandedContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  expandedTextFieldButtonGroup: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    textAlign: "center",
    padding: "4px",
    backgroundColor: "#facacb",
    border: "1px solid #854953",
    borderRadius: "3px",
  },
});
