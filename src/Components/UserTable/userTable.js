import { styled } from "@mui/system";
import { baseColor } from "../../utils/constants";

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
