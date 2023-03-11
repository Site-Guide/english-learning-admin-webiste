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
import { ButtonLabel, MuiTextField, SectionsList } from "../Courses/courses";
import DeleteIcon from "@mui/icons-material/Delete";
import chroma from "chroma-js";
import CourseContents from "./CourseContents";

export default function AddSections({ open, handleClose, currentCourseId }) {
  const [loading, setLoading] = React.useState(false);
  const [sectionName, setSectionName] = React.useState("");
  const [sections, setSections] = React.useState([]);
  const [currentSectionID, setCurrentSectionID] = React.useState("");
  const [openContent, setOpenContent] = React.useState(false);

  const handleAddSection = async () => {
    if (sectionName !== "") {
      setLoading(true);
      await database.createDocument("main", "sections", ID.unique(), {
        name: sectionName,
        courseId: currentCourseId,
      });
      await getAllSections();
      setLoading(false);
      setSectionName("");
    }
  };

  const deleteRow = async (id) => {
    await database.deleteDocument("main", "sections", id);
    await getAllSections();
  };

  const getAllSections = async () => {
    const response = await database.listDocuments("main", "sections", [
      Query.equal("courseId", currentCourseId),
    ]);
    setSections([...response.documents]);
  };

  React.useEffect(() => {
    getAllSections();
  }, []);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{ display: "flex", alignItems: "center" }}>
        Course Sections
      </DialogTitle>
      <DialogContent>
        <DialogContentText style={{ padding: "0.5rem 0" }}>
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <MuiTextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="Name"
              variant="standard"
              autoFocus={false}
              value={sectionName}
              onChange={(e) => setSectionName(e.target.value)}
            />
            <ButtonLabel
              style={{ marginLeft: "15px" }}
              onClick={() => !loading && handleAddSection()}
            >
              Add
            </ButtonLabel>
          </div>

          {sections.map((section, index) => (
            <SectionsList
              onClick={() => {
                setCurrentSectionID(section.$id);
                setOpenContent(true);
              }}
            >
              <p>
                {index + 1}. {section.name}
              </p>
              <DeleteIcon
                style={{
                  cursor: "pointer",
                  color: chroma(baseColor).darken(0.5).hex(),
                }}
                onClick={(e) => deleteRow(section.$id)}
              />
            </SectionsList>
          ))}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} style={{ color: secondBase }}>
          Cancel
        </Button>
        <Button
          disabled={loading}
          style={{ color: baseColor }}
          onClick={handleClose}
        >
          {loading ? "Updating.." : "Done"}
        </Button>
      </DialogActions>
      {openContent && (
        <CourseContents
          open={openContent}
          handleClose={() => setOpenContent(false)}
          currentSectionId={currentSectionID}
          currentCourseId={currentCourseId}
        />
      )}
    </Dialog>
  );
}
