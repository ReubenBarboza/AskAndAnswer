import React from "react";
import { useStyles } from "./HomeStyles";
import { Typography, Paper, Grid } from "@mui/material";

function Home() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.jumbotron}>
        <div className={classes.alignHeaderContainer}>
          <div className={classes.headerContainer}>
            <Typography
              className={classes.headerTop}
              // position="absolute"
              // left="52%"
              // top="20%"
              fontWeight="light"
              fontSize="28px"
              lineHeight="45px"
              zIndex="10"
            >
              Share Your <br />
              <span
                style={{
                  display: "block",
                  fontWeight: "bold",
                  fontSize: "28px",
                  lineHeight: "45px",
                  zIndex: "10",
                }}
              >
                Ideas.
              </span>
            </Typography>
            <Typography
              className={classes.headerBottom}
              // position="absolute"
              // left="52%"
              // bottom="20%"
              fontWeight="light"
              fontSize="28px"
              lineHeight="45px"
              zIndex="10"
            >
              <span
                style={{
                  display: "block",
                  fontWeight: "bold",
                  fontSize: "28px",
                  lineHeight: "45px",
                  zIndex: "10",
                }}
              >
                Enlighten
              </span>
              Others.
            </Typography>
          </div>
        </div>
      </div>
      <Grid
        sx={{
          px: "50px",
          paddingBottom: "16px",
          "@media (max-width:500px)": {
            px: "10px",
          },
          backgroundColor: "#e7e7e7",
        }}
        container
        spacing={2}
      >
        <Grid item xs={12}>
          <Typography fontSize="28px" textAlign="center">
            The <i>Ask&amp;Answer</i> forum delivers:
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={5}
            sx={{ textAlign: "center", fontSize: "20px", py: "10px" }}
          >
            Minimalistic Design
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={5}
            sx={{ textAlign: "center", fontSize: "20px", py: "10px" }}
          >
            Realtime Updation
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={5}
            sx={{ textAlign: "center", fontSize: "20px", py: "10px" }}
          >
            Responsiveness
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={5}
            sx={{ textAlign: "center", fontSize: "20px", py: "10px" }}
          >
            Peer Moderation
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
