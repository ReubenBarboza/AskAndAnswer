import React, { useEffect, useState } from "react";
import Question from "./Question/Question";
import { db } from "../../firebase/firebase-config";
import { auth, createUserQuestion } from "../../firebase/firebase-config";
import { collection, getDocs, query, limit, orderBy } from "firebase/firestore";

function Ask() {
  const [values, setValues] = useState({ question: "" });
  const [toggleAskedQuestion, setToggleAskedQuestion] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log("question use effect fired");
    //reading questions
    const questionsRef = query(
      collection(db, "questions"),
      orderBy("createdAt", "desc")
    );
    getDocs(questionsRef)
      .then((snapshot) => {
        const snapData = [];
        // const docId = [];
        snapshot.forEach((doc) => {
          snapData.push({ id: doc.id, ...doc.data() });
          // docId.push(doc.id);
        });
        setData(snapData);
        // setDocId(docId);
      })
      .catch((error) => console.log(error));
  }, [toggleAskedQuestion]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUserQuestion(auth.currentUser, { question: values.question });
    setToggleAskedQuestion(!toggleAskedQuestion);
  };

  return (
    <>
      <div>
        <label htmlFor="question" aria-label="Ask a question">
          Ask a Question
        </label>
        <textarea
          name="question"
          rows="4"
          cols="50"
          onChange={handleChange}
        ></textarea>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div>
        {data &&
          data.map((obj) => {
            return (
              // <div key={docId[index]}>
              //   <div key={docId[index]}>
              //     {obj.question} by {obj.displayName}
              //   </div>
              //   <Link

              //     to={{
              //       pathname: "/Answer",
              //       state: { id: docId[index], question: obj.question },
              //     }}
              //   >
              //     <button >Load answers</button>
              //   </Link>
              // </div>
              <Question key={obj.id} obj={obj} />
            );
          })}
      </div>
    </>
  );
}

export default Ask;
