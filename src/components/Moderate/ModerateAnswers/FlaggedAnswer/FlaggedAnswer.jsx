import React from "react";
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
import { faReply } from "@fortawesome/free-solid-svg-icons";
import { getDateFromFirestoreTimestamp } from "../../../../com/functions";

const FlaggedAnswer = ({ flaggedAnswerData }) => {
  return (
    <Container
      disableGutters
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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          border: "1px solid #00000058",
          borderRadius: "10px",
          width: "max-content",
          mb: "0px",
          p: "4px",
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
        <Typography>Replying to "{flaggedAnswerData.question}"</Typography>
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
            <Typography variant="h5" color="#100d38">
              {flaggedAnswerData.answer}
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
              {flaggedAnswerData.reputation}
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
      </Container>
    </Container>
  );
};

export default FlaggedAnswer;
