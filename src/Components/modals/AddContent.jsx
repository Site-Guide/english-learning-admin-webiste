import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ID } from "appwrite";
import * as React from "react";
import { database } from "../../appwrite";
import { baseColor, secondBase } from "../../utils/constants";
import { ButtonLabel, MuiTextField } from "../Courses/courses";
import AddQuizModel from "./AddQuizModel";
import UploadTypeCourseFile from "./UploadTypeCourseFile";

export default function AddContent({
  open,
  handleClose,
  currentCourseId,
  currentSectionId,
  currentContent,
  setContents,
  getContents,
}) {
  const [loading, setLoading] = React.useState(false);
  const [openType, setOpenType] = React.useState(false);
  const [openQuiz, setOpenQuiz] = React.useState(false);
  const [prevQuiz, setPrevQuiz] = React.useState(false);
  const [data, setData] = React.useState({});
  const [typeValue, setTypeValue] = React.useState("");
  const [currentContentId, setCurrentContentId] = React.useState(null);

  const handleContentUpload = async (quiz) => {
    setLoading(true);
    const req = {
      ...data,
      type: typeValue,
    };
    if (currentContent?.$id !== undefined) {
      await database.updateDocument(
        "main",
        "contents",
        currentContent.$id,
        req
      );
    } else {
      const content = await database.createDocument(
        "main",
        "contents",
        ID.unique(),
        req
      );
      setCurrentContentId(content.$d);
    }
    await getContents(setContents);
    setLoading(false);
    if (quiz) {
      setOpenQuiz(true);
    } else {
      handleClose();
    }
  };

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
      setCurrentContentId(currentContent?.$id);
      setTypeValue(currentContent.type);
      if (currentContent.type == "quiz") {
        setPrevQuiz(true);
      }
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
          <FormControl
            variant="standard"
            sx={{ m: 1, minWidth: 120 }}
            style={{ width: "50%", margin: "10px 0", color: "black" }}
          >
            <InputLabel>Type</InputLabel>
            <Select
              value={typeValue}
              label="Type"
              onChange={(e) => setTypeValue(e.target.value)}
            >
              <MenuItem value={"video"}>Video</MenuItem>
              <MenuItem value={"text"}>Text</MenuItem>
              <MenuItem value={"audio"}>Audio</MenuItem>
              <MenuItem value={"file"}>File</MenuItem>
              <MenuItem value={"image"}>Image</MenuItem>
              <MenuItem value={"quiz"}>Quiz</MenuItem>
            </Select>
          </FormControl>
          {typeValue !== "" && typeValue !== "text" && typeValue !== "quiz" && (
            <Tooltip title={data.link} placement="right">
              <ButtonLabel
                style={{ width: "30%", margin: 0, marginBottom: "20px" }}
                onClick={() => setOpenType(true)}
              >
                Upload {typeValue}
              </ButtonLabel>
            </Tooltip>
          )}
          {typeValue === "quiz" && (
            <ButtonLabel
              style={{ width: "30%", margin: 0, marginBottom: "20px" }}
              onClick={() => handleContentUpload(true)}
            >
              {prevQuiz ? "Edit" : "Add"} Quiz
            </ButtonLabel>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} style={{ color: secondBase }}>
          Cancel
        </Button>
        <Button
          disabled={loading}
          style={{ color: baseColor }}
          onClick={() => handleContentUpload(false)}
        >
          {loading ? "Updating.." : "Done"}
        </Button>
      </DialogActions>
      {openType && (
        <UploadTypeCourseFile
          open={openType}
          handleClose={() => setOpenType(false)}
          typeValue={typeValue}
          data={data}
          setData={setData}
        />
      )}

      {openQuiz && (
        <AddQuizModel
          open={openQuiz}
          handleClose={() => setOpenQuiz(false)}
          currentContentId={currentContentId}
          setPrevQuiz={setPrevQuiz}
          currentQuiz={{}}
          setQuizList={() => {}}
        />
      )}
    </Dialog>
  );
}
