import React from "react";
import {
  Typography,
  Paper,
  ListItemText,
  List,
  ListItem,
  ListItemIcon,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const About = () => {
  return (
    <Paper
      elevation={8}
      sx={{
        width: "100%",
        minHeight: "83vh",
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e6e6e6",
      }}
    >
      <Typography p="10px" variant="h5">
        Ask&amp;Answer is a minimalistic and responsive forum written by Reuben
        Barboza for the final year project of St. Xaviers College, Mumbai.
      </Typography>
      <Typography p="10px" variant="h6">
        By using it, you agree with the terms and conditions provided below:
      </Typography>

      <List>
        <ListItem>
          <ListItemIcon sx={{ minWidth: "20px" }}>
            <FontAwesomeIcon icon={faAngleRight} />
          </ListItemIcon>
          <ListItemText
            sx={{ "& .MuiTypography-root": { fontWeight: "bold" } }}
            primary="You will treat people with respect."
          />
        </ListItem>
        <ListItem>
          <ListItemIcon sx={{ minWidth: "20px" }}>
            <FontAwesomeIcon icon={faAngleRight} />
          </ListItemIcon>
          <ListItemText
            sx={{ "& .MuiTypography-root": { fontWeight: "bold" } }}
            primary="You will post questions purely for education."
          />
        </ListItem>
        <ListItem>
          <ListItemIcon sx={{ minWidth: "20px" }}>
            <FontAwesomeIcon icon={faAngleRight} />
          </ListItemIcon>
          <ListItemText
            sx={{ "& .MuiTypography-root": { fontWeight: "bold" } }}
            primary="You will not spam."
          />
        </ListItem>
      </List>

      <Typography p="10px" variant="h6">
        If you are a moderator you can take down content that does not follow
        the above guidelines.
      </Typography>
    </Paper>
  );
};

export default About;
