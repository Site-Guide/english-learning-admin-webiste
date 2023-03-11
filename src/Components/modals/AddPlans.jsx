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
import { MuiTextField } from "../Discussion/discussion";
import { getPlans } from "../RealTimeFunctions/plans";

export default function AddPlans({ open, handleClose, setPlans }) {
  const [readyToSend, setReadyToSend] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState({
    name: "",
    description: "",
    price: 0,
    calls: 0,
  });

  const handlePlanForm = (value, key) => {
    setData({ ...data, [key]: value });
  };

  const handlePlanCreate = async () => {
    setReadyToSend(false);
    setLoading(true);
    await database.createDocument("main", "plans", ID.unique(), data);
    await getPlans(setPlans);
    setLoading(false);
    handleClose();
  };

  React.useEffect(() => {
    if (
      data.name !== "" &&
      data.description !== "" &&
      data.price !== 0 &&
      data.calls !== 0
    ) {
      setReadyToSend(true);
    } else {
      setReadyToSend(false);
    }
  }, [data.name, data.description, data.price, data.calls]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{ display: "flex", alignItems: "center" }}>
        Create Plan
      </DialogTitle>
      <DialogContent>
        <DialogContentText style={{ padding: "0.5rem 0" }}>
          <MuiTextField
            style={{ width: "100%" }}
            id="standard-basic"
            label="Name"
            variant="standard"
            autoFocus={false}
            value={data.name}
            onChange={(e) => handlePlanForm(e.target.value, "name")}
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
            onChange={(e) => handlePlanForm(e.target.value, "description")}
          />
          <div style={{ display: "flex", alignItems: "center" }}>
            <MuiTextField
              style={{ width: "60%", marginRight: "20px" }}
              id="standard-basic"
              label="Price"
              variant="standard"
              autoFocus={false}
              value={data.price}
              type="number"
              onChange={(e) => handlePlanForm(e.target.value, "price")}
            />
            <MuiTextField
              style={{ width: "60%" }}
              id="standard-basic"
              label="Calls"
              variant="standard"
              type="number"
              autoFocus={false}
              value={data.calls}
              onChange={(e) => handlePlanForm(e.target.value, "calls")}
            />
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} style={{ color: secondBase }}>
          Cancel
        </Button>
        <Button
          disabled={!readyToSend}
          style={{ color: baseColor }}
          onClick={handlePlanCreate}
        >
          {loading ? "Creating.." : "Done"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
