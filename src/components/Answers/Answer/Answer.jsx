import React, { useState, useEffect } from "react";
import { db } from "../../../firebase/firebase-config";
import { doc, updateDoc, increment, Timestamp } from "firebase/firestore";
import { getDateFromFirestoreTimestamp } from "../../../com/functions";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Answer = ({ answerData, questionId }) => {
  const [reputation, setReputation] = useState(0);

  //to handle reputation when user clicks dislike after liking and vice versa.
  const [clickedPositiveRep, setClickedPositiveRep] = useState(false);
  const [clickedNegativeRep, setClickedNegativeRep] = useState(false);
  const [wasPositiveRep, setWasPositiveRep] = useState(false);
  const [wasNegativeRep, setWasNegativeRep] = useState(false);

  const answerDocRef = doc(
    db,
    `questions/${questionId}/answers/${answerData.id}`
  );
  //implementing reputation
  useEffect(() => {
    console.log("answer reputation useeffect fired");
    try {
      const update = async (reputation) => {
        await updateDoc(answerDocRef, {
          reputation: increment(reputation), //+1 or -1 first then -2 or +2 after changing opinions
        });
        console.log("async ran");
      };
      if (clickedPositiveRep && wasPositiveRep && !wasNegativeRep) {
        //this will execute only on first click
        update(reputation); //+1
      } else if (wasPositiveRep && clickedNegativeRep) {
        update(reputation - 1); //-2
      } else if (clickedNegativeRep && !wasPositiveRep && wasNegativeRep) {
        //this will execute only on first click
        update(reputation); //-1
      } else if (wasNegativeRep && clickedPositiveRep) {
        update(reputation + 1); //+2
      }
    } catch (error) {
      console.log(error);
    }
  }, [
    clickedPositiveRep,
    clickedNegativeRep,
    wasPositiveRep,
    wasNegativeRep,
    reputation,
  ]);

  return (
    <Card sx={{ width: "100%", bgColor: "#fcf5e3", marginY: "10px" }}>
      <CardHeader
        sx={{
          position: "relative",
          "& ::after": {
            content: '""',
            background: "#f0f0f0",
            position: "absolute",
            bottom: "-1px",
            left: "25%",
            width: "50%",
            height: "1px",
          },
        }}
        avatar={
          <Avatar sx={{ bgcolor: "#100d38" }} aria-label="Answer">
            {answerData.displayName.charAt(0)}
          </Avatar>
        }
        title={answerData.displayName}
        subheader={getDateFromFirestoreTimestamp(
          ////just typing answerData.createdAt gave an error once you reload the page in Answers so I assume the same thing happens over here. This is probably because Timestamp object is not serialized.
          new Timestamp(
            answerData.createdAt.seconds,
            answerData.createdAt.nanoseconds
          )
        )}
      />
      <CardContent
        sx={{
          position: "relative",
          "& ::after": {
            content: '""',
            background: "#f0f0f0",
            position: "absolute",
            bottom: "-1px",
            left: "25%",
            width: "50%",
            height: "1px",
          },
        }}
      >
        <Typography variant="h5" color="#100d38">
          {answerData.answer}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          onClick={() => {
            setReputation(1);
            setClickedPositiveRep(true);
            setClickedNegativeRep(false);
            setWasPositiveRep(true);
          }}
          sx={{ mx: "4px" }}
        >
          <FontAwesomeIcon icon={faThumbsUp} />
        </IconButton>
        <Typography
          variant="body2"
          fontWeight="medium"
          width="30px"
          height="30px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexShrink="0"
          bgcolor={
            reputation === 1 ? "#DFF2BF" : reputation === -1 ? "#FFD2D2" : ""
          }
          border={
            reputation === 1
              ? "1px solid #4F8A10"
              : reputation === -1
              ? "1px solid #D8000C"
              : "1px solid rgba(0, 0, 0, 0.6)"
          }
          borderRadius="50%"
        >
          {answerData.reputation + reputation}
        </Typography>
        <IconButton
          onClick={() => {
            setReputation(-1);
            setClickedNegativeRep(true);
            setClickedPositiveRep(false);
            setWasNegativeRep(true);
          }}
          sx={{ mx: "4px" }}
        >
          <FontAwesomeIcon icon={faThumbsDown} />
        </IconButton>
      </CardActions>

      {/* <button
        onClick={() => {
          setReputation(1);
          setClickedPositiveRep(true);
          setClickedNegativeRep(false);
          setWasPositiveRep(true);
        }}
      >
        +
      </button>
      <span>{answerData.reputation + reputation}</span>
      <button
        onClick={() => {
          setReputation(-1);
          setClickedNegativeRep(true);
          setClickedPositiveRep(false);
          setWasNegativeRep(true);
        }}
      >
        -
      </button> */}
    </Card>
  );
};

export default Answer;
