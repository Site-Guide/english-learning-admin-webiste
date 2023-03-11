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
import chroma from "chroma-js";
import React, { useEffect, useState } from "react";
import { database } from "../../appwrite";
import { baseColor } from "../../utils/constants";
import AddTopicModal from "../modals/AddTopicModal";
import { getTopicList } from "../RealTimeFunctions/practiceRoomFunctions";
import { ButtonLabel, Container } from "./practiceRoom";
const columns = [
  { id: "date", label: "Date", minWidth: 100 },
  { id: "name", label: "Topic", minWidth: 180 },
  {
    id: "description",
    label: "Description",
    minWidth: 500,
  },
  {
    id: "courseName",
    label: "Course Name",
    minWidth: 240,
  },
  {
    id: "actions",
    label: "",
    minWidth: 50,
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

  const deleteRow = async (id) => {
    await database.deleteDocument("main", "topics", id);
    await getTopicList(setTopicList);
  };

  useEffect(() => {
    getTopicList(setTopicList);
  }, []);

  return (
    <Container>
      <ButtonLabel onClick={() => setOpen(true)}>+ Add new topic</ButtonLabel>
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
              {topicList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  row.actions = (
                    <DeleteIcon
                      style={{
                        cursor: "pointer",
                        color: chroma(baseColor).darken(0.5).hex(),
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
          count={topicList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {open && (
        <AddTopicModal
          open={open}
          handleClose={() => setOpen(false)}
          setTopicList={setTopicList}
        />
      )}
    </Container>
  );
}

export default DailyTopics;
