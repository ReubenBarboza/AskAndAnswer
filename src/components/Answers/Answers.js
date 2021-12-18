import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getDocs, collection, limit, query, orderBy } from "firebase/firestore";
import { db, auth, createUserAnswer } from "../../firebase/firebase-config";
import Answer from "./Answer/Answer";

function Answers() {
  const location = useLocation();
  //this id is question id
  const { id, question } = location.state;
  const [answersData, setAnswersData] = useState(null);
  const [values, setValues] = useState({ yourAnswer: "" });
  const [toggleAskedAnswer, setToggleAskedAnswer] = useState(false);
  //const [answersId, setAnswersId] = useState(null);

  const answersRef = query(
    collection(db, `questions/${id}/answers`),
    orderBy("createdAt")
  );

  useEffect(() => {
    let mounted = true;
    console.log("use effect in answers triggered");

    getDocs(answersRef)
      .then((snapshot) => {
        if (mounted) {
          const answersData = [];
          // const answersIdArr = [];
          snapshot.forEach((doc) =>
            answersData.push({ id: doc.id, ...doc.data() })
          );
          //snapshot.forEach((doc) => answersIdArr.push(doc.id));
          setAnswersData(answersData);
          //setAnswersId(answersIdArr);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return () => (mounted = false);
  }, [toggleAskedAnswer]);
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
    <div>
      <div>{question}</div>
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
        {answersData &&
          answersData.map((answerData) => {
            return <Answer key={answerData.id} answerData={answerData} />;
          })}
      </div>
    </div>
  );
}

export default Answers;
