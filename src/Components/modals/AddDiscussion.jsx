import { Tooltip } from "@mui/material";
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
import {
  ButtonLabel,
  DiscussionBox,
  MuiTextField,
} from "../Discussion/discussion";
import { getDiscussion } from "../RealTimeFunctions/discussion";
import DisParticipants from "./DisParticipants";
import UploadDiscussionImage from "./UploadDiscussionImage";

export default function AddDiscussion({
  open,
  handleClose,
  setDisList,
  currentDis,
}) {
  const [readyToSend, setReadyToSend] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [openImage, setOpenImage] = React.useState(false);
  const [addAdmins, setAddAdmins] = React.useState(false);
  const [openParticipants, setOpenParticipants] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [courseSelectedUsers, setCourseSelectedUsers] = React.useState([]);
  const [courseDiscussion, setCourseDiscussion] = React.useState([]);
  const [data, setData] = React.useState({
    title: "",
    description: "",
    image: "",
    participants: [],
    admins: [],
    active: true,
    courseSelected: [],
  });

  const handleDisForm = (value, key) => {
    setData({ ...data, [key]: value });
  };

  const handleDisCreate = async () => {
    setReadyToSend(false);
    setLoading(true);
    let req = {};
    if (courseSelectedUsers.length > 0) {
      req = {
        ...data,
        participants: [...data.participants, ...courseSelectedUsers],
        courseSelected: [...courseDiscussion],
      };
    } else {
      req = {
        ...data,
      };
    }
    if (currentDis.$id != undefined) {
      await database.updateDocument("main", "discussions", currentDis.$id, req);
    } else {
      await database.createDocument("main", "discussions", ID.unique(), req);
    }

    await getDiscussion(setDisList);
    setLoading(false);
    handleClose();
  };

  React.useEffect(() => {
    if (currentDis.title !== "" && currentDis.description !== "") {
      setData({
        title: currentDis.title,
        description: currentDis.description,
        image: currentDis.image,
        participants: currentDis.participants,
        admins: currentDis.admins,
        active: currentDis.active,
        courseSelected: currentDis.courseSelected,
      });
    }
  }, []);

  React.useEffect(() => {
    if (data.title !== "" && data.description !== "") {
      setReadyToSend(true);
    } else {
      setReadyToSend(false);
    }
  }, [data.title, data.description]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{ display: "flex", alignItems: "center" }}>
        {currentDis.title === undefined
          ? "Create Discussion"
          : "Edit Discussion"}
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
            onChange={(e) => handleDisForm(e.target.value, "title")}
          />
          <MuiTextField
            style={{ width: "100%" }}
            id="standard-basic"
            label="Description"
            variant="standard"
            autoFocus={false}
            multiline
            rows={4}
            value={data.description}
            onChange={(e) => handleDisForm(e.target.value, "description")}
          />
          <DiscussionBox>
            <ButtonLabel onClick={() => setOpenImage(true)}>
              Add Image
            </ButtonLabel>
            <ButtonLabel
              style={{ marginLeft: "15px" }}
              onClick={() => {
                setOpenParticipants(true);
                setAddAdmins(false);
              }}
            >
              Add Participants
            </ButtonLabel>
            <ButtonLabel
              onClick={() => {
                setOpenParticipants(true);
                setAddAdmins(true);
              }}
              style={{ marginLeft: "15px" }}
            >
              Add Admins
            </ButtonLabel>
          </DiscussionBox>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} style={{ color: secondBase }}>
          Cancel
        </Button>
        <Button
          disabled={!readyToSend}
          style={{ color: baseColor }}
          onClick={handleDisCreate}
        >
          {loading
            ? currentDis.title === undefined
              ? "Creating.."
              : "Updating.."
            : "Done"}
        </Button>
      </DialogActions>
      {openImage && (
        <UploadDiscussionImage
          open={openImage}
          handleClose={() => setOpenImage(false)}
          data={data}
          setData={setData}
        />
      )}
      {openParticipants && (
        <DisParticipants
          open={openParticipants}
          handleClose={() => setOpenParticipants(false)}
          data={data}
          setData={setData}
          addAdmins={addAdmins}
          currentDis={currentDis}
          setCourseSelectedUsers={setCourseSelectedUsers}
          setCourseDiscussion={setCourseDiscussion}
        />
      )}
    </Dialog>
  );
}
