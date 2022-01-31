import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Tooltip } from "@mui/material";
import React from "react";

const WarningSpam = () => {
  return (
    <>
      <Tooltip
        title="This content was flagged and can be taken down by moderators."
        placement="bottom-start"
        componentsProps={{
          tooltip: {
            sx: {
              backgroundColor: "#100d38",
              color: "#fcf5e3",
            },
          },
        }}
      >
        <Button
          sx={{
            // color: "#100d38",
            color: "#FF7900",
            margin: "0px",
            padding: "0px",
            minWidth: "min-content",
            "@media (max-width:530px)": {
              marginLeft: "-8px",
            },
          }}
        >
          <FontAwesomeIcon
            style={{
              marginLeft: "4px",
              marginRight: "4px",
              fontSize: "14px",
            }}
            icon={faExclamationTriangle}
          />
        </Button>
      </Tooltip>
    </>
  );
};

export default WarningSpam;
