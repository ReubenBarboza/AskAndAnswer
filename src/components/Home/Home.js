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
              fontSize="48px"
              lineHeight="60px"
              zIndex="10"
            >
              Share Your <br />
              <Typography
                fontWeight="bold"
                fontSize="48px"
                lineHeight="60px"
                zIndex="10"
              >
                Ideas.
              </Typography>
            </Typography>
            <Typography
              // position="absolute"
              // left="52%"
              // bottom="20%"
              fontWeight="light"
              fontSize="48px"
              lineHeight="60px"
              zIndex="10"
            >
              <Typography
                fontWeight="bold"
                fontSize="48px"
                lineHeight="60px"
                zIndex="10"
              >
                Enlighten
              </Typography>
              Others.
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
