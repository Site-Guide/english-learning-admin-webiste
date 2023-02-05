import { styled } from "@mui/system";
import { baseColor, secondBase } from "../../utils/constants";

export const Container = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "auto",
  padding: "0rem 0",
  borderRadius: "8px",
  // boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  marginTop: "1rem",

  [theme.breakpoints.down("sm")]: {},
}));

export const ButtonLabel = styled("label")(({ theme }) => ({
  width: "10%",
  height: "3rem",
  background: baseColor,
  color: "#fff",
  margin: "15px 0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "4px",
  cursor: "pointer",

  "&:hover": {
    background: baseColor,
    color: "#fff",
  },

  [theme.breakpoints.down("sm")]: {},
}));

export const MuiButton = styled("p")(({ theme }) => ({
  fontSize: "1rem",
  color: baseColor,
  marginLeft: "auto",
  cursor: "pointer",

  [theme.breakpoints.down("sm")]: {},
}));

export const SubTab = styled("p")(({ theme }) => ({
  cursor: "pointer",
  color: "grey",
  "&:hover": {
    color: secondBase,
  },

  [theme.breakpoints.down("sm")]: {},
}));
