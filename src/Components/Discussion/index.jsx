import DeleteIcon from "@mui/icons-material/Delete";
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
import { database, storage } from "../../appwrite";
import AddDiscussion from "../modals/AddDiscussion";
import { getDiscussion } from "../RealTimeFunctions/discussion";
import { ButtonLabel, Container, DisImage } from "./discussion";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import chroma from "chroma-js";
import { baseColor } from "../../utils/constants";

const columns = [
  { id: "index", label: "Index", minWidth: 30 },
  { id: "viewImage", label: "Image", minWidth: 50 },
  { id: "title", label: "Title", minWidth: 250 },
  {
    id: "description",
    label: "Description",
    minWidth: 500,
  },
  {
    id: "edit",
    label: "",
    minWidth: 50,
  },
  {
    id: "delete",
    label: "",
    minWidth: 50,
  },
];
function Discussion() {
  const [disList, setDisList] = useState([]);
  const [open, setOpen] = useState(false);
  const [page, setPage] = React.useState(0);
  const [currentDis, setCurrentDis] = React.useState({});
  const [rowsPerPage, setRowsPerPage] = React.useState(7);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteRow = async (id, fileId) => {
    await database.deleteDocument("main", "discussions", id);
    if (fileId != "") {
      await storage.deleteFile("discussions", fileId);
    }
    await getDiscussion(setDisList);
  };

  useEffect(() => {
    getDiscussion(setDisList);
  }, []);

  return (
    <Container>
      <ButtonLabel
        onClick={() => {
          setOpen(true);
          setCurrentDis({});
        }}
      >
        + Create Discussion
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
              {disList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  row.index = <p>{index + 1}</p>;
                  row.viewImage = (
                    <a
                      href={storage.getFileView("discussions", row.image).href}
                      target="_blank"
                      style={{ cursor: "pointer" }}
                    >
                      <DisImage
                        src={storage.getFileView("discussions", row.image)}
                      />
                    </a>
                  );
                  row.edit = (
                    <ModeEditIcon
                      style={{
                        cursor: "pointer",
                        color: chroma(baseColor).darken(0.5).hex(),
                      }}
                      onClick={(e) => {
                        setCurrentDis({ ...row });
                        setOpen(true);
                      }}
                    />
                  );
                  row.delete = (
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
          count={disList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {open && (
        <AddDiscussion
          open={open}
          handleClose={() => setOpen(false)}
          setDisList={setDisList}
          disList={disList}
          currentDis={currentDis}
        />
      )}
    </Container>
  );
}

export default Discussion;
