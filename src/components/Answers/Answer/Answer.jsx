import React from "react";

const Answer = ({ answerData }) => {
  return (
    <div>
      {answerData.answer} by {answerData.displayName}
    </div>
  );
};

export default Answer;
