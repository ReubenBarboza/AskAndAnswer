import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import {
  getDocs,
  collection,
  limit,
  query,
  orderBy,
  startAfter,
  updateDoc,
  increment,
  doc,
} from "firebase/firestore";
import { db, auth, createUserAnswer } from "../../firebase/firebase-config";
import Answer from "./Answer/Answer";

import {
  Paper,
  Card,
  IconButton,
  CardContent,
  Avatar,
  CardHeader,
  Typography,
  CardActions,
} from "@mui/material";
import { ReactComponent as ReactLogo } from "../../assets/loadingAnimated.svg";
import { getDateFromFirestoreTimestamp } from "../../com/functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";

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
    serverReputation,
    clickedPositiveRep,
    clickedNegativeRep,
  } = location.state;
  const [answersData, setAnswersData] = useState(null);
  const [values, setValues] = useState({ yourAnswer: "" });
  const [toggleAskedAnswer, setToggleAskedAnswer] = useState(false);
  const [loading, setLoading] = useState(false);
  //integrating pagination using firebase api
  const [lastVisibleDoc, setLastVisibleDoc] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);

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
        const answersData = [];
        const lastDoc = snapshot.docs[snapshot.size - 1];
        setLastVisibleDoc(lastDoc);
        // const answersIdArr = [];
        snapshot.forEach((doc) =>
          answersData.push({ id: doc.id, ...doc.data() })
        );
        //snapshot.forEach((doc) => answersIdArr.push(doc.id));
        setAnswersData(answersData);
        //setAnswersId(answersIdArr);
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

  const handleBack = () => {
    history.goBack();
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserAnswer(auth.currentUser, id, {
        answer: values.yourAnswer,
      });
    } catch (error) {
      console.log(error);
    }
    setToggleAskedAnswer(!toggleAskedAnswer);
  };
  //-----------

  ////FUNCTIONALITY ENDS//////

  //UI BEGINS
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
      <Card sx={{ width: "100%", bgColor: "#fcf5e3", marginY: "10px" }}>
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
          subheader={getDateFromFirestoreTimestamp(createdAt)}
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
            {question}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Typography
            variant="body2"
            fontWeight="medium"
            width="30px"
            height="30px"
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
                : ""
            }
            borderRadius="50%"
          >
            {clickedPositiveRep
              ? serverReputation + 1
              : clickedNegativeRep
              ? serverReputation - 1
              : serverReputation}
          </Typography>
        </CardActions>
      </Card>
      <div>
        <label htmlFor="yourAnswer" aria-label="Your answer to the question">
          Your answer
        </label>
        <textarea
          name="yourAnswer"
          rows="4"
          cols="50"
          onChange={handleChange}
        ></textarea>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div>
        {!answersData && <h1>Loading...</h1>}
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
        {!loading && <button onClick={loadMore}>Load more</button>}
        {!loading && <button onClick={handleBack}>Go Back</button>}
        {isEmpty && <h1>There are no more answers.</h1>}
      </div>
    </Paper>
  );
}

export default Answers;
