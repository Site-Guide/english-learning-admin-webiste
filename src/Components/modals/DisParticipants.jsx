import {
  Checkbox,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
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
import { getCourses } from "../RealTimeFunctions/courses";

const checkboxStyle = {
  color: baseColor,
  "&.Mui-checked": {
    color: baseColor,
  },
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function DisParticipants({
  open,
  handleClose,
  data,
  setData,
  addAdmins,
  currentDis,
  setCourseSelectedUsers,
  setCourseDiscussion,
}) {
  const [partList, setPartList] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [selected, setSelected] = React.useState([]);
  const [courses, setCourses] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [courseIdSelected, setCourseIdSelected] = React.useState([]);
  const [courseSelected, setCourseSelected] = React.useState("Select Course");

  const handleChangeCourse = (event) => {
    const {
      target: { value },
    } = event;
    const d = typeof value === "string" ? value.split(",") : value;
    setCourseIdSelected(d);
    if (d.length > 0) {
      setCourseSelected(`${d.length} Course Selected`);
    } else {
      setCourseSelected(`Select Course`);
    }
  };

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

  const handleSave = async () => {
    setLoading(true);
    let final = [];
    if (courseIdSelected.length > 0) {
      setCourseDiscussion([...courseIdSelected]);
      await Promise.all(
        courseIdSelected.map(async (courseId) => {
          const coursePurchases = await database.listDocuments(
            "main",
            "purchases",
            [Query.equal("typeId", courseId)]
          );
          let selectedUsers = [];
          coursePurchases?.documents?.map((purchase) => {
            selectedUsers = [...selectedUsers, purchase?.uid];
          });
          final = [...final, ...selectedUsers];
          setCourseSelectedUsers([...final]);
        })
      );
    }
    if (addAdmins) {
      setData({ ...data, admins: selected });
    } else {
      setData({ ...data, participants: selected });
    }
    setLoading(false);
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
      const part = pa?.documents?.filter((fil) => fil.isAdmin != true);
      setPartList(part);
    }
  };
  React.useEffect(() => {
    getParts();
    getCourses(setCourses);
    if (currentDis?.$id !== undefined) {
      if (addAdmins) {
        if (data?.admins[0] != null) {
          setSelected([...data?.admins]);
        }
      } else {
        if (data?.participants[0] != null) {
          setSelected([...data?.participants]);
        }
        if (data?.courseSelected?.length > 0) {
          setCourseIdSelected([...data?.courseSelected]);
          setCourseSelected(`${data?.courseSelected?.length} Course Selected`);
        }
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
        {!addAdmins && (
          <Select
            labelId="CourseIdSelected"
            id="CourseIdSelected"
            multiple
            value={courseIdSelected}
            onChange={handleChangeCourse}
            // input={<OutlinedInput label="Courses" />}
            renderValue={(selected) => courseSelected}
            MenuProps={MenuProps}
            style={{
              flex: 1,
              marginLeft: "1rem",
              height: "2rem",
              maxWidth: "50%",
            }}
          >
            {courses.map((name) => (
              <MenuItem key={name.$id} value={name.$id}>
                <Checkbox
                  sx={checkboxStyle}
                  checked={courseIdSelected.indexOf(name.$id) > -1}
                />
                <ListItemText primary={name.title} />
              </MenuItem>
            ))}
          </Select>
        )}
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
        <Button
          style={{ color: baseColor }}
          disabled={loading}
          onClick={handleSave}
        >
          {loading ? "Saving..." : "Done"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
