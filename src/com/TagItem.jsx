import React from "react";
import { makeStyles } from "@mui/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles({
  item: {
    backgroundColor: "white",
    margin: "0px 2px",
    padding: "0.25rem",
    border: "1px solid lightgray",
    borderRadius: "10px",
  },
  tagSpan: {
    fontSize: "14px",
  },
  tagButton: {
    color: "#D8000C",
    fontSize: "10px",
    cursor: "pointer",
    marginLeft: "2px",
    padding: "2px",
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderRadius: "50%",
    "&:hover": {
      backgroundColor: "#FFD2D2",
    },
  },
});

const TagItem = ({ tag, index, handleFn }) => {
  const classes = useStyles();
  return (
    <>
      <li className={classes.item}>
        <span className={classes.tagSpan}>{tag}</span>
        <button className={classes.tagButton} onClick={() => handleFn(index)}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </li>
    </>
  );
};

export default TagItem;
