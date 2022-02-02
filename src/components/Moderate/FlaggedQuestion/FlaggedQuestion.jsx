import React from "react";
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
import { getDateFromFirestoreTimestamp } from "../../../com/functions";

const FlaggedQuestion = ({ flaggedQuestionData }) => {
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
          <Avatar sx={{ bgcolor: "#100d38" }} aria-label="Question">
            {flaggedQuestionData.displayName.charAt(0)}
          </Avatar>
        }
        title={flaggedQuestionData.displayName}
        subheader={getDateFromFirestoreTimestamp(flaggedQuestionData.createdAt)}
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
  );
};

export default FlaggedQuestion;
