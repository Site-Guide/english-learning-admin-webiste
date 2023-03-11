import { Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ID } from "appwrite";
import * as React from "react";
import { database, storage } from "../../appwrite";
import { baseColor, secondBase } from "../../utils/constants";
import { ButtonLabel, CoursesBox, MuiTextField } from "../Courses/courses";
import { getCourses } from "../RealTimeFunctions/courses";
import AddOtherCourses from "./AddOtherCourses";
import AddSections from "./AddSections";
import UploadCourseImage from "./UploadCourseImage";

export default function AddCourse({
  open,
  handleClose,
  setCourses,
  currentCourse,
}) {
  const [readyToSend, setReadyToSend] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [openImage, setOpenImage] = React.useState(false);
  const [currentCourseID, setCurrentCourseID] = React.useState("");
  const [openOtherCourses, setOpenOtherCourses] = React.useState(false);
  const [openSection, setOpenSection] = React.useState(false);
  const [data, setData] = React.useState({
    title: "",
    description: "",
    image: "",
    price: "",
    duration: "",
    calls: "",
    bunchOf: [],
  });

  const handleCourseForm = (value, key) => {
    setData({ ...data, [key]: value });
  };

  const handleCourseCreate = async (sections) => {
    setReadyToSend(false);
    setLoading(true);
    if (currentCourse.$id != undefined) {
      await database.updateDocument("main", "courses", currentCourse.$id, data);
    } else {
      const course = await database.createDocument(
        "main",
        "courses",
        ID.unique(),
        data
      );
      setCurrentCourseID(course.$d);
    }
    await getCourses(setCourses);
    setLoading(false);
    if (sections) {
      setOpenSection(true);
      setReadyToSend(true);
    } else {
      handleClose();
    }
  };

  React.useEffect(() => {
    if (currentCourse.$id != undefined) {
      setCurrentCourseID(currentCourse.$id);
      setData({
        title: currentCourse.title,
        description: currentCourse.description,
        image: currentCourse.image,
        price: currentCourse.price,
        duration: currentCourse.duration,
        calls: currentCourse.calls,
        bunchOf: currentCourse.bunchOf,
      });
    }
  }, []);

  React.useEffect(() => {
    if (
      data.title !== "" &&
      data.description !== "" &&
      data.duration !== "" &&
      data.calls !== "" &&
      data.price !== "" &&
      data.image !== ""
    ) {
      setReadyToSend(true);
    } else {
      setReadyToSend(false);
    }
  }, [
    data.title,
    data.description,
    data.duration,
    data.calls,
    data.price,
    data.image,
  ]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{ display: "flex", alignItems: "center" }}>
        {currentCourse.title === undefined ? "Create Course" : "Edit Course"}
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
            onChange={(e) => handleCourseForm(e.target.value, "title")}
          />
          <MuiTextField
            style={{ width: "100%" }}
            id="standard-basic"
            label="Description"
            variant="standard"
            autoFocus={false}
            multiline
            rows={5}
            value={data.description}
            onChange={(e) => handleCourseForm(e.target.value, "description")}
          />
          <div style={{ display: "flex" }}>
            <MuiTextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="Price"
              variant="standard"
              autoFocus={false}
              type="number"
              value={data.price}
              onChange={(e) => handleCourseForm(e.target.value, "price")}
            />
            <MuiTextField
              style={{ width: "100%", marginLeft: "20px" }}
              id="standard-basic"
              label="Duration"
              variant="standard"
              autoFocus={false}
              type="number"
              value={data.duration}
              onChange={(e) => handleCourseForm(e.target.value, "duration")}
            />
            <MuiTextField
              style={{ width: "100%", marginLeft: "20px" }}
              id="standard-basic"
              label="Calls"
              variant="standard"
              autoFocus={false}
              type="number"
              value={data.calls}
              onChange={(e) => handleCourseForm(e.target.value, "calls")}
            />
          </div>
          <CoursesBox>
            <Tooltip
              title={
                data.image == ""
                  ? "No Image"
                  : storage.getFileView("courses", data.image).href
              }
              placement="left"
            >
              <ButtonLabel onClick={() => setOpenImage(true)}>
                Add Image
              </ButtonLabel>
            </Tooltip>
            <Tooltip
              title={
                data.bunchOf.length === 0
                  ? "No Courses"
                  : `${data.bunchOf.length} Courses`
              }
              placement="top"
            >
              <ButtonLabel
                style={{ marginLeft: "15px" }}
                onClick={() => setOpenOtherCourses(true)}
              >
                Make Bunch
              </ButtonLabel>
            </Tooltip>
            <ButtonLabel
              style={{
                marginLeft: "15px",
                cursor: readyToSend ? "pointer" : "default",
              }}
              onClick={() => readyToSend && handleCourseCreate(true)}
            >
              Sections
            </ButtonLabel>
          </CoursesBox>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} style={{ color: secondBase }}>
          Cancel
        </Button>
        <Button
          disabled={!readyToSend}
          style={{ color: baseColor }}
          onClick={() => handleCourseCreate(false)}
        >
          {loading
            ? currentCourse.title === undefined
              ? "Creating.."
              : "Updating.."
            : "Done"}
        </Button>
      </DialogActions>
      {openImage && (
        <UploadCourseImage
          open={openImage}
          handleClose={() => setOpenImage(false)}
          data={data}
          setData={setData}
        />
      )}
      {openOtherCourses && (
        <AddOtherCourses
          open={openOtherCourses}
          handleClose={() => setOpenOtherCourses(false)}
          setData={setData}
          data={data}
        />
      )}
      {openSection && (
        <AddSections
          open={AddSections}
          handleClose={() => setOpenSection(false)}
          currentCourseId={currentCourseID}
        />
      )}
    </Dialog>
  );
}
