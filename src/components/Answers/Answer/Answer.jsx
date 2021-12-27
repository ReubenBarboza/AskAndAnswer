import React, { useState, useEffect } from "react";
import { db } from "../../../firebase/firebase-config";
import { doc, updateDoc, increment } from "firebase/firestore";

const Answer = ({ answerData, questionId }) => {
  const [reputation, setReputation] = useState(0);
  const [isReputationLocallyUpdated, setIsReputationLocallyUpdated] =
    useState(false);

  const answerDocRef = doc(
    db,
    `questions/${questionId}/answers/${answerData.id}`
  );
  //implementing reputation
  useEffect(() => {
    console.log("answer reputation useeffect fired");
    try {
      const update = async () => {
        await updateDoc(answerDocRef, {
          reputation: increment(reputation), //+1 or -1
        });
        console.log("async ran");
      };
      if (isReputationLocallyUpdated) update();
    } catch (error) {
      console.log(error);
    }
  }, [isReputationLocallyUpdated]);

  return (
    <div>
      {answerData.answer} by {answerData.displayName}
      <button
        onClick={() => {
          setIsReputationLocallyUpdated(true);
          setReputation(1);
        }}
      >
        +
      </button>
      <span>{answerData.reputation + reputation}</span>
      <button
        onClick={() => {
          setIsReputationLocallyUpdated(true);
          setReputation(-1);
        }}
      >
        -
      </button>
    </div>
  );
};

export default Answer;
