import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { doc, getDoc, increment, setDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../../firebase/firebase-config";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  Tooltip,
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
  const [questionReputationData, setQuestionReputationData] = useState(null);
  const [clientReputation, setClientReputation] = useState(null);

  //to handle reputation when user clicks dislike after liking and vice versa.
  const [clickedPositiveRep, setClickedPositiveRep] = useState(false);
  const [clickedNegativeRep, setClickedNegativeRep] = useState(false);
  const [wasPositiveRep, setWasPositiveRep] = useState(false);
  const [wasNegativeRep, setWasNegativeRep] = useState(false);

  //to check if user reported a question
  const [userFlagged, setUserFlagged] = useState(false);

  //used to check the server if current user already liked or disliked this content before.
  const questionReputationRef =
    auth.currentUser &&
    doc(db, `questionReputation/${obj.id}-${auth.currentUser.uid}`);
  useEffect(() => {
    console.log("initial get questionReputation useEffect fired");
    auth.currentUser &&
      getDoc(questionReputationRef)
        .then((snapshot) => {
          setQuestionReputationData(snapshot.data());
        })
        .catch((e) => console.log(`initial questionRep ${e}`));
    console.log("async ran");
  }, []);

  const questionDocRef = doc(db, "questions", obj.id);
  // implementing reputation
  useEffect(() => {
    console.log("reputation useeffect fired");
    if (!auth.currentUser) return;
    try {
      const update = async (reputation) => {
        await updateDoc(questionDocRef, {
          reputation: increment(reputation), //+1 or -1 first then -2 or +2 after changing opinions
        });
        console.log("async ran");
      };
      //if questionReputationData is null or undefined it means the current user did not like/dislike before
      if (!questionReputationData) {
        //Consider 5 rep, if liked=>6rep,disliked immediately after then 4rep
        if (clickedPositiveRep && wasPositiveRep && !wasNegativeRep) {
          //this will execute only on first click
          update(reputation); //+1
          setClientReputation(obj.reputation + 1);
        } else if (wasPositiveRep && clickedNegativeRep) {
          update(reputation - 1); //-2
          setClientReputation(obj.reputation - 1);
        } else if (clickedNegativeRep && !wasPositiveRep && wasNegativeRep) {
          //this will execute only on first click
          update(reputation); //-1
          setClientReputation(obj.reputation - 1);
        } else if (wasNegativeRep && clickedPositiveRep) {
          update(reputation + 1); //+2
          setClientReputation(obj.reputation + 1);
        }
      } else {
        //means the server stored that current user liked this content before
        if (questionReputationData && questionReputationData.liked) {
          //consider 5 rep, liked=>5rep, dislike=>3rep, like immediately after=>5rep
          if (clickedNegativeRep && !wasPositiveRep && wasNegativeRep) {
            //this will execute only on first click
            update(reputation - 1); //-2
            setClientReputation(obj.reputation - 2);
          } else if (wasPositiveRep && clickedNegativeRep) {
            update(reputation - 1); //-2
            setClientReputation(obj.reputation - 2);
          } else if (wasNegativeRep && clickedPositiveRep) {
            update(reputation + 1); //+2
            setClientReputation(obj.reputation);
          }
          //means the server stored that current user disliked this content before
        } else if (questionReputationData && questionReputationData.disliked) {
          //consider 5 rep, dislike=>5rep liked=>7rep, dislike immediately after=>5rep
          if (clickedPositiveRep && wasPositiveRep && !wasNegativeRep) {
            //this will execute only on first click
            update(reputation + 1); //+2
            setClientReputation(obj.reputation + 2);
          } else if (wasPositiveRep && clickedNegativeRep) {
            update(reputation - 1); //-2
            setClientReputation(obj.reputation);
          } else if (wasNegativeRep && clickedPositiveRep) {
            update(reputation + 1); //+2
            setClientReputation(obj.reputation + 2);
          }
        }
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

  useEffect(() => {
    console.log("questionReputation useeffect fired");
    if (!auth.currentUser) return;
    try {
      const updatePositive = async () => {
        await setDoc(questionReputationRef, {
          liked: true,
          disliked: false,
        });
        console.log("liked async ran");
      };
      const updateNegative = async () => {
        await setDoc(questionReputationRef, {
          liked: false,
          disliked: true,
        });
        console.log("disliked async ran");
      };

      // questionReputationData.liked && clickedNegativeRep
      //   ? updateNegative()
      //   : questionReputationData.disliked && clickedPositiveRep
      //   ? updatePositive()
      //   : null;
      if (
        clickedNegativeRep &&
        (!questionReputationData || !questionReputationData.disliked)
      ) {
        updateNegative();
      } else if (
        clickedPositiveRep &&
        (!questionReputationData || !questionReputationData.liked)
      ) {
        updatePositive();
      }
    } catch (e) {
      console.log(`questionRep ${e}`);
    }
  }, [clickedPositiveRep, clickedNegativeRep]);

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
              <ReadMore content={obj.question} />
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            {!auth.currentUser ? (
              <Tooltip
                title="Please login to like"
                placement="bottom-start"
                componentsProps={{
                  tooltip: {
                    sx: {
                      backgroundColor: "#100d38",
                      color: "#fcf5e3",
                    },
                  },
                }}
              >
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
              </Tooltip>
            ) : (
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
            )}
            <Typography
              variant="body2"
              fontWeight="medium"
              width="30px"
              height="30px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexShrink="0"
              //checks whether server stored the like/dislike and display colors based on it intitially and then change based on what was clicked.
              bgcolor={
                (questionReputationData &&
                  questionReputationData.liked &&
                  !clickedNegativeRep) ||
                reputation === 1
                  ? "#DFF2BF"
                  : (questionReputationData &&
                      questionReputationData.disliked &&
                      !clickedPositiveRep) ||
                    reputation === -1
                  ? "#FFD2D2"
                  : ""
              }
              //checks whether server stored the like/dislike and display colors based on it intitially and then change based on what was clicked.
              border={
                (questionReputationData &&
                  questionReputationData.liked &&
                  !clickedNegativeRep) ||
                reputation === 1
                  ? "1px solid #4F8A10"
                  : (questionReputationData &&
                      questionReputationData.disliked &&
                      !clickedPositiveRep) ||
                    reputation === -1
                  ? "1px solid #D8000C"
                  : "1px solid rgba(0, 0, 0, 0.6)"
              }
              borderRadius="50%"
            >
              {/* {questionReputationData &&
                obj.reputation +
                  (questionReputationData.liked &&
                  clickedNegativeRep &&
                  wasPositiveRep
                    ? reputation - 1
                    : questionReputationData.disliked &&
                      clickedPositiveRep &&
                      wasNegativeRep
                    ? reputation + 1
                    : reputation)} */}
              {clientReputation ?? obj.reputation}
            </Typography>
            {!auth.currentUser ? (
              <Tooltip
                title="Please login to dislike"
                placement="bottom-start"
                componentsProps={{
                  tooltip: {
                    sx: {
                      backgroundColor: "#100d38",
                      color: "#fcf5e3",
                    },
                  },
                }}
              >
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
              </Tooltip>
            ) : (
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
            )}

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
              {auth.currentUser && (
                <ReportButton reportOnClick={reportOnClick} />
              )}
            </div>
          </CardActions>
        </Card>
      )}
    </>
  );
};

export default Question;
