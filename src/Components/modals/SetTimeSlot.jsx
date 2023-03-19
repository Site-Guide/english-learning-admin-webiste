import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DateTimePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ID } from "appwrite";
import * as React from "react";
import { database } from "../../appwrite";
import { baseColor, secondBase } from "../../utils/constants";

export default function SetTimeSlot({ open, handleClose }) {
  const [loading, setLoading] = React.useState(false);
  const [add, setAdd] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [startValue, setStartValue] = React.useState(null);
  const [startValueString, setStartValueString] = React.useState("");
  const [endValue, setEndValue] = React.useState(null);
  const [endValueString, setEndValueString] = React.useState("");
  const [data, setData] = React.useState("");

  const handleStartChange = (newValue) => {
    const date = new Date(newValue);
    let am = "AM";
    let h = date.getHours();
    let m = date.getMinutes();
    if (h > 12) {
      h = h - 12;
      am = "PM";
    }
    if (h < 10) {
      h = "0" + h;
    }
    if (m < 10) {
      m = "0" + m;
    }
    setStartValueString(h + ":" + m + " " + am);
    setStartValue(newValue);
    if (endValueString !== "") {
      setAdd(true);
    }
  };

  const handleEndChange = (newValue) => {
    const date = new Date(newValue);
    let am = "AM";
    let h = date.getHours();
    let m = date.getMinutes();
    if (h > 12) {
      h = h - 12;
      am = "PM";
    }
    if (h < 10) {
      h = "0" + h;
    }
    if (m < 10) {
      m = "0" + m;
    }
    setEndValueString(h + ":" + m + " " + am);
    setEndValue(newValue);
    if (startValueString !== "") {
      setAdd(true);
    }
  };

  const handleTopicAdd = async () => {
    let comma = " | ";
    if (data == "") {
      comma = "";
    }
    const final = data + comma + startValueString + "-" + endValueString;
    console.log(final.split(" | "));
    setData(final);
    setStartValueString("");
    setEndValueString("");
    setStartValue(null);
    setEndValue(null);
    setDone(true);
  };

  const handleDone = async () => {
    setLoading(true);
    const request = [...data.split(" | ")];
    await database.updateDocument("main", "masterdata", "v1", {
      slots: request,
    });
    setLoading(false);
    handleClose();
  };

  const getSlots = async () => {
    const response = await database.getDocument("main", "masterdata", "v1");
    const slots = response.slots.join(" | ");
    setData(slots);
  };

  React.useEffect(() => {
    getSlots();
  }, []);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{ display: "flex", alignItems: "center" }}>
        Set time slots
      </DialogTitle>
      <DialogContent>
        <DialogContentText style={{ padding: "0.5rem 0" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="Start time"
              value={startValue}
              onChange={handleStartChange}
              renderInput={(params) => <TextField {...params} />}
            />
            <TimePicker
              label="End time"
              value={endValue}
              onChange={handleEndChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <Button
            style={{
              color: add ? baseColor : "grey",
              margin: "10px 0",
              border: `2px solid ${add ? baseColor : "grey"}`,
            }}
            disabled={!add}
            onClick={handleTopicAdd}
          >
            Add
          </Button>
          {data != "" && (
            <Button
              style={{
                color: baseColor,
                margin: "10px 10px",
                border: `2px solid ${baseColor}`,
              }}
              onClick={() => {
                setData("");
                setDone(true);
              }}
            >
              Clear
            </Button>
          )}
        </DialogContentText>
        {data}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} style={{ color: secondBase }}>
          Cancel
        </Button>
        <Button
          style={{ color: done ? baseColor : "grey" }}
          onClick={handleDone}
          disabled={!done}
        >
          {loading ? "Adding..." : "Done"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
