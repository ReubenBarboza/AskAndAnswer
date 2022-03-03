import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Typography,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply, faBan, faCheck } from "@fortawesome/free-solid-svg-icons";
import { getDateFromFirestoreTimestamp } from "../../../../com/functions";
import { db } from "../../../../firebase/firebase-config";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import ReadMore from "../../../../com/ReadMore";

const FlaggedAnswer = ({ flaggedAnswerData }) => {
  const [doesQuestionExist, setDoesQuestionExist] = useState(true);
  const [hasClickedButton, setHasClickedButton] = useState(false);
  useEffect(() => {
    try {
      const flaggedQuestionRef = doc(
        db,
        "questions",
        flaggedAnswerData.questionId
      );
      getDoc(flaggedQuestionRef).then((snapshot) => {
        if (!snapshot.exists()) {
          setDoesQuestionExist(false);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleRemove = async () => {
    setHasClickedButton(true);
    const flaggedAnswerRef = doc(
      db,
      "questions",
      flaggedAnswerData.questionId,
      "answers",
      flaggedAnswerData.id
    );
    try {
      await deleteDoc(flaggedAnswerRef);
      console.log("async delete ran");
    } catch (e) {
      console.log(e);
    }
  };

  const handleSave = async () => {
    setHasClickedButton(true);
    const flaggedAnswerRef = doc(
      db,
      "questions",
      flaggedAnswerData.questionId,
      "answers",
      flaggedAnswerData.id
    );
    try {
      await updateDoc(flaggedAnswerRef, {
        isFlagged: false,
      });
      console.log("async update ran");
    } catch (error) {
      console.log(error);
    }
  };

  if (!doesQuestionExist)
    return (
      <Typography mt="10px" color="#D8000C">
        Question was deleted
      </Typography>
    );

  return (
    !hasClickedButton && (
      <Container
        sx={{
          mt: "10px",
          minWidth: "75%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container
          disableGutters
          sx={{
            justifySelf: "start",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            border: "1px solid #00000008",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            mb: "0px",
            p: "8px",
          }}
        >
          <FontAwesomeIcon
            style={{
              transform: "rotate(-90deg)",
              marginRight: "10px",
              fontSize: "16px",
            }}
            icon={faReply}
          />
          <Typography>
            Replying to "{<ReadMore content={flaggedAnswerData.question} />}"
          </Typography>
        </Container>
        <Container disableGutters>
          <Card sx={{ width: "100%", bgColor: "#fcf5e3" }}>
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
                  {flaggedAnswerData.displayName.charAt(0)}
                </Avatar>
              }
              title={flaggedAnswerData.displayName}
              subheader={getDateFromFirestoreTimestamp(
                flaggedAnswerData.createdAt
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
                <ReadMore content={flaggedAnswerData.answer} />
              </Typography>
            </CardContent>
            <CardActions disableSpacing sx={{ p: "16px" }}>
              <Typography
                variant="body2"
                fontWeight="medium"
                width="30px"
                height="30px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexShrink="0"
                border="1px solid rgba(0, 0, 0, 0.6)"
                borderRadius="50%"
              >
                {flaggedAnswerData.reputation}
              </Typography>
              <div style={{ marginLeft: "auto" }}>
                <Button
                  onClick={handleRemove}
                  variant="outlined"
                  sx={{
                    mr: "10px",
                    minWidth: "max-content",
                    whiteSpace: "noWrap",
                    color: "black",
                    borderColor: "black",
                    ":hover": {
                      border: "1px solid #D8000C",
                      backgroundColor: "#FFD2D2",
                    },
                    "@media (max-width:530px)": {
                      display: "none",
                    },
                  }}
                >
                  Remove
                </Button>
                <Button
                  sx={{
                    color: "#D8000C",
                    minWidth: "min-content",
                    "@media (min-width:530px)": {
                      display: "none",
                    },
                  }}
                >
                  <FontAwesomeIcon icon={faBan}></FontAwesomeIcon>
                </Button>
                <Button
                  onClick={handleSave}
                  variant="outlined"
                  sx={{
                    mr: "4px",
                    minWidth: "maxContent",
                    whiteSpace: "noWrap",
                    color: "black",
                    borderColor: "black",
                    ":hover": {
                      border: "1px solid #4F8A10",
                      backgroundColor: "#DFF2BF",
                    },
                    "@media (max-width:530px)": {
                      display: "none",
                    },
                  }}
                >
                  Save
                </Button>
                <Button
                  sx={{
                    color: "#4F8A10",
                    minWidth: "min-content",
                    "@media (min-width:530px)": {
                      display: "none",
                    },
                  }}
                >
                  <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                </Button>
              </div>
            </CardActions>
          </Card>
        </Container>
      </Container>
    )
  );
};

export default FlaggedAnswer;
