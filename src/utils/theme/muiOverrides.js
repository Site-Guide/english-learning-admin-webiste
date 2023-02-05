import { secondBase } from "../constants";

const MuiOverrides = () => ({
  MuiInputBase: {
    styleOverrides: {
      root: {
        color: secondBase,
      },
    },
  },
  MuiInput: {
    styleOverrides: {
      borderBottom: "2px solid black",
      color: secondBase,
      root: {
        "&::after": {
          borderBottom: "2px solid black",
          color: secondBase,
        },
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        "&.Mui-focused": {
          color: secondBase,
        },
      },
    },
  },
  MuiTabs: {
    styleOverrides: {
      indicator: {
        backgroundColor: "rgb(244, 140, 6)",
        height: "4px",
      },
    },
  },
  MuiMenu: {
    styleOverrides: {
      list: {
        maxHeight: "120px",
        overflowY: "scroll",
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        width: "600px",
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {},
    },
  },
});

export default MuiOverrides;
