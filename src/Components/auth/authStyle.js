import { styled } from "@mui/system";
import { Button, TextField } from "@mui/material";
import { baseColor } from "../../utils/constants";

export const Container = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "85%",

  [theme.breakpoints.down("sm")]: {},
}));

export const MainBox = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  width: "40%",
  padding: "1rem 0",
  borderRadius: "8px",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",

  [theme.breakpoints.down("sm")]: {},
}));

export const HeaderText = styled("p")(({ theme }) => ({
  color: baseColor,
  fontWeight: 600,
  margin: "15px 0",
  fontSize: "2rem",
  [theme.breakpoints.down("sm")]: {},
}));

export const SubText = styled("span")(({ theme }) => ({
  color: baseColor,
  fontWeight: 400,
  margin: "0px 10px",
  fontSize: "1.2rem",
  cursor: "pointer",
  [theme.breakpoints.down("sm")]: {},
}));

export const MuiTextField = styled(TextField)(({ theme }) => ({
  width: "80%",
  color: "black",
  margin: "15px 0",
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
