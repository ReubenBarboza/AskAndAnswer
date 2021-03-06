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
import { Button, Paper, Typography, Grid } from "@mui/material";
import { useStyles } from "./AskStyles";
import { ReactComponent as ReactLogo } from "../../assets/loadingAnimated.svg";
import AskForm from "./AskForm";

function Ask() {
  //Question input from form.
  const [values, setValues] = useState({ question: "" });
  const [tags, setTags] = useState([]);
  const [error, setError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
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
      limit(4)
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
  }, []);

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
          limit(4)
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
    if (submitSuccess) {
      setSubmitSuccess("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (error === "Login to ask a question.") {
        return;
      }
      if (!values.question || !questionInput.current.value) {
        setError("Enter a question.");
        return;
      } else {
        setError("");
      }
      if (tags.length === 0) {
        setError("Enter some tags");
        return;
      } else if (tags.length > 5) {
        setError("Number of tags must be less than 5");
        return;
      } else {
        setError("");
      }

      await createUserQuestion(auth.currentUser, {
        question: values.question,
        tags: tags,
      });
    } catch (error) {
      console.log(error);
    }
    setToggleAskedQuestion(!toggleAskedQuestion);
    setSubmitSuccess("Question Submitted!");
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
        <AskForm
          questionInput={questionInput}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          tags={tags}
          setTags={setTags}
        />
        {submitSuccess && !error && (
          <Grid item xs={12} sx={{ width: "25vw", mx: "auto", my: "3vh" }}>
            <Typography variant="subtitle1" className={classes.successText}>
              {submitSuccess}
            </Typography>
          </Grid>
        )}

        {error && (
          <Grid item xs={12} sx={{ width: "25vw", mx: "auto", my: "3vh" }}>
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
                mt: "10px",
                mb: "20px",
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
