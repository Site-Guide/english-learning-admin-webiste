import { MenuItem, Select } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import { baseColor, secondBase } from "../../utils/constants";
import { MuiTextField } from "../Courses/courses";

export default function AddContent({
  open,
  handleClose,
  currentCourseId,
  currentSectionId,
  currentContent,
}) {
  const [loading, setLoading] = React.useState(false);
  const [contents, setContents] = React.useState([]);
  const [data, setData] = React.useState({});
  const [typeValue, setTypeValue] = React.useState("");

  const handleContentForm = (value, key) => {
    setData({ ...data, [key]: value });
  };

  React.useEffect(() => {
    let con = { sectionId: currentSectionId, courseId: currentCourseId };
    if (currentContent?.$id != undefined) {
      con = {
        ...con,
        title: currentContent.title,
        description: currentContent.description,
        link: currentContent.link,
        type: currentContent.type,
      };
    } else {
      con = {
        ...con,
        title: "",
        description: "",
        link: "",
        type: "",
      };
    }
    setData({ ...con });
  }, []);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{ display: "flex", alignItems: "center" }}>
        Content
      </DialogTitle>
      <DialogContent>
        <DialogContentText style={{ padding: "0.5rem 0" }}>
          <MuiTextField
            style={{ width: "100%" }}
            id="standard-basic"
            label="Title"
            variant="standard"
            autoFocus={false}
            value={data.title}
            onChange={(e) => handleContentForm(e.target.value, "title")}
          />
          <MuiTextField
            style={{ width: "100%" }}
            id="standard-basic"
            label="Description"
            variant="standard"
            autoFocus={false}
            value={data.description}
            onChange={(e) => handleContentForm(e.target.value, "description")}
          />
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={typeValue}
            label="Age"
            onChange={(e) => setTypeValue(e.target.value)}
          >
            <MenuItem value={"video"}>Video</MenuItem>
            <MenuItem value={"text"}>Text</MenuItem>
            <MenuItem value={"audio"}>Audio</MenuItem>
            <MenuItem value={"file"}>File</MenuItem>
            <MenuItem value={"image"}>Image</MenuItem>
            <MenuItem value={"quiz"}>Quiz</MenuItem>
          </Select>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} style={{ color: secondBase }}>
          Cancel
        </Button>
        <Button
          disabled={!loading}
          style={{ color: baseColor }}
          onClick={handleClose}
        >
          {loading ? "Updating.." : "Done"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
