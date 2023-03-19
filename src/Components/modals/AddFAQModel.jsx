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
import { MuiTextField } from "../auth/authStyle";
import { getFAQs } from "../RealTimeFunctions/practiceRoomFunctions";

export default function AddFAQModel({ open, handleClose, setTitleList }) {
  const [readyToSend, setReadyToSend] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [data, setData] = React.useState({
    title: "",
    description: "",
  });

  const handleTitleForm = (value, key) => {
    setData({ ...data, [key]: value });
  };

  const handleTitleAdd = async () => {
    setReadyToSend(false);
    setLoading(true);
    await database.createDocument("main", "faqs", ID.unique(), data);
    await getFAQs(setTitleList);
    setLoading(false);
    handleClose();
  };

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
        Add FAQ
      </DialogTitle>
      <DialogContent>
        <DialogContentText style={{ padding: "0.5rem 0" }}>
          <MuiTextField
            style={{ width: "100%" }}
            id="standard-basic"
            label="Title"
            variant="standard"
            autoFocus={false}
            onChange={(e) => handleTitleForm(e.target.value, "title")}
          />
          <MuiTextField
            style={{ width: "100%" }}
            id="standard-basic"
            label="Description"
            variant="standard"
            autoFocus={false}
            multiline
            rows={5}
            onChange={(e) => handleTitleForm(e.target.value, "description")}
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} style={{ color: secondBase }}>
          Cancel
        </Button>
        <Button
          disabled={!readyToSend}
          style={{ color: baseColor }}
          onClick={handleTitleAdd}
        >
          {loading ? "Adding.." : "Done"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
