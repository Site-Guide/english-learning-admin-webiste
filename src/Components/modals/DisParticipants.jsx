import { Checkbox, TextField, Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Query } from "appwrite";
import * as React from "react";
import { database } from "../../appwrite";
import { baseColor, secondBase } from "../../utils/constants";
import { PartListBox } from "../Discussion/discussion";

const checkboxStyle = {
  color: baseColor,
  "&.Mui-checked": {
    color: baseColor,
  },
};

export default function DisParticipants({
  open,
  handleClose,
  data,
  setData,
  addAdmins,
}) {
  const [partList, setPartList] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [selected, setSelected] = React.useState([]);

  const handleSelectAll = (check) => {
    if (check) {
      let arr = [];
      partList.map((p) => {
        arr = [...arr, p.$id];
      });
      setSelected([...arr]);
    } else {
      setSelected([]);
    }
  };

  const handleChecks = (check, value) => {
    if (check) {
      setSelected([...selected, value]);
    } else {
      let sel = selected.filter((f) => f != value);
      setSelected([...sel]);
    }
  };

  const handleSave = () => {
    if (addAdmins) {
      setData({ ...data, admins: selected });
    } else {
      setData({ ...data, participants: selected });
    }

    handleClose();
  };

  const getParts = async () => {
    if (addAdmins) {
      const pa = await database.listDocuments("main", "profiles", [
        Query.equal("isAdmin", true),
      ]);
      setPartList(pa.documents);
    } else {
      const pa = await database.listDocuments("main", "profiles");
      const part = pa?.documents?.filter((fil) => fil.isAdmin == null);
      setPartList(part);
    }
  };
  React.useEffect(() => {
    getParts();
    if (addAdmins) {
      if (data?.admins[0] != null) {
        setSelected([...data?.admins]);
      }
    } else {
      if (data?.participants[0] != null) {
        setSelected([...data?.participants]);
      }
    }
  }, []);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{ display: "flex", alignItems: "center" }}>
        Select {addAdmins ? "Admins" : "Participants"}{" "}
        <Tooltip title="Select All" placement="right">
          <Checkbox
            sx={checkboxStyle}
            checked={selected.length === partList?.length ? true : false}
            onClick={(e) => handleSelectAll(e.target.checked)}
          />
        </Tooltip>
      </DialogTitle>
      <DialogContent>
        <DialogContentText style={{ padding: "0.5rem 0", maxHeight: "350px" }}>
          <TextField
            style={{ width: "100%", marginBottom: "30px" }}
            id="standard-basic"
            label="Search by email"
            variant="standard"
            autoFocus={false}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {partList
            .filter((fil) => {
              if (search === "") {
                return fil;
              } else if (
                fil?.email?.toLowerCase().includes(search?.toLowerCase())
              ) {
                return fil;
              }
            })
            ?.map(
              (par) =>
                par.email != "root@engexpert.com" && (
                  <PartListBox>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Checkbox
                        sx={checkboxStyle}
                        checked={
                          selected.find((sel) => sel === par.$id) === undefined
                            ? false
                            : true
                        }
                        onClick={(e) => handleChecks(e.target.checked, par.$id)}
                      />
                      <p>{par.name}</p>
                    </div>
                    <p>{par.email}</p>
                  </PartListBox>
                )
            )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} style={{ color: secondBase }}>
          Cancel
        </Button>
        <Button style={{ color: baseColor }} onClick={handleSave}>
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
}
