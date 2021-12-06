import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase-config";
import { collection, getDocs, query, limit } from "firebase/firestore";
import { Link } from "react-router-dom";

function Ask() {
  const [data, setData] = useState(null);
  const [docId, setDocId] = useState(null);

  useEffect(() => {
    const questionsRef = query(collection(db, "questions"), limit(2));

    getDocs(questionsRef)
      .then((snapshot) => {
        const snapData = [];
        const docId = [];
        snapshot.forEach((doc) => {
          snapData.push(doc.data());
          docId.push(doc.id);
        });
        setData(snapData);
        setDocId(docId);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div>
        {data &&
          docId &&
          data.map((obj, index) => {
            return (
              <div key={docId[index]}>
                <div>
                  {obj.question} by {obj.displayName}
                </div>
                <Link
                  to={{
                    pathname: "/Answer",
                    state: { id: docId[index], question: obj.question },
                  }}
                >
                  <button>Load answers</button>
                </Link>
              </div>
            );
          })}
      </div>
      <div></div>
    </>
  );
}

export default Ask;
