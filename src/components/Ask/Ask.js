import React, { useEffect, useState } from "react";
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

import {
  Avatar,
  Button,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faThumbsUp,
  faThumbsDown,
} from "@fortawesome/free-solid-svg-icons";
import { useStyles } from "./AskStyles";
import { ReactComponent as ReactLogo } from "../../assets/loadingAnimated.svg";

import { Card } from "@mui/material";

function Ask() {
  //Question input from form.
  const [values, setValues] = useState({ question: "" });
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
    getDocs(questionsRef)
      .then((snapshot) => {
        const snapData = [];
        const lastVisibleDoc = snapshot.docs[snapshot.size - 1];
        setLastVisibleDoc(lastVisibleDoc);

        snapshot.forEach((doc) => {
          snapData.push({ id: doc.id, ...doc.data() });
        });
        setData(snapData);
      })
      .catch((error) => console.log(error));
    setLoading(false);
  }, [toggleAskedQuestion]);

  // //pagination
  const loadMore = () => {
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
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUserQuestion(auth.currentUser, { question: values.question });
    setToggleAskedQuestion(!toggleAskedQuestion);
  };

  return (
    <Paper
      elevation={8}
      sx={{
        width: "95vw",
        height: "83vh",
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        overflowY: "auto",
        alignItems: "center",
        backgroundColor: "#e6e6e6",
      }}
    >
      <div className={classes.aboveQuestionContainer}>
        <div className={classes.questionContainer}>
          {/* <label htmlFor="question" aria-label="Ask a question">
          Ask a Question
        </label>
        <textarea
          name="question"
          rows="4"
          cols="50"
          onChange={handleChange}
        ></textarea> */}
          <TextField
            aria-label="Ask a question"
            placeholder="Ask a question"
            variant="standard"
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
        </div>
        <div style={{ width: "100%" }}>
          {!data && <ReactLogo />}
          {data &&
            data.map((obj) => {
              return <Question key={obj.id} obj={obj} />;
            })}
          {/* <Card sx={{ width: "100%", bgColor: "#fcf5e3" }}>
            <CardHeader
              sx={{
                position: "relative",
                "& ::after": {
                  content: '""',
                  background: "#f0f0f0",
                  position: "absolute",
                  bottom: "-1px",
                  left: "25%",
                  width: "50%",
                  height: "1px",
                },
              }}
              avatar={
                <Avatar sx={{ bgcolor: "#100d38" }} aria-label="Question">
                  J
                </Avatar>
              }
              title="jacob"
              subheader="September 14, 2016"
            />
            <CardContent
              sx={{
                position: "relative",
                "& ::after": {
                  content: '""',
                  background: "#f0f0f0",
                  position: "absolute",
                  bottom: "-1px",
                  left: "25%",
                  width: "50%",
                  height: "1px",
                },
              }}
            >
              <Typography variant="h5" color="#100d38">
                test
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton sx={{ mx: "4px" }}>
                <FontAwesomeIcon icon={faThumbsUp} />
              </IconButton>
              <Typography variant="body2">3</Typography>
              <IconButton sx={{ mx: "4px" }}>
                <FontAwesomeIcon icon={faThumbsDown} />
              </IconButton>
              <Button
                variant="outlined"
                sx={{
                  marginLeft: "auto",
                  minWidth: "maxContent",
                  whiteSpace: "noWrap",
                  color: "black",
                  borderColor: "black",
                }}
              >
                See Answers
              </Button>
            </CardActions>
          </Card> */}
          {loading && <ReactLogo />}
          {!loading && (
            <Button
              variant="outlined"
              sx={{
                marginY: "10px",
                color: "black",
                borderColor: "black",
                minWidth: "maxContent",
                whiteSpace: "noWrap",
              }}
              onClick={loadMore}
            >
              Load more
            </Button>
          )}
          {isEmpty && <h1>There are no more questions.</h1>}
        </div>
      </div>
    </Paper>
  );
}

export default Ask;
