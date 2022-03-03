import React from "react";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { getDateFromFirestoreTimestamp } from "../../../../com/functions";
import { db } from "../../../../firebase/firebase-config";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faCheck } from "@fortawesome/free-solid-svg-icons";
import ReadMore from "../../../../com/ReadMore";

const FlaggedQuestion = ({ flaggedQuestionData }) => {
  const [hasClickedButton, setHasClickedButton] = useState(false);

  async function handleRemoveQuestion() {
    setHasClickedButton(true);
    const flaggedQuestionRef = doc(db, "questions", flaggedQuestionData.id);
    try {
      await deleteDoc(flaggedQuestionRef);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSaveQuestion() {
    setHasClickedButton(true);
    const flaggedQuestionRef = doc(db, "questions", flaggedQuestionData.id);
    try {
      await updateDoc(flaggedQuestionRef, {
        isFlagged: false,
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    !hasClickedButton && (
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
            <Avatar sx={{ bgcolor: "#100d38" }} aria-label="Question">
              {flaggedQuestionData.displayName.charAt(0)}
            </Avatar>
          }
          title={flaggedQuestionData.displayName}
          subheader={getDateFromFirestoreTimestamp(
            flaggedQuestionData.createdAt
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
            <ReadMore content={flaggedQuestionData.question} />
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
            {flaggedQuestionData.reputation}
          </Typography>
          <div style={{ marginLeft: "auto" }}>
            <Button
              onClick={handleRemoveQuestion}
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
              onClick={handleSaveQuestion}
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
    )
  );
};

export default FlaggedQuestion;
