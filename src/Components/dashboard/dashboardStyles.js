import { styled } from "@mui/system";
import { Button, TextField } from "@mui/material";
import { baseColor } from "../../utils/constants";

export const Container = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  padding: "2rem 0",

  [theme.breakpoints.down("sm")]: {},
}));

export const DashboardBox = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",

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
  marginLeft: "10%",
  cursor: "pointer",

  [theme.breakpoints.down("sm")]: {},
}));

export const loadingText = styled("p")(({ theme }) => ({
  fontSize: "1rem",
  color: baseColor,
  marginLeft: "10%",
  cursor: "pointer",

  [theme.breakpoints.down("sm")]: {},
}));
