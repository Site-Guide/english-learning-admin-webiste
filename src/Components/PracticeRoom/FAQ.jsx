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
import AddFAQModel from "../modals/AddFAQModel";
import { getFAQs } from "../RealTimeFunctions/practiceRoomFunctions";
import { ButtonLabel, Container } from "./practiceRoom";
import DeleteIcon from "@mui/icons-material/Delete";
import { database } from "../../appwrite";

const columns = [
  { id: "title", label: "Title", minWidth: 200 },
  {
    id: "description",
    label: "Description",
    minWidth: 500,
  },
  {
    id: "actions",
    label: "",
    minWidth: 50,
  },
];
function FAQ() {
  const [titleList, setTitleList] = useState([]);
  const [open, setOpen] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteRow = async (id) => {
    await database.deleteDocument("main", "faqs", id);
    await getFAQs(setTitleList);
  };

  useEffect(() => {
    getFAQs(setTitleList);
  }, []);

  return (
    <Container>
      <ButtonLabel onClick={() => setOpen(true)}>+ Add new FAQ</ButtonLabel>
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
              {titleList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  row.actions = (
                    <DeleteIcon
                      style={{
                        cursor: "pointer",
                        color: "darkorange",
                      }}
                      onClick={(e) => deleteRow(row.$id)}
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
          count={titleList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {open && (
        <AddFAQModel
          open={open}
          handleClose={() => setOpen(false)}
          setTitleList={setTitleList}
        />
      )}
    </Container>
  );
}

export default FAQ;
