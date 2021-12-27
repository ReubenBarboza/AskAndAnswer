import React, { useEffect, useState } from "react";
import Question from "./Question/Question";
import { db } from "../../firebase/firebase-config";
import { auth, createUserQuestion } from "../../firebase/firebase-config";
import {
  collection,
  getDocs,
  query,
  limit,
  orderBy,
  startAfter,
} from "firebase/firestore";

function Ask() {
  //Question input from form.
  const [values, setValues] = useState({ question: "" });
  //To update ui after asking a question.
  const [toggleAskedQuestion, setToggleAskedQuestion] = useState(false);
  //main question data to be displayed
  const [data, setData] = useState(null);
  //integrating pagination using firebase api
  const [lastVisibleDoc, setLastVisibleDoc] = useState(null);

  const [loading, setLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    console.log("question use effect fired");
    //reading questions
    const questionsRef = query(
      collection(db, "questions"),
      orderBy("createdAt", "desc"),
      orderBy("reputation", "desc"),
      limit(1)
    );
    setLoading(true);
    getDocs(questionsRef)
      .then((snapshot) => {
        const snapData = [];
        const lastVisibleDoc = snapshot.docs[snapshot.size - 1];
        setLastVisibleDoc(lastVisibleDoc);

        snapshot.forEach((doc) => {
          snapData.push({ id: doc.id, ...doc.data() });
        });
        setData(snapData);
      })
      .catch((error) => console.log(error));
    setLoading(false);
  }, [toggleAskedQuestion]);

  //pagination
  const loadMore = () => {
    setLoading(true);
    getDocs(
      query(
        collection(db, "questions"),
        orderBy("createdAt", "desc"),
        orderBy("reputation", "desc"),
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
        setData([...data, ...nextSnapData]);
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
        {!data && <h1>Loading...</h1>}
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
        {loading && <h1>Loading...</h1>}
        {!loading && <button onClick={loadMore}>Load more</button>}
        {isEmpty && <h1>There are no more questions.</h1>}
      </div>
    </>
  );
}

export default Ask;
