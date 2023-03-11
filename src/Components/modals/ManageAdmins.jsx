import { TextField } from "@mui/material";
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
import { AdminsList } from "../MainPanel/mainPanel";
import AdminRoles from "./AdminRoles";

export default function ManageAdmins({ open, handleClose }) {
  const [admins, setAdmins] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [openRoles, setOpenRoles] = React.useState(false);
  const [currentAdmin, setCurrentAdmin] = React.useState({});

  const getAdmins = async () => {
    const ad = await database.listDocuments("main", "profiles", [
      Query.equal("isAdmin", true),
    ]);
    setAdmins(ad.documents);
  };
  React.useEffect(() => {
    getAdmins();
  }, []);
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{ display: "flex", alignItems: "center" }}>
        Manage Admins
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
          {admins
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
              (admin) =>
                admin.email != "root@engexpert.com" && (
                  <AdminsList
                    onClick={() => {
                      setOpenRoles(true);
                      setCurrentAdmin(admin);
                    }}
                  >
                    <p>{admin.name}</p>
                    <p>{admin.email}</p>
                  </AdminsList>
                )
            )}
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
      {openRoles && (
        <AdminRoles
          open={openRoles}
          handleClose={() => setOpenRoles(false)}
          admin={currentAdmin}
          getAdmins={getAdmins}
        />
      )}
    </Dialog>
  );
}
