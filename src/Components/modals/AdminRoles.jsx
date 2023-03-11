import { Checkbox, TextField } from "@mui/material";
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
import { AdminCheckboxes, AdminsList } from "../MainPanel/mainPanel";

const checkboxStyle = {
  color: baseColor,
  "&.Mui-checked": {
    color: baseColor,
  },
};

export default function AdminRoles({ open, handleClose, admin, getAdmins }) {
  const [checks, setChecks] = React.useState("");

  const handleChecks = (checked, key) => {
    if (checked) {
      let ch = { ...checks, [key]: true };
      setChecks({ ...ch });
    } else {
      let ch = { ...checks };
      delete ch[key];
      setChecks({ ...ch });
    }
  };

  const updateRole = async () => {
    await database.updateDocument("main", "profiles", admin.$id, {
      name: admin.name,
      email: admin.email,
      phone: "n/a",
      whatsapp: "n/a",
      profession: "n/a",
      purpose: "n/a",
      isAdmin: true,
      role: JSON.stringify(checks),
    });
    await getAdmins();
    handleClose();
  };

  React.useEffect(() => {
    if (admin.role != null && admin.role != undefined && admin.role != "") {
      setChecks({ ...JSON.parse(admin.role) });
    }
  }, []);
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "1rem",
          fontWeight: 600,
        }}
      >
        {admin.name}{" "}
        <span
          style={{ marginLeft: "auto", fontSize: "0.7rem", fontWeight: 400 }}
        >
          Manage Roles
        </span>
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          style={{
            padding: "0.5rem 0",
            maxHeight: "200px",
            display: "grid",
            gridTemplateColumns: " repeat( auto-fit, minmax(200px, 1fr) )",
          }}
        >
          <AdminCheckboxes>
            <Checkbox
              sx={checkboxStyle}
              checked={checks["User"] === undefined ? false : true}
              onClick={(e) => handleChecks(e.target.checked, "User")}
            />{" "}
            <p>User</p>
          </AdminCheckboxes>
          <AdminCheckboxes>
            <Checkbox
              sx={checkboxStyle}
              checked={checks["Practice Room"] === undefined ? false : true}
              onClick={(e) => handleChecks(e.target.checked, "Practice Room")}
            />{" "}
            <p>Practice Room</p>
          </AdminCheckboxes>
          <AdminCheckboxes>
            <Checkbox
              sx={checkboxStyle}
              checked={checks["Quiz"] === undefined ? false : true}
              onClick={(e) => handleChecks(e.target.checked, "Quiz")}
            />{" "}
            <p>Quiz</p>
          </AdminCheckboxes>
          <AdminCheckboxes>
            <Checkbox
              sx={checkboxStyle}
              checked={checks["Notification"] === undefined ? false : true}
              onClick={(e) => handleChecks(e.target.checked, "Notification")}
            />{" "}
            <p>Notification</p>
          </AdminCheckboxes>
          <AdminCheckboxes>
            <Checkbox
              sx={checkboxStyle}
              checked={checks["Discussion"] === undefined ? false : true}
              onClick={(e) => handleChecks(e.target.checked, "Discussion")}
            />{" "}
            <p>Discussion</p>
          </AdminCheckboxes>
          <AdminCheckboxes>
            <Checkbox
              sx={checkboxStyle}
              checked={checks["Courses"] === undefined ? false : true}
              onClick={(e) => handleChecks(e.target.checked, "Courses")}
            />{" "}
            <p>Courses</p>
          </AdminCheckboxes>
          <AdminCheckboxes>
            <Checkbox
              sx={checkboxStyle}
              checked={checks["Plans"] === undefined ? false : true}
              onClick={(e) => handleChecks(e.target.checked, "Plans")}
            />{" "}
            <p>Plans</p>
          </AdminCheckboxes>
          <AdminCheckboxes>
            <Checkbox
              sx={checkboxStyle}
              checked={checks["Purchases"] === undefined ? false : true}
              onClick={(e) => handleChecks(e.target.checked, "Purchases")}
            />{" "}
            <p>Purchases</p>
          </AdminCheckboxes>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} style={{ color: secondBase }}>
          Cancel
        </Button>
        <Button style={{ color: baseColor }} onClick={updateRole}>
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
}
