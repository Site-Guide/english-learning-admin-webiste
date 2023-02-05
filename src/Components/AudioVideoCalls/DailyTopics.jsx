import React, { useEffect, useState } from "react";
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
import { ButtonLabel, Container } from "./audioVideoCalls";
import { Query } from "appwrite";
import { database } from "../../appwrite";
import AddTopicModal from "../modals/AddTopicModal";
const columns = [
  { id: "date", label: "Date", minWidth: 170 },
  { id: "topic", label: "Topic", minWidth: 200 },
  {
    id: "description",
    label: "Description",
    minWidth: 500,
  },
];
function DailyTopics() {
  const [topicList, setTopicList] = useState([]);
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

  const getUserList = async () => {
    const response = await database.listDocuments("main", "topics", [
      Query.orderDesc("$createdAt"),
    ]);
    setTopicList([...response.documents]);
  };

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <Container>
      <ButtonLabel onClick={() => setOpen(true)}>+ Add new</ButtonLabel>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440, minHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {topicList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
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
          count={topicList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {open && <AddTopicModal open={open} handleClose={() => setOpen(false)} />}
    </Container>
  );
}

export default DailyTopics;
