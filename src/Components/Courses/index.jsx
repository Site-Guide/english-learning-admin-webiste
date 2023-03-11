import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getCourses } from "../RealTimeFunctions/courses";
import { ButtonLabel, Container } from "./courses";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { baseColor } from "../../utils/constants";
import chroma from "chroma-js";
import { database, storage } from "../../appwrite";
import AddCourse from "../modals/AddCourse";

const columns = [
  { id: "index", label: "Index", minWidth: 30 },
  { id: "title", label: "Title", minWidth: 100 },
  {
    id: "description",
    label: "Description",
    minWidth: 180,
  },
  {
    id: "imagePreview",
    label: "Image",
    minWidth: 70,
  },
  {
    id: "price",
    label: "Price",
    minWidth: 50,
  },
  {
    id: "duration",
    label: "Duration",
    minWidth: 50,
  },
  {
    id: "calls",
    label: "Calls",
    minWidth: 50,
  },
  {
    id: "bunch",
    label: "Bunch",
    minWidth: 50,
  },
  {
    id: "editCourse",
    label: "",
    minWidth: 20,
  },
  {
    id: "deleteCourse",
    label: "",
    minWidth: 20,
  },
];
function Courses() {
  const [courses, setCourses] = useState([]);
  const [page, setPage] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [currentCourse, setCurrentCourse] = React.useState({});
  const [rowsPerPage, setRowsPerPage] = React.useState(7);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteRow = async (id, fileId) => {
    await database.deleteDocument("main", "courses", id);
    if (fileId != "") {
      await storage.deleteFile("courses", fileId);
    }
    await getCourses(setCourses);
  };

  useEffect(() => {
    getCourses(setCourses);
  }, []);

  return (
    <Container>
      <ButtonLabel
        onClick={() => {
          setOpen(true);
          setCurrentCourse({});
        }}
      >
        + Create Course
      </ButtonLabel>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440, minHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      color: "grey",
                      fontWeight: 700,
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {courses
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  row.index = <p>{index + 1}</p>;
                  row.imagePreview = (
                    <a
                      href={storage.getFileView("courses", row.image).href}
                      target="_blank"
                    >
                      <img
                        src={storage.getFileView("courses", row.image)}
                        style={{
                          height: "40px",
                          width: "60px",
                          cursor: "pointer",
                        }}
                      />
                    </a>
                  );
                  row.bunch =
                    row.bunchOf.length == 0 ? <p>False</p> : <p>True</p>;
                  row.editCourse = (
                    <ModeEditIcon
                      style={{
                        cursor: "pointer",
                        color: chroma(baseColor).darken(0.5).hex(),
                      }}
                      onClick={(e) => {
                        setCurrentCourse({ ...row });
                        setOpen(true);
                      }}
                    />
                  );
                  row.deleteCourse = (
                    <DeleteIcon
                      style={{
                        cursor: "pointer",
                        color: chroma(baseColor).darken(0.5).hex(),
                      }}
                      onClick={(e) => deleteRow(row.$id, row.image)}
                    />
                  );
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[7]}
          component="div"
          count={courses.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {open && (
        <AddCourse
          open={open}
          handleClose={() => setOpen(false)}
          currentCourse={currentCourse}
          setCourses={setCourses}
        />
      )}
    </Container>
  );
}

export default Courses;
