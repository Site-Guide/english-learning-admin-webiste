import { styled } from "@mui/system";
import { Button, TextField } from "@mui/material";
import { baseColor } from "../../utils/constants";

export const Container = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  width: "100%",
  height: "85%",
  marginTop: "-20px",
  [theme.breakpoints.down("sm")]: {},
}));

export const ButtonLabel = styled("label")(({ theme }) => ({
  background: baseColor,
  color: "#fff",
  margin: "15px 0",
  marginLeft: "auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "0.9rem",
  padding: "0.2rem 0.5rem",

  "&:hover": {
    background: baseColor,
    color: "#fff",
  },

  [theme.breakpoints.down("sm")]: {},
}));

export const MuiTextField = styled(TextField)(({ theme }) => ({
  width: "80%",
  color: "black",
  margin: "5px 0",
  [theme.breakpoints.down("sm")]: {},
}));

export const MuiButton = styled(Button)(({ theme }) => ({
  width: "30%",
  height: "3rem",
  background: baseColor,
  color: "#fff",
  margin: "15px 0",

  "&:hover": {
    background: baseColor,
    color: "#fff",
  },

  [theme.breakpoints.down("sm")]: {},
}));

export const DiscussionBox = styled("div")(({ theme }) => ({
  display: "flex",
  gridTemplateColumns: " repeat(auto-fit, minmax(100px, 1fr))",

  [theme.breakpoints.down("sm")]: {},
}));

export const DisImage = styled("img")(({ theme }) => ({
  height: "50px",
  width: "50px",
  border: "none",
  borderRadius: "200%",
  marginLeft: "-5px",
  [theme.breakpoints.down("sm")]: {},
}));

export const PartListBox = styled("p")(({ theme }) => ({
  padding: "0.5rem 10px",
  borderBottom: "2px solid lightgrey",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: "#d3d3d3",
  },

  [theme.breakpoints.down("sm")]: {},
}));
