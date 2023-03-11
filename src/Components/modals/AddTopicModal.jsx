import { TextField, Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ID } from "appwrite";
import * as React from "react";
import { database } from "../../appwrite";
import { baseColor, secondBase } from "../../utils/constants";
import { MuiTextField } from "../auth/authStyle";
import { ButtonLabel } from "../PracticeRoom/practiceRoom";
import { getTopicList } from "../RealTimeFunctions/practiceRoomFunctions";
import AddTopicCourses from "./AddTopicCourse";

export default function AddTopicModal({ open, handleClose, setTopicList }) {
  const [readyToSend, setReadyToSend] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [openCourse, setOpenCourse] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [data, setData] = React.useState({
    date: null,
    name: "",
    description: "",
    courseId: "",
  });

  const handleTopicForm = (value, key) => {
    setData({ ...data, [key]: value });
  };

  const handleChange = (newValue) => {
    const date = new Date(newValue);
    const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    const month =
      date.getMonth() + 1 < 10 ? "" + date.getMonth() + 1 : date.getMonth() + 1;
    const dateString = day + "-" + month + "-" + date.getFullYear();
    handleTopicForm(dateString, "date");
    setValue(newValue);
  };

  const handleTopicAdd = async () => {
    setReadyToSend(false);
    setLoading(true);
    await database.createDocument("main", "topics", ID.unique(), data);
    await getTopicList(setTopicList);
    setLoading(false);
    handleClose();
  };

  React.useEffect(() => {
    if (
      data.topic !== "" &&
      data.description !== "" &&
      data.date !== null &&
      data.courseId !== ""
    ) {
      setReadyToSend(true);
    } else {
      setReadyToSend(false);
    }
  }, [data.topic, data.date, data.description, data.courseId]);
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{ display: "flex", alignItems: "center" }}>
        Add Topics
      </DialogTitle>
      <DialogContent>
        <DialogContentText style={{ padding: "0.5rem 0" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Topic Date"
              inputFormat="DD-MM-YYYY"
              value={value}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <MuiTextField
            style={{ width: "100%" }}
            id="standard-basic"
            label="Topic Name"
            variant="standard"
            autoFocus={false}
            onChange={(e) => handleTopicForm(e.target.value, "name")}
          />
          <MuiTextField
            style={{ width: "100%" }}
            id="standard-basic"
            label="Topic Description"
            variant="standard"
            autoFocus={false}
            multiline
            rows={3}
            onChange={(e) => handleTopicForm(e.target.value, "description")}
          />
          <Tooltip
            title={
              data.courseId === "" ? "No Course Selected" : data.courseName
            }
            placement="left"
          >
            <ButtonLabel
              style={{ marginLeft: "auto", width: "30%" }}
              onClick={() => setOpenCourse(true)}
            >
              Add Course
            </ButtonLabel>
          </Tooltip>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} style={{ color: secondBase }}>
          Cancel
        </Button>
        <Button
          disabled={!readyToSend}
          style={{ color: baseColor }}
          onClick={handleTopicAdd}
        >
          {loading ? "Adding.." : "Done"}
        </Button>
      </DialogActions>
      {openCourse && (
        <AddTopicCourses
          open={openCourse}
          handleClose={() => setOpenCourse(false)}
          data={data}
          setData={setData}
        />
      )}
    </Dialog>
  );
}
