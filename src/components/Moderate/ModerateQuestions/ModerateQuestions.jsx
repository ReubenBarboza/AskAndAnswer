import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/firebase-config";
import { Button, Container, Paper, Typography } from "@mui/material";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { ReactComponent as ReactLogo } from "../../../assets/loadingAnimated.svg";
import FlaggedQuestion from "./FlaggedQuestion/FlaggedQuestion";
import { useStyles } from "./ModeratorStyles";
import { Link } from "react-router-dom";

const ModerateQuestions = () => {
  const [loading, setLoading] = useState(false);
  const [questionData, setQuestionData] = useState(null);

  //integrating pagination using firebase api
  const [lastVisibleDoc, setLastVisibleDoc] = useState(null);

  const [isEmpty, setIsEmpty] = useState(false);

  //styles
  const classes = useStyles();
  useEffect(() => {
    const flaggedQuestionsRef = query(
      collection(db, "questions"),
      orderBy("createdAt", "desc"),
      where("isFlagged", "==", true),
      limit(4)
    );
    setLoading(true);

    getDocs(flaggedQuestionsRef)
      .then((snapshot) => {
        console.log("inside flaggedquestion async");
        const snapData = [];
        const lastVisibleDoc = snapshot.docs[snapshot.size - 1];
        setLastVisibleDoc(lastVisibleDoc);
        snapshot.forEach((doc) => {
          snapData.push({ id: doc.id, ...doc.data() });
        });
        setQuestionData(snapData);
        if (snapshot.size === 0) {
          setIsEmpty(true);
          return;
        }
      })
      .catch((error) => console.log(error));
    setLoading(false);
  }, []);

  const handleLoadMore = () => {
    if (!isEmpty) {
      setLoading(true);
      getDocs(
        query(
          collection(db, "questions"),
          where("isFlagged", "==", true),
          orderBy("createdAt", "desc"),
          startAfter(lastVisibleDoc),
          limit(4)
        )
      )
        .then((snapshot) => {
          const isCollectionEmpty = snapshot.size === 0;
          if (!isCollectionEmpty) {
            let nextSnapData = [];
            const nextLastVisibleDoc = snapshot.docs[snapshot.size - 1];
            snapshot.forEach((doc) => {
              nextSnapData.push({ id: doc.id, ...doc.data() });
            });
            setQuestionData([...questionData, ...nextSnapData]);
            setLastVisibleDoc(nextLastVisibleDoc);
          } else {
            setIsEmpty(true);
          }
        })
        .catch((error) => console.log(error));
      setLoading(false);
    }
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
      <div className={classes.ModerateQuestionContainer}>
        {!questionData && <ReactLogo />}
        <Typography variant="h5" marginTop="10px" color="#100d38">
          Moderate these questions
        </Typography>
        {questionData &&
          questionData.map((flaggedQuestion) => {
            return (
              <FlaggedQuestion
                key={flaggedQuestion.id}
                flaggedQuestionData={flaggedQuestion}
              />
            );
          })}
        {loading && <ReactLogo />}
        {!loading && (
          <Container
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              mt: "10px",
              mb: "20px",
              width: "100%",
              "@media (max-width:530px)": {
                flexDirection: "column",
              },
            }}
          >
            {!isEmpty && (
              <Button
                onClick={handleLoadMore}
                variant="outlined"
                sx={{
                  color: "black",
                  mr: "10px",

                  border: "1px solid black",
                  "@media (max-width:530px)": {
                    mb: "10px",
                    mr: "0px",
                  },
                }}
              >
                Load More
              </Button>
            )}
            <Link style={{ textDecoration: "none" }} to="/ModerateAnswers">
              <Button
                variant="outlined"
                sx={{
                  color: "black",
                  border: "1px solid black",
                  width: "100%",
                }}
              >
                Moderate Answers
              </Button>
            </Link>
          </Container>
        )}
        {isEmpty && (
          <Typography mb="20px" variant="h5">
            There are no more questions.Thank you for Moderating!
          </Typography>
        )}
      </div>
    </Paper>
  );
};

export default ModerateQuestions;
