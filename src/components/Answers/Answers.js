import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  getDocs,
  collection,
  limit,
  query,
  orderBy,
  startAfter,
} from "firebase/firestore";
import { db, auth, createUserAnswer } from "../../firebase/firebase-config";
import Answer from "./Answer/Answer";

import { Paper } from "@mui/material";
import { ReactComponent as ReactLogo } from "../../assets/loadingAnimated.svg";

function getDateFromFirestoreTimestamp(timestamp) {
  function ordinalSuffixOf(i) {
    var j = i % 10,
      k = i % 100;
    if (j === 1 && k !== 11) {
      return "st";
    }
    if (j === 2 && k !== 12) {
      return "nd";
    }
    if (j === 3 && k !== 13) {
      return "rd";
    }
    return "th";
  }
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return `${timestamp.toDate().getDate()}${ordinalSuffixOf(
    timestamp.toDate().getDate()
  )} ${monthNames[timestamp.toDate().getMonth()]}, ${timestamp
    .toDate()
    .getFullYear()}`;
}

function Answers() {
  const location = useLocation();
  //this id is question id
  const { id, question, displayName, createdAt } = location.state;
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
      <div>
        {question} by {displayName} on{" "}
        {getDateFromFirestoreTimestamp(createdAt)}
      </div>
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
        {isEmpty && <h1>There are no more answers.</h1>}
      </div>
    </Paper>
  );
}

export default Answers;
