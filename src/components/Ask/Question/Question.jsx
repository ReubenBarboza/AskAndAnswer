import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { doc, increment, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";

function getDateFromFirestoreTimestamp(timestamp) {
  function ordinalSuffixOf(i) {
    var j = i % 10,
      k = i % 100;
    if (j === 1 && k !== 11) {
      return "st";
    }
    if (j === 2 && k !== 12) {
      return "nd";
    }
    if (j === 3 && k !== 13) {
      return "rd";
    }
    return "th";
  }
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return `${timestamp.toDate().getDate()}${ordinalSuffixOf(
    timestamp.toDate().getDate()
  )} ${monthNames[timestamp.toDate().getMonth()]}, ${timestamp
    .toDate()
    .getFullYear()}`;
}

const Question = ({ obj }) => {
  const [reputation, setReputation] = useState(0);
  const [isReputationLocallyUpdated, setIsReputationLocallyUpdated] =
    useState(false);

  const questionDocRef = doc(db, "questions", obj.id);
  // implementing reputation
  useEffect(() => {
    console.log("reputation useeffect fired");
    try {
      const update = async () => {
        await updateDoc(questionDocRef, {
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
    <>
      {console.log()}
      <Card
        key={obj.id}
        sx={{ width: "100%", bgColor: "#fcf5e3", marginY: "10px" }}
      >
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
            <Avatar sx={{ bgcolor: "#100d38" }} aria-label="Question">
              {obj.displayName.charAt(0)}
            </Avatar>
          }
          title={obj.displayName}
          subheader={getDateFromFirestoreTimestamp(obj.createdAt)}
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
            {obj.question}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            onClick={() => {
              setIsReputationLocallyUpdated(true);
              setReputation(1);
            }}
            sx={{ mx: "4px" }}
          >
            <FontAwesomeIcon icon={faThumbsUp} />
          </IconButton>
          <Typography variant="body2">{obj.reputation + reputation}</Typography>
          <IconButton
            onClick={() => {
              setIsReputationLocallyUpdated(true);
              setReputation(-1);
            }}
            sx={{ mx: "4px" }}
          >
            <FontAwesomeIcon icon={faThumbsDown} />
          </IconButton>
          <Link
            style={{ textDecoration: "none", marginLeft: "auto" }}
            to={{
              pathname: "/Answers",
              state: {
                id: obj.id,
                question: obj.question,
                displayName: obj.displayName,
                createdAt: obj.createdAt,
              },
            }}
          >
            <Button
              variant="outlined"
              sx={{
                marginLeft: "auto",
                minWidth: "maxContent",
                whiteSpace: "noWrap",
                color: "black",
                borderColor: "black",
              }}
            >
              See Answers
            </Button>
          </Link>
        </CardActions>
      </Card>
      {/* <div key={obj.id}>
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
          pathname: "/Answers",
          state: { id: obj.id, question: obj.question },
        }}
      >
        <button>Load answers</button>
      </Link>
      */}
    </>
  );
};

export default Question;
