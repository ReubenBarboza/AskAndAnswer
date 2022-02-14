import React, { useEffect, useState, useRef } from "react";
import Question from "./Question/Question";
import { db } from "../../firebase/firebase-config";
import { auth, createUserQuestion } from "../../firebase/firebase-config";
import {
  collection,
  getDocs,
  query,
  limit,
  orderBy,
  startAfter,
} from "firebase/firestore";
import { Button, Paper, TextField, Typography, Grid } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useStyles } from "./AskStyles";
import { ReactComponent as ReactLogo } from "../../assets/loadingAnimated.svg";

function Ask() {
  //Question input from form.
  const [values, setValues] = useState({ question: "" });
  const [error, setError] = useState("");
  const questionInput = useRef(null);

  //To update ui after asking a question.
  const [toggleAskedQuestion, setToggleAskedQuestion] = useState(false);
  //main question data to be displayed
  const [data, setData] = useState(null);
  //integrating pagination using firebase api
  const [lastVisibleDoc, setLastVisibleDoc] = useState(null);

  const [loading, setLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  //muistyles
  const classes = useStyles();

  useEffect(() => {
    console.log("question use effect fired");
    //reading questions
    const questionsRef = query(
      collection(db, "questions"),
      orderBy("createdAt", "desc"),
      orderBy("reputation", "desc"),
      limit(1)
    );
    setLoading(true);

    if (!error) {
      getDocs(questionsRef)
        .then((snapshot) => {
          console.log("inside question async");
          const snapData = [];
          const lastVisibleDoc = snapshot.docs[snapshot.size - 1];
          setLastVisibleDoc(lastVisibleDoc);

          snapshot.forEach((doc) => {
            snapData.push({ id: doc.id, ...doc.data() });
          });
          setData(snapData);
          if (snapshot.size === 0) {
            setIsEmpty(true);
            return;
          }
          setLoading(false);
        })
        .catch((error) => console.log(error));
    }
  }, [toggleAskedQuestion]);

  // //pagination
  const loadMore = () => {
    if (!isEmpty) {
      setLoading(true);
      getDocs(
        query(
          collection(db, "questions"),
          orderBy("createdAt", "desc"),
          orderBy("reputation", "desc"),
          startAfter(lastVisibleDoc),
          limit(1)
        )
      ).then((snapshot) => {
        const isCollectionEmpty = snapshot.size === 0;
        if (!isCollectionEmpty) {
          let nextSnapData = [];
          const nextLastVisibleDoc = snapshot.docs[snapshot.size - 1];
          snapshot.forEach((doc) => {
            nextSnapData.push({ id: doc.id, ...doc.data() });
          });
          setData([...data, ...nextSnapData]);
          setLastVisibleDoc(nextLastVisibleDoc);
        } else {
          setIsEmpty(true);
        }
      });
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    if (!auth.currentUser) {
      setError("Login to ask a question.");
      if (e.target.value === "") {
        setError("");
      }
      return;
    }

    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (error) {
        return;
      }
      if (!values.question || !questionInput.current.value) {
        setError("Enter a question.");
        return;
      }
      await createUserQuestion(auth.currentUser, { question: values.question });
    } catch (error) {
      console.log(error);
    }
    setToggleAskedQuestion(!toggleAskedQuestion);
    questionInput.current.value = "";
    setError("");
  };

  return (
    <Paper
      elevation={8}
      sx={{
        width: "100%",
        minHeight: "83vh",
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#e6e6e6",
      }}
    >
      <div className={classes.aboveQuestionContainer}>
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
              height: "10vh",
              marginTop: "25px",
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
          <br />
        </div>
        {error && (
          <Grid item xs={12} sx={{ width: "25vw", mx: "auto", mb: "5vh" }}>
            <Typography variant="subtitle1" className={classes.errorText}>
              {error}
            </Typography>
          </Grid>
        )}

        <div style={{ width: "100%" }}>
          {!data && <ReactLogo />}
          {data &&
            data.map((obj) => {
              return <Question key={obj.id} obj={obj} />;
            })}

          {!loading && (
            <Button
              variant="outlined"
              sx={{
                marginY: "10px",
                color: "black",
                borderColor: "black",
                minWidth: "maxContent",
                whiteSpace: "noWrap",
                "@media (max-width:530px)": {
                  width: "100%",
                },
              }}
              onClick={loadMore}
            >
              Load more
            </Button>
          )}
          {isEmpty && (
            <Typography variant="h5" my="10px">
              There are no more questions.
            </Typography>
          )}
        </div>
      </div>
    </Paper>
  );
}

export default Ask;
