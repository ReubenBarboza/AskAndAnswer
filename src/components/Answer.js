import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getDocs, collection, limit, query } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

function Answer() {
  const location = useLocation();
  const { id, question } = location.state;
  const [answers, setAnswers] = useState(null);
  const [answersId, setAnswersId] = useState(null);

  useEffect(() => {
    console.log("use effect in answers triggered");
    const answersRef = query(
      collection(db, `questions/${id}/answers`),
      limit(2)
    );
    getDocs(answersRef).then((snapshot) => {
      const answersArr = [];
      const answersIdArr = [];
      snapshot.forEach((doc) => answersArr.push(doc.data().answer));
      snapshot.forEach((doc) => answersIdArr.push(doc.id));
      setAnswers(answersArr);
      setAnswersId(answersIdArr);
    });
  }, []);
  return (
    <div>
      <div>{question}</div>
      <div>
        {answers &&
          answersId &&
          answers.map((answer, index) => {
            return <div key={answersId[index]}>{answer}</div>;
          })}
      </div>
    </div>
  );
}

export default Answer;
