import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { doc, increment, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";

const Question = ({ obj }) => {
  const [reputation, setReputation] = useState(0);
  const [isReputationLocallyUpdated, setIsReputationLocallyUpdated] =
    useState(false);

  const questionDocRef = doc(db, "questions", obj.id);
  //implementing reputation
  useEffect(() => {
    console.log("reputation useeffect fired");
    try {
      const update = async () => {
        await updateDoc(questionDocRef, {
          reputation: increment(reputation),
        });
        console.log("async ran");
      };
      if (isReputationLocallyUpdated) update();
    } catch (error) {
      console.log(error);
    }
  }, [isReputationLocallyUpdated]);

  return (
    <>
      <div key={obj.id}>
        {obj.question} by {obj.displayName}
        <button
          onClick={() => {
            setIsReputationLocallyUpdated(true);
            setReputation(1);
          }}
        >
          +
        </button>
        <span>{obj.reputation + reputation}</span>
        <button
          onClick={() => {
            setIsReputationLocallyUpdated(true);
            setReputation(-1);
          }}
        >
          -
        </button>
      </div>
      <Link
        to={{
          pathname: "/Answer",
          state: { id: obj.id, question: obj.question },
        }}
      >
        <button>Load answers</button>
      </Link>
    </>
  );
};

export default Question;
