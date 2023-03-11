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
