import React, { useEffect, useState } from "react";
import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import Question from "../Question/Question";
import { ReactComponent as ReactLogo } from "../../../assets/loadingAnimated.svg";
import {
  collection,
  getDocs,
  limit,
  query,
  startAfter,
  where,
} from "firebase/firestore";

import { useLocation, useHistory } from "react-router-dom";
import { db } from "../../../firebase/firebase-config";
const SearchAsk = () => {
  const location = useLocation();
  const searchArray = location.state;
  const history = useHistory();
  const [searchData, setSearchData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastVisibleDoc, setLastVisibleDoc] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    const questionsRef = query(
      collection(db, "questions"),
      where("tags", "array-contains-any", searchArray),
      limit(2)
    );
    setLoading(true);
    getDocs(questionsRef)
      .then((snapshot) => {
        console.log("inside search async");
        const snapData = [];
        const lastVisibleDoc = snapshot.docs[snapshot.size - 1];
        setLastVisibleDoc(lastVisibleDoc);

        snapshot.forEach((doc) => {
          snapData.push({ id: doc.id, ...doc.data() });
        });
        setSearchData(snapData);
        if (snapshot.size === 0) {
          setIsEmpty(true);
          return;
        }
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const loadMore = () => {
    if (!isEmpty) {
      setLoading(true);
      getDocs(
        query(
          collection(db, "questions"),
          where("tags", "array-contains-any", searchArray),
          startAfter(lastVisibleDoc),
          limit(2)
        )
      ).then((snapshot) => {
        const isCollectionEmpty = snapshot.size === 0;
        if (!isCollectionEmpty) {
          let nextSnapData = [];
          const nextLastVisibleDoc = snapshot.docs[snapshot.size - 1];
          snapshot.forEach((doc) => {
            nextSnapData.push({ id: doc.id, ...doc.data() });
          });
          setSearchData([...searchData, ...nextSnapData]);
          setLastVisibleDoc(nextLastVisibleDoc);
        } else {
          setIsEmpty(true);
        }
      });
      setLoading(false);
    }
  };
  const handleBack = () => {
    history.goBack();
  };
  return (
    <Paper
      elevation={8}
      sx={{
        width: "100%",
        minHeight: "83vh",
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#e6e6e6",
      }}
    >
      <Container>
        <div style={{ width: "100%" }}>
          {!searchData && <ReactLogo />}
          {searchData &&
            searchData.map((obj) => {
              return <Question key={obj.id} obj={obj} />;
            })}

          {!loading && (
            <Container
              disableGutters
              sx={{
                display: "flex",
                mt: "20px",
                mb: "10px",
                "@media (max-width:530px)": {
                  flexDirection: "column",
                },
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  mr: "10px",
                  mt: "10px",
                  color: "black",
                  borderColor: "black",
                  minWidth: "maxContent",
                  whiteSpace: "noWrap",
                  "@media (max-width:530px)": {
                    width: "100%",
                  },
                }}
                onClick={loadMore}
              >
                Load more
              </Button>
              <Button
                variant="outlined"
                sx={{
                  mr: "10px",
                  mt: "10px",
                  color: "black",
                  borderColor: "black",
                  minWidth: "maxContent",
                  whiteSpace: "noWrap",
                  "@media (max-width:530px)": {
                    mr: "0px",
                    my: "5px",
                  },
                }}
                onClick={handleBack}
              >
                Go Back
              </Button>
            </Container>
          )}
          {isEmpty && (
            <Typography variant="h5" my="10px">
              There are no more questions.
            </Typography>
          )}
        </div>
      </Container>
    </Paper>
  );
};

export default SearchAsk;
