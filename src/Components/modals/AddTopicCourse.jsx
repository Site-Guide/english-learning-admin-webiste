import { Checkbox, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Query } from "appwrite";
import * as React from "react";
import { database } from "../../appwrite";
import { baseColor, secondBase } from "../../utils/constants";
import { CoursesList } from "../Courses/courses";

const checkboxStyle = {
  color: baseColor,
  marginRight: "10px",
  "&.Mui-checked": {
    color: baseColor,
  },
};

export default function AddTopicCourses({ open, handleClose, data, setData }) {
  const [otherCourses, setOtherCourses] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [checks, setChecks] = React.useState("");
  const [courseName, setCourseName] = React.useState("");

  const handleChecks = (check, id, title) => {
    if (check) {
      setChecks(id);
      setCourseName(title);
    } else {
      setChecks("");
      setCourseName("");
    }
  };

  const updateTopicCourse = async () => {
    setData({ ...data, courseId: checks, courseName: courseName });
    handleClose();
  };

  const getOtherCourses = async () => {
    const response = await database.listDocuments("main", "courses", [
      Query.orderDesc("$createdAt"),
    ]);
    setOtherCourses([...response?.documents]);

    if (data?.courseId != null) {
      setChecks(data?.courseId);
    }
  };
  React.useEffect(() => {
    getOtherCourses();
  }, []);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{ display: "flex", alignItems: "center" }}>
        Make Bunch
      </DialogTitle>
      <DialogContent>
        <DialogContentText style={{ padding: "0.5rem 0", maxHeight: "350px" }}>
          <TextField
            style={{ width: "100%", marginBottom: "30px" }}
            id="standard-basic"
            label="Search by title"
            variant="standard"
            autoFocus={false}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {otherCourses
            .filter((fil) => {
              if (search === "") {
                return fil;
              } else if (
                fil?.title?.toLowerCase().includes(search?.toLowerCase())
              ) {
                return fil;
              }
            })
            ?.map((course) => (
              <CoursesList>
                <Checkbox
                  sx={checkboxStyle}
                  checked={checks === course.$id ? true : false}
                  onClick={(e) =>
                    handleChecks(e.target.checked, course.$id, course.title)
                  }
                />
                <p>{course.title}</p>
              </CoursesList>
            ))}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} style={{ color: secondBase }}>
          Cancel
        </Button>
        <Button style={{ color: baseColor }} onClick={updateTopicCourse}>
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
}
