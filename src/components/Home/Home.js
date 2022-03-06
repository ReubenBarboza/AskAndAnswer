import React from "react";
import { useStyles } from "./HomeStyles";
import { Typography, Grid } from "@mui/material";
import feather from "../../assets/feather.png";
import clock from "../../assets/clock.png";
import responsive from "../../assets/responsive.png";
import handshake from "../../assets/handshake.png";
import HomeFeature from "../../com/HomeFeature";

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
          {/* <Paper
            elevation={5}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h5" textAlign="center" pt="10px" pb="5px">
                Minimalistic Design
              </Typography>

              <Typography variant="body2" textAlign="center" pt="5px" pb="10px">
                Designed without clutter, It's easy to find what you are looking
                for!
              </Typography>
            </Box>
            <img
              src={feather}
              width="100"
              height="100"
              style={{ margin: "10px 0px" }}

              alt="Writing with feather image by rawpixel.com"
            />
          </Paper> */}
          <HomeFeature
            title="Minimalistic Design"
            desc="Designed without clutter, It's easy to find what you are looking
                for!"
            imageUrl={feather}
            imageAlt="Writing with feather image by rawpixel.com"
          ></HomeFeature>
        </Grid>
        <Grid item xs={12} md={6}>
          {/* <Paper elevation={5}>
            <Typography variant="h5" textAlign="center" py="10px">
              Realtime Updation
            </Typography>
          </Paper> */}
          <HomeFeature
            title="Realtime Updation"
            desc="Built using Firebase so that your clicks register!"
            imageUrl={clock}
            imageAlt="Clock image by rawpixel.com"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          {/* <Paper elevation={5}>
            <Typography variant="h5" textAlign="center" py="10px">
              Responsive
            </Typography>
          </Paper> */}
          <HomeFeature
            title="Responsiveness"
            desc="Support for all major display devices!"
            imageUrl={responsive}
            imageAlt="Responsive devices image by rawpixel.com"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          {/* <Paper elevation={5}>
            <Typography variant="h5" textAlign="center" py="10px">
              Peer Moderated
            </Typography>
          </Paper> */}
          <HomeFeature
            title="Peer Moderation"
            desc="Publicly available moderation for quick sanitation!"
            imageUrl={handshake}
            imageAlt="Handshake image by rawpixel.com"
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
