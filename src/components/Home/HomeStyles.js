import { makeStyles } from "@mui/styles";
import jumbotron from "../../assets/unsplash_7esRPTt38nI.png";
import jumbotronRotated from "../../assets/unsplash_7esRPTt38nI_rotated.png";
export const useStyles = makeStyles({
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  jumbotron: {
    backgroundImage: `url(${jumbotron})`,
    backgroundRepeat: "no-repeat",

    maxWidth: "100%",
    minHeight: "90%",
    backgroundSize: "cover",
    backgroundPosition: "right center",
    "@media screen and (max-width:700px)": {
      backgroundImage: `url(${jumbotronRotated})`,
      backgroundPosition: "left center",
    },
  },
  alignHeaderContainer: {
    maxWidth: "1450px",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "300px",
    // padding: "70px 0px",

    "@media screen and (max-width:700px)": {
      justifyContent: "flex-start",
      marginLeft: "20px",
      // padding: "30px 0px",
    },
  },
  headerContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    maxWidth: "500px",
    minHeight: "500px",
  },
  // headerTop: {
  //   position: "relative",
  //   "& ::after": {
  //     content: "''",
  //     background: "gray",
  //     position: "absolute",
  //     bottom: "-10px",
  //     left: "5px",
  //     width: "263%",
  //     height: "1px",
  //     zIndex: "10",
  //   },
  // },
  // sideRectangle: {
  //   position: "absolute",
  //   width: "160px",
  //   height: "700px",
  //   top: "0px",
  //   right: "0px",
  //   backgroundColor: "#CECAC2",
  // },
});
