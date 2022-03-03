import React, { useEffect, useState, useRef } from "react";
import {
  faPaperPlane,
  faSearch,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";
import TagItem from "../../com/TagItem";

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  searchWrapper: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "10px",
  },
  search: {
    display: "flex",
    marginTop: "10px",
  },
  searchInput: {
    backgroundColor: "#100d38",
    paddingLeft: "10px",
    color: "#e6e6e6",
    height: "2rem",
    width: "200px",

    borderTopLeftRadius: "10px",
    borderBottomLeftRadius: "10px",
    borderColor: "transparent",
    "&::placeholder": {
      color: "#d9d5d4",
    },
    "&:active, &:focus": {
      backgroundColor: "rgba(16, 13, 56,0.8)",
      borderColor: "rgba(16, 13, 56,0.8)",
    },
    "&::-webkit-search-cancel-button": {
      display: "none",
    },
  },
  searchTagButton: {
    color: "#100d38",
    backgroundColor: "#e6e6e6",
    borderColor: "#100d38",
    borderRightWidth: "1px",
    padding: "0 0.5rem",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#cfcbc8",
    },
    "&:disabled": {
      backgroundColor: "#cfcbc8",
    },
  },
  searchSubmitButton: {
    color: "#100d38",
    backgroundColor: "#e6e6e6",
    borderColor: "#100d38",
    borderLeftWidth: "1px",
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "10px",
    padding: "0 0.5rem",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#cfcbc8",
    },
    "&:disabled": {
      backgroundColor: "#cfcbc8",
    },
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
  askTagWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  // askTagInput: {
  //   backgroundColor: "#100d38",
  //   paddingLeft: "10px",
  //   color: "#e6e6e6",
  //   height: "2rem",
  //   width: "175px",
  //   borderTopLeftRadius: "10px",
  //   borderBottomLeftRadius: "10px",
  //   borderColor: "transparent",
  //   "&::placeholder": {
  //     color: "#d9d5d4",
  //   },
  //   "&:active, &:focus": {
  //     backgroundColor: "rgba(16, 13, 56,0.8)",
  //     borderColor: "rgba(16, 13, 56,0.8)",
  //   },
  //   "&::-webkit-search-cancel-button": {
  //     display: "none",
  //   },
  // },
  askTagButton: {
    fontSize: "15px",
    color: "#100d38",
    backgroundColor: "#e6e6e6",
    border: "1px solid transparent",
    padding: "0.5rem 0.5rem",
    margin: "0px 5px",
    cursor: "pointer",
    background: "none",
    borderRadius: "20%",
    border: "1px solid transparent",
    transition: "background 1s ease ",
    "&:hover": {
      background: "#ffffff",
      border: "1px solid #ffffff",
    },
    "&:disabled": {
      color: "#cfcbc8",
      backgroundColor: "transparent",
      borderColor: "transparent",
    },
  },
  tagList: {
    listStyle: "none",
    display: "flex",
    justifyContent: "flex-start",
  },
});

const AskForm = ({
  questionInput,
  handleChange,
  handleSubmit,
  tags,
  setTags,
}) => {
  const classes = useStyles();

  const askTextField = useRef(null);
  const askTagButton = useRef(null);

  const [searchInput, setSearchInput] = useState("");
  const searchTextField = useRef(null);
  const searchTagButton = useRef(null);
  const searchSubmitButton = useRef(null);
  const [searchArray, setSearchArray] = useState([]);
  const [submitSearchArray, setSubmitSearchArray] = useState([]);

  const history = useHistory();

  useEffect(() => {
    try {
      //playing with refs
      if (searchTextField.current.value) {
        searchTextField.current.value = "";
        setSearchInput("");
      }
      if (searchArray.length >= 5) {
        searchTagButton.current.disabled = true;
      } else {
        searchTagButton.current.disabled = false;
      }
      if (searchArray.length === 0) {
        searchSubmitButton.current.disabled = true;
      } else {
        searchSubmitButton.current.disabled = false;
      }

      if (askTextField.current.value) {
        askTextField.current.value = "";
      }
      if (tags.length >= 5) {
        askTagButton.current.disabled = true;
      } else {
        askTagButton.current.disabled = false;
      }

      //push search data
      if (submitSearchArray.length > 0) {
        history.push({ pathname: "/SearchAsk", state: submitSearchArray });
      }

      // const questionsRef = query(
      //   collection(db, "questions"),
      //   where("tags", "array-contains-any", searchArray)
      // );
      // const snapshot = await getDocs(questionsRef);
      // snapshot.forEach((item) => console.log(item.data()));
      // if (searchArray.length > 0) {
      // }
    } catch (e) {
      console.log(e);
    }
  }, [submitSearchArray, searchArray, tags]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // setSearchArray(searchInput.trim().split(" "));
    if (!searchSubmitButton.current.disabled)
      setSubmitSearchArray([...searchArray]);
  };

  const handleSearchAddTag = () => {
    if (searchTextField.current.value && !searchTagButton.current.disabled)
      setSearchArray([...searchArray, searchInput]);
  };
  const handleSearchAddTagEnterKey = (e) => {
    //searchArray.length<=4 is because of keyup event, objective is to falsify when searchArray.length===5
    //in other words searchArray is updated one entry late
    if (e.key === "Enter" && e.target.value && searchArray.length <= 4) {
      setSearchArray([...searchArray, e.target.value.trim().toLowerCase()]);
      e.target.value = "";
    }
  };

  const handleSearchRemoveTag = (indexToRemove) => {
    setSearchArray(searchArray.filter((_, index) => index !== indexToRemove));
  };

  const handleTag = (e) => {
    //tags.length<=4 is because of keyup event, objective to falsify when tags.length===5
    //in other words tags is updated one entry late
    console.log(tags);
    if (e.key === "Enter" && e.target.value && tags.length <= 4) {
      setTags([...tags, e.target.value.trim().toLowerCase()]);
      e.target.value = "";
    }
  };

  const handleClickedAskTag = () => {
    if (askTextField.current.value && !askTagButton.current.disabled)
      setTags([...tags, askTextField.current.value]);
  };

  const handleRemoveTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };
  return (
    <div className={classes.wrapper}>
      <div className={classes.searchWrapper}>
        <div className={classes.search}>
          <input
            className={classes.searchInput}
            placeholder="Enter tags to search"
            type="search"
            ref={searchTextField}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyUp={handleSearchAddTagEnterKey}
          ></input>
          <button
            onClick={handleSearchAddTag}
            ref={searchTagButton}
            className={classes.searchTagButton}
          >
            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
          </button>
          <button
            ref={searchSubmitButton}
            className={classes.searchSubmitButton}
            onClick={handleSearchSubmit}
          >
            <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
          </button>
        </div>
      </div>
      <ul className={classes.tagList}>
        {searchArray.map((tag, index) => {
          return (
            // <li key={index}>
            //   <span>{tag}</span>
            //   <button onClick={() => handleSearchRemoveTag(index)}>X</button>
            // </li>
            <TagItem
              key={index}
              tag={tag}
              index={index}
              handleFn={handleSearchRemoveTag}
            />
          );
        })}
      </ul>

      <div className={classes.questionContainer}>
        <TextField
          aria-label="Ask a question"
          placeholder="Ask a question"
          variant="standard"
          name="question"
          inputRef={questionInput}
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
        <button
          className={classes.sendIcon}
          onClick={(e) => {
            handleSubmit(e);
            setTags([]);
          }}
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
        <br />
      </div>
      <div className={classes.askTagWrapper}>
        {/* <input
          type="text"
          placeholder="Enter tags"
          onKeyUp={handleTag}
          className={classes.askTagInput}
          ref={askTextField}
        ></input> */}
        <TextField
          variant="standard"
          aria-label="Enter tags"
          placeholder="Enter tags"
          onKeyUp={handleTag}
          inputRef={askTextField}
          sx={{
            width: "10vw",
            height: "6vh",

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
        ></TextField>
        <button
          onClick={handleClickedAskTag}
          ref={askTagButton}
          className={classes.askTagButton}
        >
          <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
        </button>
      </div>

      <ul className={classes.tagList}>
        {tags.map((tag, index) => {
          return (
            // <li key={index}>
            //   <span>{tag}</span>
            //   <button onClick={() => handleRemoveTag(index)}>X</button>
            // </li>
            <TagItem
              key={index}
              tag={tag}
              index={index}
              handleFn={handleRemoveTag}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default AskForm;
