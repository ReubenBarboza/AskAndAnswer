import React from "react";
import { useStyles } from "./HomeStyles";
import { Typography } from "@mui/material";

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
    </div>
  );
}

export default Home;
