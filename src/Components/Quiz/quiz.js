import { styled } from "@mui/system";
import { Button, TextField } from "@mui/material";
import { baseColor } from "../../utils/constants";

export const Container = styled("div")(({ theme }) => ({
  display: "flex",
  //   alignItems: "center",
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

export const SaveOrderLabel = styled("label")(({ theme }) => ({
  background: baseColor,
  color: "#fff",
  margin: "15px 0",
  marginLeft: "20px",
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

export const MUIDeleteIconBox = styled("div")(({ theme }) => ({
  height: "100%",
  width: "100%",
  background: "yellow",
  margin: "100% 0",
  [theme.breakpoints.down("sm")]: {},
}));

export const OptionBox = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {},
}));

export const OptionIndex = styled("div")(({ theme, active }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "25px",
  width: "25px",
  fontWeight: 700,
  color: active && "#fff",
  borderRadius: "200%",
  marginRight: "10px",
  backgroundColor: active && baseColor,
  cursor: "pointer",
  border: active ? "2px solid transparent" : "2px solid grey",

  "&:hover": {
    background: baseColor,
    color: "#fff",
    border: "2px solid transparent",
  },
  [theme.breakpoints.down("sm")]: {},
}));

export const OptionAdd = styled(Button)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "20px",
  fontSize: "10px",
  color: "#fff",
  marginLeft: "auto",
  backgroundColor: baseColor,
  "&:hover": {
    background: baseColor,
    color: "#fff",
  },
  [theme.breakpoints.down("sm")]: {},
}));
