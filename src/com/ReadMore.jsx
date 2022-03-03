import React, { useState } from "react";

const ReadMore = ({ content }) => {
  const [readMore, setReadMore] = useState(true);
  return (
    <>
      {readMore && content.length > 200
        ? content.substring(0, 200).concat("...")
        : content}
      {readMore
        ? content.length > 200 && (
            <button
              style={{
                fontSize: "12px",
                marginLeft: "5px",
                cursor: "pointer",
              }}
              onClick={() => setReadMore(!readMore)}
            >
              Read more
            </button>
          )
        : content.length > 200 && (
            <button
              style={{
                fontSize: "12px",
                marginLeft: "5px",
                cursor: "pointer",
              }}
              onClick={() => setReadMore(!readMore)}
            >
              Read less
            </button>
          )}
    </>
  );
};

export default ReadMore;
