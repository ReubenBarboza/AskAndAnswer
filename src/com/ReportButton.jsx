import React from "react";
import { Tooltip, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";

const ReportButton = () => {
  return (
    <div>
      <Tooltip
        componentsProps={{
          tooltip: {
            sx: {
              backgroundColor: "#100d38",
              color: "#fcf5e3",
            },
          },
        }}
        title="Flag only if the given content is disrespectful or spam."
      >
        <Button
          sx={{
            color: "black",
            borderColor: "black",
            ml: "10px",
            "@media (max-width:470px)": {
              display: "none",
            },
          }}
          variant="outlined"
        >
          Flag
        </Button>
      </Tooltip>
      <Tooltip
        title="Flag only if the given content is disrespectful or spam."
        componentsProps={{
          tooltip: {
            sx: { backgroundColor: "#100d38", color: "#fcf5e3" },
          },
        }}
      >
        <Button
          sx={{
            color: "red",
            minWidth: "min-content",
            "@media (min-width:470px)": {
              display: "none",
            },
          }}
        >
          <FontAwesomeIcon icon={faFlag} />
        </Button>
      </Tooltip>
    </div>
  );
};

export default ReportButton;
