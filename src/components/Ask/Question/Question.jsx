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
import {
  faThumbsDown,
  faThumbsUp,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { getDateFromFirestoreTimestamp } from "../../../com/functions";
import ReportButton from "../../../com/ReportButton";
import WarningSpam from "../../../com/WarningSpam";
import ReadMore from "../../../com/ReadMore";

const Question = ({ obj }) => {
  const [reputation, setReputation] = useState(0);

  //to handle reputation when user clicks dislike after liking and vice versa.
  const [clickedPositiveRep, setClickedPositiveRep] = useState(false);
  const [clickedNegativeRep, setClickedNegativeRep] = useState(false);
  const [wasPositiveRep, setWasPositiveRep] = useState(false);
  const [wasNegativeRep, setWasNegativeRep] = useState(false);

  //to check if user reported a question
  const [userFlagged, setUserFlagged] = useState(false);

  //read more
  const [readMore, setReadMore] = useState(true);

  const questionDocRef = doc(db, "questions", obj.id);
  // implementing reputation
  useEffect(() => {
    console.log("reputation useeffect fired");
    try {
      const update = async (reputation) => {
        await updateDoc(questionDocRef, {
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

  async function reportOnClick() {
    try {
      setUserFlagged(true);
      if (!obj.isFlagged) {
        await updateDoc(questionDocRef, {
          isFlagged: true,
        });
        console.log("async fired");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {!userFlagged && (
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
            <Typography variant="h6" color="#100d38">
              {/* {readMore
                ? obj.question.substring(0, 200).concat("...")
                : obj.question}
              {readMore ? (
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
              ) : (
                obj.question.length > 200 && (
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
                )
              )} */}
              <ReadMore content={obj.question} />
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
                reputation === 1
                  ? "#DFF2BF"
                  : reputation === -1
                  ? "#FFD2D2"
                  : ""
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
              {obj.reputation + reputation}
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

            {obj.isFlagged && <WarningSpam />}

            <div
              style={{
                marginLeft: "auto",
                display: "flex",
              }}
            >
              <Link
                style={{ textDecoration: "none", marginLeft: "auto" }}
                to={{
                  pathname: "/Answers",
                  state: {
                    id: obj.id,
                    question: obj.question,
                    displayName: obj.displayName,
                    createdAt: obj.createdAt,
                    reputation: obj.reputation,
                    clickedPositiveRep: clickedPositiveRep,
                    clickedNegativeRep: clickedNegativeRep,
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
                    "@media (max-width:530px)": {
                      display: "none",
                    },
                  }}
                >
                  See Answers
                </Button>
                <Button //this icon is for mobile, it does not exist on screens>400px.
                  sx={{
                    color: "black",
                    minWidth: "min-content",
                    "@media (min-width:530px)": {
                      display: "none",
                    },
                  }}
                >
                  <FontAwesomeIcon icon={faEye} />
                </Button>
              </Link>
              <ReportButton reportOnClick={reportOnClick} />
            </div>
          </CardActions>
        </Card>
      )}
    </>
  );
};

export default Question;
