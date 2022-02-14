import React, { useEffect, useState } from "react";
import { Button, Container, Paper, Typography } from "@mui/material";
import { db } from "../../../firebase/firebase-config";
import {
  collectionGroup,
  getDocs,
  limit,
  query,
  where,
  orderBy,
  startAfter,
} from "firebase/firestore";
import { ReactComponent as ReactLogo } from "../../../assets/loadingAnimated.svg";
import FlaggedAnswer from "./FlaggedAnswer/FlaggedAnswer";
import { Link } from "react-router-dom";

const ModerateAnswers = () => {
  const [loading, setLoading] = useState(false);
  const [answerData, setAnswerData] = useState(null);

  //integrating pagination using firebase api
  const [lastVisibleDoc, setLastVisibleDoc] = useState(null);

  const [isEmpty, setIsEmpty] = useState(false);
  useEffect(() => {
    const flaggedAnswersRef = query(
      collectionGroup(db, "answers"),
      where("isFlagged", "==", true),
      orderBy("createdAt", "asc"),
      limit(1)
    );
    setLoading(true);
    getDocs(flaggedAnswersRef)
      .then((snapshot) => {
        console.log("inside flaggedanswers async");
        const snapData = [];
        const lastVisibleDoc = snapshot.docs[snapshot.size - 1];
        setLastVisibleDoc(lastVisibleDoc);
        snapshot.forEach((flaggedAnswer) => {
          snapData.push({
            id: flaggedAnswer.id,
            ...flaggedAnswer.data(),
          });
        });
        setAnswerData(snapData);
        if (snapshot.size === 0) {
          setIsEmpty(true);
          return;
        }
      })
      .catch((error) => console.log(error));
    setLoading(false);
  }, []);

  function handleLoadMore() {
    if (!isEmpty) {
      setLoading(true);
      getDocs(
        query(
          collectionGroup(db, "answers"),
          where("isFlagged", "==", true),
          orderBy("createdAt", "asc"),
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
          setAnswerData([...answerData, ...nextSnapData]);
          setLastVisibleDoc(nextLastVisibleDoc);
        } else {
          setIsEmpty(true);
        }
      });
      setLoading(false);
    }
  }
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
      <Container
        disableGutters
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          minWidth: "75%",
        }}
      >
        {!answerData && <ReactLogo />}
        <Typography variant="h5" marginTop="10px" color="#100d38">
          Moderate these answers
        </Typography>
        {answerData &&
          answerData.map((flaggedAnswerData) => {
            return (
              <FlaggedAnswer
                key={flaggedAnswerData.id}
                flaggedAnswerData={flaggedAnswerData}
              />
            );
          })}
        {loading && <ReactLogo />}
        {!loading && (
          <Container
            sx={{
              display: "flex",
              mt: "20px",
              "@media (max-width:530px)": {
                flexDirection: "column",
              },
            }}
          >
            <Button
              onClick={handleLoadMore}
              variant="outlined"
              sx={{
                color: "black",
                mr: "10px",
                border: "1px solid black",
                "@media (max-width:530px)": {
                  mr: "0px",
                  mb: "10px",
                },
              }}
            >
              Load More
            </Button>
            {/* Back link*/}
            <Link style={{ textDecoration: "none" }} to="/ModerateQuestions">
              <Button
                variant="outlined"
                sx={{
                  color: "black",
                  border: "1px solid black",
                  width: "100%",
                }}
              >
                Go Back
              </Button>
            </Link>
          </Container>
        )}
        {isEmpty && (
          <Typography variant="h5" my="10px">
            There are no more answers.Thank you for Moderating!
          </Typography>
        )}
      </Container>
    </Paper>
  );
};

export default ModerateAnswers;
