import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ID } from "appwrite";
import * as React from "react";
import { storage } from "../../appwrite";
import { baseColor, secondBase } from "../../utils/constants";
import { ButtonLabel } from "../MainPanel/mainPanel";

export default function UploadCourseImage({
  open,
  handleClose,
  setData,
  data,
}) {
  const [fileName, setFileName] = React.useState("");
  const [file, setFile] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const uploadFile = async () => {
    setLoading(true);
    const res = await storage.createFile("courses", ID.unique(), file);
    setData({ ...data, image: res.$id });
    setLoading(false);
    handleClose();
  };

  const selectUploadFile = (_file) => {
    setFileName(_file.name);
    setFile(_file);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle
        style={{ display: "flex", alignItems: "center", fontSize: "15px" }}
      >
        Upload Image
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <input
            type="file"
            accept="image/png, image/gif, image/jpeg"
            hidden
            id="UploadButton"
            onChange={(e) => selectUploadFile(e.target.files[0])}
          />
          <ButtonLabel
            style={{ width: "30%", margin: "1rem auto" }}
            htmlFor="UploadButton"
          >
            Upload Image
          </ButtonLabel>
          {fileName}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} style={{ color: secondBase }}>
          Cancel
        </Button>
        <Button
          disabled={fileName == ""}
          style={{ color: baseColor }}
          onClick={uploadFile}
        >
          {loading ? "Uploading..." : "Upload"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
