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
  };

  const handleTopicAdd = async () => {
    let comma = ",";
    if (data == "") {
      comma = "";
    }
    const final = data + comma + startValueString + "-" + endValueString;
    // console.log(final.split(","));
    setData(final);
    setStartValueString("");
    setEndValueString("");
  };

  const handleDone = async () => {
    setLoading(true);
    console.log("data", data);
    await database.updateDocument(
      "main",
      "masterdata",
      "v1",
      JSON.stringify(data)
    );
    setLoading(false);
    handleClose();
  };

  const getSlots = async () => {
    const response = await database.getDocument("main", "masterdata", "v1");
    console.log(response);
    // let slots = response.slots.join(",");
    setData(response.slots);
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
          <Button style={{ color: baseColor }} onClick={handleTopicAdd}>
            Add
          </Button>
        </DialogContentText>
        {data}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} style={{ color: secondBase }}>
          Cancel
        </Button>
        <Button style={{ color: baseColor }} onClick={handleDone}>
          {loading ? "Adding..." : "Done"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
