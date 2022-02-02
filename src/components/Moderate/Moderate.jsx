import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase-config";
import { Button, Paper, Typography } from "@mui/material";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { ReactComponent as ReactLogo } from "../../assets/loadingAnimated.svg";
import FlaggedQuestion from "./FlaggedQuestion/FlaggedQuestion";
import { useStyles } from "./ModeratorStyles";

const Moderate = () => {
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
      limit(1)
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
      })
      .catch((error) => console.log(error));
    setLoading(false);
  }, []);

  function handleLoadMore() {
    setLoading(true);
    getDocs(
      query(
        collection(db, "questions"),
        orderBy("createdAt", "desc"),
        where("isFlagged", "==", true),
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
        setQuestionData([...questionData, ...nextSnapData]);
        setLastVisibleDoc(nextLastVisibleDoc);
      } else {
        setIsEmpty(true);
      }
    });
    setLoading(false);
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
      {loading && <ReactLogo />}
      {questionData && !loading && (
        <div className={classes.container}>
          <Typography variant="h5" marginTop="10px" color="#100d38">
            Moderate these questions
          </Typography>
          {questionData.map((flaggedQuestion) => {
            return (
              <FlaggedQuestion
                key={flaggedQuestion.id}
                flaggedQuestionData={flaggedQuestion}
              />
            );
          })}

          <Button
            onClick={handleLoadMore}
            variant="outlined"
            sx={{
              alignSelf: "flex-start",
              color: "black",
              border: "1px solid black",
            }}
          >
            Load More
          </Button>
          {isEmpty && (
            <Typography variant="h5">
              There are no more questions.Thank you for Moderating!
            </Typography>
          )}
        </div>
      )}
    </Paper>
  );
};

export default Moderate;
