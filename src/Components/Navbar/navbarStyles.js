import { Button } from "@mui/material";
import { styled } from "@mui/system";
import { baseColor } from "../../utils/constants";

export const NavbarContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",

  [theme.breakpoints.down("sm")]: {},
}));

export const NavbarBox = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "90%",
  height: "100%",
  padding: "1rem",

  [theme.breakpoints.down("sm")]: {},
}));

export const NavbarHeader = styled("p")(({ theme }) => ({
  fontSize: "1.5rem",
  fontWeight: 800,
  //   color: baseColor,

  [theme.breakpoints.down("sm")]: {},
}));

export const NavbarPip = styled("p")(({ theme }) => ({
  fontSize: "1.5rem",
  fontWeight: 800,
  color: baseColor,
  margin: "0 1rem",

  [theme.breakpoints.down("sm")]: {},
}));

export const NavbarPageStatus = styled("p")(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: 600,
  color: baseColor,

  [theme.breakpoints.down("sm")]: {},
}));

export const MuiButton = styled(Button)(({ theme }) => ({
  fontSize: "0.7rem",
  color: "#fff",
  background: baseColor,
  marginLeft: "auto",
  cursor: "pointer",

  "&:hover": {
    color: "#fff",
    background: baseColor,
  },

  [theme.breakpoints.down("sm")]: {},
}));

export const NavBarImg = styled("img")(({ theme }) => ({
  height: "2rem",
  width: "2rem",
  objectFit: "contain",
  marginRight: "1rem",
  [theme.breakpoints.down("sm")]: {},
}));
