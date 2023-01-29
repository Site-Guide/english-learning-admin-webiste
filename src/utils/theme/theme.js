import { createTheme } from "@mui/material/styles";
import MuiOverrides from "./muiOverrides";

const theme = createTheme({
  components: MuiOverrides(),
});

export default theme;
