import chroma from "chroma-js";
import { baseColor, secondBase } from "../constants";

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
  MuiPickersDay: {
    styleOverrides: {
      root: {
        "&:hover": {
          backgroundColor: baseColor,
        },
        "&.Mui-selected": {
          backgroundColor: baseColor,
          "&:hover": {
            backgroundColor: baseColor,
          },
        },
      },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        "&.MuiClock-amButton": {
          backgroundColor: baseColor,
          "&:hover": {
            backgroundColor: baseColor,
          },
        },
        "&.MuiClock-pmButton": {
          backgroundColor: baseColor,
          "&:hover": {
            backgroundColor: baseColor,
          },
        },
      },
    },
  },
  MuiClock: {
    styleOverrides: {
      pin: {
        backgroundColor: baseColor,
        "&:hover": {
          backgroundColor: baseColor,
        },
      },
    },
  },
  MuiClockPointer: {
    styleOverrides: {
      root: {
        backgroundColor: baseColor,
        "&:hover": {
          backgroundColor: baseColor,
        },
      },
      thumb: {
        backgroundColor: baseColor,
        border: `16px solid ${baseColor}`,
        "&:hover": {
          backgroundColor: baseColor,
        },
      },
    },
  },
  MuiTabs: {
    styleOverrides: {
      indicator: {
        backgroundColor: chroma(baseColor).darken(0.5).hex(),
        height: "3px",
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        MuiSelect: {
          root: {
            "&.Mui-focused": {
              MuiOutlinedInput: {
                notchedOutline: {
                  borderColor: baseColor,
                },
              },
            },
          },
        },
      },
    },
  },
});

export default MuiOverrides;
