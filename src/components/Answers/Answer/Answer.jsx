import React, { useState, useEffect } from "react";
import { db, auth } from "../../../firebase/firebase-config";
import {
  doc,
  updateDoc,
  setDoc,
  getDoc,
  increment,
  Timestamp,
} from "firebase/firestore";
import { getDateFromFirestoreTimestamp } from "../../../com/functions";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReportButton from "../../../com/ReportButton";
import WarningSpam from "../../../com/WarningSpam";
import ReadMore from "../../../com/ReadMore";

const Answer = ({ answerData, questionId }) => {
  const [reputation, setReputation] = useState(0);
  const [answerReputationData, setAnswerReputationData] = useState(null);
  const [clientReputation, setClientReputation] = useState(null);

  //to handle reputation when user clicks dislike after liking and vice versa.
  const [clickedPositiveRep, setClickedPositiveRep] = useState(false);
  const [clickedNegativeRep, setClickedNegativeRep] = useState(false);
  const [wasPositiveRep, setWasPositiveRep] = useState(false);
  const [wasNegativeRep, setWasNegativeRep] = useState(false);

  //for report button
  const [userFlagged, setUserFlagged] = useState(false);

  const answerReputationRef = doc(
    db,
    `answerReputation/${answerData.id}-${auth.currentUser.uid}`
  );
  useEffect(() => {
    console.log("initial get answerReputation useEffect fired");

    getDoc(answerReputationRef)
      .then((snapshot) => {
        setAnswerReputationData(snapshot.data());
      })
      .catch((e) => console.log(`initial answerRep ${e}`));
  }, []);

  // const answerDocRef = doc(
  //   db,
  //   `questions/${questionId}/answers/${answerData.id}`
  // );
  //implementing reputation
  // useEffect(() => {
  //   console.log("answer reputation useeffect fired");
  //   try {
  //     const update = async (reputation) => {
  //       await updateDoc(answerDocRef, {
  //         reputation: increment(reputation), //+1 or -1 first then -2 or +2 after changing opinions
  //       });
  //       console.log("async ran");
  //     };

  //     if (clickedPositiveRep && wasPositiveRep && !wasNegativeRep) {
  //       //this will execute only on first click
  //       console.log("cp wp !wn" + reputation);
  //       update(reputation); //+1
  //     } else if (wasPositiveRep && clickedNegativeRep) {
  //       console.log("wp cn" + reputation);
  //       update(reputation - 1); //-2
  //     } else if (clickedNegativeRep && !wasPositiveRep && wasNegativeRep) {
  //       //this will execute only on first click
  //       console.log("cn wp wn" + reputation);
  //       update(reputation); //-1
  //     } else if (wasNegativeRep && clickedPositiveRep) {
  //       console.log("wn cp" + reputation);
  //       update(reputation + 1); //+2
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [
  //   clickedPositiveRep,
  //   clickedNegativeRep,
  //   wasPositiveRep,
  //   wasNegativeRep,
  //   reputation,
  // ]);
  const answerDocRef = doc(
    db,
    `questions/${questionId}/answers/${answerData.id}`
  );
  useEffect(() => {
    console.log("reputation useeffect fired");
    try {
      const update = async (reputation) => {
        await updateDoc(answerDocRef, {
          reputation: increment(reputation), //+1 or -1 first then -2 or +2 after changing opinions
        });
        console.log("async ran");
      };
      //if answerReputationData is null or undefined it means the current user did not like/dislike before
      if (!answerReputationData) {
        //Consider 5 rep, if liked=>6rep,disliked immediately after then 4rep
        if (clickedPositiveRep && wasPositiveRep && !wasNegativeRep) {
          //this will execute only on first click
          update(reputation); //+1
          setClientReputation(answerData.reputation + 1);
        } else if (wasPositiveRep && clickedNegativeRep) {
          update(reputation - 1); //-2
          setClientReputation(answerData.reputation - 1);
        } else if (clickedNegativeRep && !wasPositiveRep && wasNegativeRep) {
          //this will execute only on first click
          update(reputation); //-1
          setClientReputation(answerData.reputation - 1);
        } else if (wasNegativeRep && clickedPositiveRep) {
          update(reputation + 1); //+2
          setClientReputation(answerData.reputation + 1);
        }
      } else {
        //means the server stored that current user liked this content before
        if (answerReputationData && answerReputationData.liked) {
          //consider 5 rep, liked=>5rep, dislike=>3rep, like immediately after=>5rep
          if (clickedNegativeRep && !wasPositiveRep && wasNegativeRep) {
            //this will execute only on first click
            update(reputation - 1); //-2
            setClientReputation(answerData.reputation - 2);
          } else if (wasPositiveRep && clickedNegativeRep) {
            update(reputation - 1); //-2
            setClientReputation(answerData.reputation - 2);
          } else if (wasNegativeRep && clickedPositiveRep) {
            update(reputation + 1); //+2
            setClientReputation(answerData.reputation);
          }
          //means the server stored that current user disliked this content before
        } else if (answerReputationData && answerReputationData.disliked) {
          //consider 5 rep, dislike=>5rep liked=>7rep, dislike immediately after=>5rep
          if (clickedPositiveRep && wasPositiveRep && !wasNegativeRep) {
            //this will execute only on first click
            update(reputation + 1); //+2
            setClientReputation(answerData.reputation + 2);
          } else if (wasPositiveRep && clickedNegativeRep) {
            update(reputation - 1); //-2
            setClientReputation(answerData.reputation);
          } else if (wasNegativeRep && clickedPositiveRep) {
            update(reputation + 1); //+2
            setClientReputation(answerData.reputation + 2);
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
    console.log("answerReputation useeffect fired");
    try {
      const updatePositive = async () => {
        await setDoc(answerReputationRef, {
          liked: true,
          disliked: false,
        });
        console.log("liked async ran");
      };
      const updateNegative = async () => {
        await setDoc(answerReputationRef, {
          liked: false,
          disliked: true,
        });
        console.log("disliked async ran");
      };

      // answerReputationData.liked && clickedNegativeRep
      //   ? updateNegative()
      //   : answerReputationData.disliked && clickedPositiveRep
      //   ? updatePositive()
      //   : null;
      if (
        clickedNegativeRep &&
        (!answerReputationData || !answerReputationData.disliked)
      ) {
        updateNegative();
      } else if (
        clickedPositiveRep &&
        (!answerReputationData || !answerReputationData.liked)
      ) {
        updatePositive();
      }
    } catch (e) {
      console.log(`answerRep ${e}`);
    }
  }, [clickedPositiveRep, clickedNegativeRep]);

  async function reportOnClick() {
    try {
      setUserFlagged(true);
      if (!answerData.isFlagged) {
        await updateDoc(answerDocRef, {
          isFlagged: true,
        });
        console.log("async fired");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    !userFlagged && (
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
            ////just typing answerData.createdAt gave an error once you reload the page in Answers so I assume the same thing happens over here. This is probably because Timestamp answerDataect is not serialized.
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
          <Typography variant="h6" color="#100d38">
            <ReadMore content={answerData.answer} />
          </Typography>
        </CardContent>
        <CardActions>
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
              // reputation === 1 ? "#DFF2BF" : reputation === -1 ? "#FFD2D2" : ""
              (answerReputationData &&
                answerReputationData.liked &&
                !clickedNegativeRep) ||
              reputation === 1
                ? "#DFF2BF"
                : (answerReputationData &&
                    answerReputationData.disliked &&
                    !clickedPositiveRep) ||
                  reputation === -1
                ? "#FFD2D2"
                : ""
            }
            border={
              // reputation === 1
              //   ? "1px solid #4F8A10"
              //   : reputation === -1
              //   ? "1px solid #D8000C"
              //   : "1px solid rgba(0, 0, 0, 0.6)"
              (answerReputationData &&
                answerReputationData.liked &&
                !clickedNegativeRep) ||
              reputation === 1
                ? "1px solid #4F8A10"
                : (answerReputationData &&
                    answerReputationData.disliked &&
                    !clickedPositiveRep) ||
                  reputation === -1
                ? "1px solid #D8000C"
                : "1px solid rgba(0, 0, 0, 0.6)"
            }
            borderRadius="50%"
          >
            {/* {answerData.reputation + reputation} */}
            {clientReputation ?? answerData.reputation}
            {/* {answerData.reputation + !toggleAskedAnswer ? reputation : ""} */}
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
          {answerData.isFlagged && <WarningSpam />}
          <div style={{ marginLeft: "auto", display: "flex" }}>
            <ReportButton reportOnClick={reportOnClick} />
          </div>
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
    )
  );
};

export default Answer;
