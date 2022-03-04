import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const HomeFeature = ({ title, desc, imageUrl, imageAlt }) => {
  return (
    <>
      <Paper
        elevation={5}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          "@media (max-width:500px)": {
            flexDirection: "column",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "75%",
            px: "10px",
            marginRight: "auto",
            marginLeft: "auto",
          }}
        >
          <Typography variant="h5" textAlign="center" pt="10px" pb="5px">
            {title}
          </Typography>

          <Typography variant="body1" textAlign="center" pt="5px" pb="10px">
            {desc}
          </Typography>
        </Box>
        <img
          src={imageUrl}
          width="100"
          height="100"
          style={{ margin: "10px" }}
          alt={imageAlt}
        />
      </Paper>
    </>
  );
};

export default HomeFeature;
