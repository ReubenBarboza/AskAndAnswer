import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getDocs, collection, limit, query } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import Answer from "./Answer/Answer";

function Answers() {
  const location = useLocation();
  //this id is question id
  const { id, question } = location.state;
  const [answersData, setAnswersData] = useState(null);
  const [values, setValues] = useState({ yourAnswer: "" });
  //const [answersId, setAnswersId] = useState(null);

  useEffect(() => {
    let mounted = true;
    console.log("use effect in answers triggered");
    const answersRef = query(
      collection(db, `questions/${id}/answers`),
      limit(2)
    );
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
  }, [id]);
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    //todo create userAnswer function
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
