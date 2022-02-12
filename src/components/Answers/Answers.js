import React, { useEffect, useState, useRef } from "react";
import { useLocation, useHistory } from "react-router-dom";
import {
  getDocs,
  collection,
  limit,
  query,
  orderBy,
  startAfter,
  Timestamp,
} from "firebase/firestore";
import { db, auth, createUserAnswer } from "../../firebase/firebase-config";
import Answer from "./Answer/Answer";

import {
  Paper,
  Card,
  TextField,
  Grid,
  CardContent,
  Avatar,
  CardHeader,
  Typography,
  CardActions,
  Button,
  Collapse,
  Container,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faArrowDown } from "@fortawesome/free-solid-svg-icons";

import { ReactComponent as ReactLogo } from "../../assets/loadingAnimated.svg";
import { getDateFromFirestoreTimestamp } from "../../com/functions";
import { useStyles } from "./AnswersStyles";

function Answers() {
  //////FUNCTIONALITY////////

  const location = useLocation();
  const history = useHistory(); // for back button functionality
  //this id is question id
  const {
    id,
    question,
    displayName,
    createdAt,
    reputation,
    clickedPositiveRep,
    clickedNegativeRep,
  } = location.state;

  const [answersData, setAnswersData] = useState(null);
  const [values, setValues] = useState({ yourAnswer: "" });
  const answerInput = useRef(null);
  const [error, setError] = useState("");
  const [toggleAskedAnswer, setToggleAskedAnswer] = useState(false);
  const [loading, setLoading] = useState(false);
  //integrating pagination using firebase api
  const [lastVisibleDoc, setLastVisibleDoc] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  //for styles
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const answersRef = query(
    collection(db, `questions/${id}/answers`),
    orderBy("createdAt"),
    limit(1)
  );

  useEffect(() => {
    console.log("use effect in answers triggered");
    setLoading(true);
    getDocs(answersRef)
      .then((snapshot) => {
        const isCollectionEmpty = snapshot.size === 0;
        if (!isCollectionEmpty) {
          const answersData = [];
          const lastDoc = snapshot.docs[snapshot.size - 1];
          setLastVisibleDoc(lastDoc);
          snapshot.forEach((doc) =>
            answersData.push({ id: doc.id, ...doc.data() })
          );
          setAnswersData(answersData);
          setIsEmpty(false);
        } else {
          setIsEmpty(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  }, [toggleAskedAnswer]);

  const loadMore = () => {
    setLoading(true);
    getDocs(
      query(
        collection(db, `questions/${id}/answers`),
        orderBy("createdAt"),
        startAfter(lastVisibleDoc),
        limit(1)
      )
    ).then((snapshot) => {
      const isCollectionEmpty = snapshot.size === 0;
      if (!isCollectionEmpty) {
        let nextAnswersData = [];
        const nextLastVisibleDoc = snapshot.docs[snapshot.size - 1];

        snapshot.forEach((doc) => {
          nextAnswersData.push({ id: doc.id, ...doc.data() });
        });
        setAnswersData([...answersData, ...nextAnswersData]);
        setLastVisibleDoc(nextLastVisibleDoc);
      } else {
        setIsEmpty(true);
      }
    });
    setLoading(false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleBack = () => {
    history.goBack();
  };

  const handleChange = (e) => {
    if (!auth.currentUser) {
      setError("Login to answer.");
      if (e.target.value === "") {
        setError("");
      }
    }
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (error) {
        return;
      }
      if (!values.yourAnswer || !answerInput.current.value) {
        setError("Enter an answer.");
        return;
      }
      await createUserAnswer(auth.currentUser, id, {
        answer: values.yourAnswer,
        question: question,
        questionId: id,
      });
    } catch (error) {
      console.log(error);
    }
    setToggleAskedAnswer(!toggleAskedAnswer);
    answerInput.current.value = "";
    setError("");
  };
  //-----------

  ////FUNCTIONALITY ENDS//////

  //UI BEGINS
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
          <Card sx={{ width: "100%", bgColor: "#fcf5e3", marginTop: "10px" }}>
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
                  {displayName.charAt(0)}
                </Avatar>
              }
              title={displayName}
              subheader={getDateFromFirestoreTimestamp(
                new Timestamp(createdAt.seconds, createdAt.nanoseconds) //just typing createdAt gave an error once you reload the page. This is probably because Timestamp object is not serialized.
              )}
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
              <Typography variant="h6" color="#100d38">
                {question}
              </Typography>
            </CardContent>
            <CardActions disableSpacing sx={{ p: "16px" }}>
              <Typography
                variant="body2"
                fontWeight="medium"
                width="30px"
                height="30px"
                marginLeft="4px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexShrink="0"
                bgcolor={
                  clickedPositiveRep
                    ? "#DFF2BF"
                    : clickedNegativeRep
                    ? "#FFD2D2"
                    : ""
                }
                border={
                  clickedPositiveRep
                    ? "1px solid #4F8A10"
                    : clickedNegativeRep
                    ? "1px solid #D8000C"
                    : "1px solid rgba(0, 0, 0, 0.6)"
                }
                borderRadius="50%"
              >
                {clickedPositiveRep
                  ? reputation + 1
                  : clickedNegativeRep
                  ? reputation - 1
                  : reputation}
              </Typography>
              <Button
                sx={{
                  marginLeft: "auto",

                  color: "black",
                  borderColor: "black",
                  minWidth: "maxContent",
                  whiteSpace: "noWrap",
                }}
                variant="outlined"
                expand={expanded ? 1 : 0}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="Expand to reply"
              >
                REPLY
              </Button>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
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

                {error && (
                  <Grid
                    item
                    xs={12}
                    sx={{ width: "25vw", mx: "auto", mb: "5vh" }}
                  >
                    <Typography
                      variant="subtitle1"
                      className={classes.errorText}
                    >
                      {error}
                    </Typography>
                  </Grid>
                )}
              </div>
            </Collapse>
          </Card>
        </div>
        {!isEmpty && (
          <div className={classes.arrowDownContainer}>
            <FontAwesomeIcon icon={faArrowDown} />
          </div>
        )}
        <div style={{ width: "100%", marginTop: "10px" }}>
          {loading && <ReactLogo />}
          {answersData &&
            answersData.map((answerData) => {
              return (
                <Answer
                  key={answerData.id}
                  answerData={answerData}
                  questionId={id}
                />
              );
            })}
          {loading && <ReactLogo />}
          {!loading && (
            <Container
              disableGutters
              sx={{
                display: "flex",
                mt: "20px",
                "@media (max-width:530px)": {
                  flexDirection: "column",
                },
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  marginRight: "10px",
                  color: "black",
                  borderColor: "black",
                  minWidth: "maxContent",
                  whiteSpace: "noWrap",
                  "@media (max-width:530px)": {
                    mr: "0px",
                    my: "5px",
                  },
                }}
                onClick={loadMore}
              >
                Load more
              </Button>
              <Button
                variant="outlined"
                sx={{
                  color: "black",
                  borderColor: "black",
                  minWidth: "maxContent",
                  whiteSpace: "noWrap",
                  "@media (max-width:530px)": {
                    mr: "0px",
                    my: "5px",
                  },
                }}
                onClick={handleBack}
              >
                Go Back
              </Button>
            </Container>
          )}
          {isEmpty && (
            <Typography variant="h5">There are no more answers.</Typography>
          )}
        </div>
      </div>
    </Paper>
  );
}

export default Answers;
