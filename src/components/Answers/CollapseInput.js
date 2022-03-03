import React from "react";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
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
  errorText: {
    textAlign: "center",
    padding: "4px",
    backgroundColor: "#facacb",
    border: "1px solid #854953",
    borderRadius: "3px",
  },
});

const CollapseInput = ({ answerInput, handleChange, handleSubmit, error }) => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.divider}>
        <div className={classes.inner}></div>
      </div>
      <div className={classes.expandedContainer}>
        <div className={classes.expandedTextFieldButtonGroup}>
          <TextField
            aria-label="Answer the question"
            placeholder="Your Answer"
            variant="standard"
            name="yourAnswer"
            inputRef={answerInput}
            multiline
            sx={{
              width: "50vw",
              height: "100%",
              my: "25px",
              "& .MuiInputBase-input": {
                color: "#000", // Text color
              },
              "& .MuiInput-underline:before": {
                borderBottomColor: "#100d38", // Semi-transparent underline
              },
              "& .MuiInput-underline:hover:before": {
                borderBottomColor: "#100d38", // Solid underline on hover
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "#3f51b5", // Solid underline on focus
              },
            }}
            onChange={handleChange}
          />
          <button className={classes.sendIcon} onClick={handleSubmit}>
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>

        {error && (
          <Grid item xs={12} sx={{ width: "25vw", mx: "auto", mb: "5vh" }}>
            <Typography variant="subtitle1" className={classes.errorText}>
              {error}
            </Typography>
          </Grid>
        )}
      </div>
    </div>
  );
};

export default CollapseInput;
