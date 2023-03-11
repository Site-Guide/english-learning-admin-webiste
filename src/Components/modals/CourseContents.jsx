import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ID, Query } from "appwrite";
import * as React from "react";
import { database } from "../../appwrite";
import { baseColor, secondBase } from "../../utils/constants";
import {
  ButtonLabel,
  ContentsList,
  MuiTextField,
  SectionsList,
} from "../Courses/courses";
import DeleteIcon from "@mui/icons-material/Delete";
import chroma from "chroma-js";
import AddContent from "./AddContent";

export default function CourseContents({
  open,
  handleClose,
  currentCourseId,
  currentSectionId,
}) {
  const [currentContent, setCurrentContent] = React.useState({});
  const [contents, setContents] = React.useState([]);
  const [openAdd, setOpenAdd] = React.useState(false);

  const deleteRow = async (id) => {
    await database.deleteDocument("main", "sections", id);
    await getContents();
  };

  const getContents = async () => {
    const response = await database.listDocuments("main", "contents", [
      Query.orderDesc("$createdAt"),
    ]);
    setContents([...response.documents]);
  };

  React.useEffect(() => {
    getContents();
  }, []);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{ display: "flex", alignItems: "center" }}>
        Section Contents
      </DialogTitle>
      <DialogContent>
        <DialogContentText style={{ padding: "0.5rem 0" }}>
          <ButtonLabel
            style={{ width: "30%", margin: 0, marginBottom: "20px" }}
            onClick={() => {
              setCurrentContent({});
              setOpenAdd(true);
            }}
          >
            Add Content
          </ButtonLabel>
          {contents.map((content, index) => (
            <ContentsList
              onClick={() => {
                setCurrentContent({ ...content });
                setOpenAdd(true);
              }}
            >
              <p>
                {index + 1}. {content.title}
              </p>
              <DeleteIcon
                style={{
                  cursor: "pointer",
                  color: chroma(baseColor).darken(0.5).hex(),
                }}
                onClick={(e) => deleteRow(content.$id)}
              />
            </ContentsList>
          ))}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} style={{ color: secondBase }}>
          Cancel
        </Button>
        <Button style={{ color: baseColor }} onClick={handleClose}>
          Done
        </Button>
      </DialogActions>
      {openAdd && (
        <AddContent
          open={openAdd}
          handleClose={() => setOpenAdd(false)}
          currentCourseId={currentCourseId}
          currentSectionId={currentSectionId}
          currentContent={currentContent}
        />
      )}
    </Dialog>
  );
}
