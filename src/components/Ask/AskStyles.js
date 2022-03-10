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
      background: "#ffffff",
      border: "1px solid #ffffff",
    },
  },
  errorText: {
    textAlign: "center",
    padding: "4px",
    margin: "4px 0px",
    backgroundColor: "#facacb",
    border: "1px solid #854953",
    borderRadius: "3px",
  },
  successText: {
    textAlign: "center",
    padding: "4px",
    margin: "4px 0px",
    backgroundColor: "#DFF2BF",
    border: "1px solid #4F8A10",
    borderRadius: "3px",
  },
});
