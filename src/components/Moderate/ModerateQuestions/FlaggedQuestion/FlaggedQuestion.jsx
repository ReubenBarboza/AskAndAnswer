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
          <Typography variant="h5" color="#100d38">
            {flaggedQuestionData.question}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
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
              }}
            >
              Remove
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
              }}
            >
              Save
            </Button>
          </div>
        </CardActions>
      </Card>
    )
  );
};

export default FlaggedQuestion;
