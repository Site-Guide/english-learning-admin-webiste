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
