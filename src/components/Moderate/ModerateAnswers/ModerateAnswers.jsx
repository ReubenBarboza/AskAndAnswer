import React, { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import { db } from "../../../firebase/firebase-config";
import {
  collectionGroup,
  getDocs,
  collection,
  limit,
  query,
  where,
  orderBy,
  startAfter,
  Timestamp,
} from "firebase/firestore";

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

        snapshot.forEach((doc) => {
          snapData.push({ id: doc.id, ...doc.data() });
        });
        setAnswerData(snapData);
      })
      .catch((error) => console.log(error));
    setLoading(false);
  }, []);
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
      {console.log(answerData)}
    </Paper>
  );
};

export default ModerateAnswers;
