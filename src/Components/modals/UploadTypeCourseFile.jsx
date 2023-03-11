import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ID } from "appwrite";
import * as React from "react";
import { functions, storage } from "../../appwrite";
import {
  baseColor,
  S3_LINK_FUNCTION_ID,
  secondBase,
} from "../../utils/constants";
import { ButtonLabel } from "../MainPanel/mainPanel";

export default function UploadTypeCourseFile({
  open,
  handleClose,
  setData,
  data,
  typeValue,
}) {
  const [fileName, setFileName] = React.useState("");
  const [file, setFile] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const uploadFile = async () => {
    try {
      setLoading(true);
      const s3Link = await functions.createExecution(
        S3_LINK_FUNCTION_ID,
        JSON.stringify({ fileName: fileName })
      );

      const s3UploadURL = JSON.parse(s3Link?.response).uploadURL;

      const res = await fetch(s3UploadURL, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: file,
      });

      if (res.status == 200) {
        setData({ ...data, link: s3UploadURL.split("?")[0] });
      }

      setLoading(false);
      handleClose();
    } catch (err) {
      setLoading(false);
      handleClose();
      setError(err);
    }
  };

  const selectUploadFile = (_file) => {
    setFileName(_file.name);
    setFile(_file);
  };

  const accept = {
    video: "video/mp4,video/x-m4v,video/*",
    image: "image/png, image/gif, image/jpeg",
    file: "",
    audio: ".mp3,audio/*",
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle
        style={{ display: "flex", alignItems: "center", fontSize: "15px" }}
      >
        Upload {typeValue}
        <span style={{ color: "red", fontSize: "12px", margin: "0px 10px" }}>
          {error !== "" && error}
        </span>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <input
            type="file"
            accept={accept[typeValue]}
            hidden
            id="UploadButton"
            onChange={(e) => selectUploadFile(e.target.files[0])}
          />
          <ButtonLabel
            style={{ width: "30%", margin: "1rem auto" }}
            htmlFor="UploadButton"
          >
            Upload {typeValue}
          </ButtonLabel>
          {fileName}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} style={{ color: secondBase }}>
          Cancel
        </Button>
        <Button
          disabled={loading}
          style={{ color: baseColor }}
          onClick={uploadFile}
        >
          {loading ? "Uploading..." : "Upload"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
