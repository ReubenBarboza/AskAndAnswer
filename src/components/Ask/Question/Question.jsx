import React from "react";
import { Link } from "react-router-dom";

const Question = ({ obj }) => {
  return (
    <div>
      {/* concatenating id with displayname to distinguish between parent key */}
      <div key={obj.id + obj.displayName}>
        {obj.question} by {obj.displayName}
      </div>
      <Link
        to={{
          pathname: "/Answer",
          state: { id: obj.id, question: obj.question },
        }}
      >
        <button>Load answers</button>
      </Link>
    </div>
  );
};

export default Question;
