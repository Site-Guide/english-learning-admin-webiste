import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getQuiz } from "../RealTimeFunctions/quiz";
import { ButtonLabel, Container, SaveOrderLabel } from "./quiz";
import DeleteIcon from "@mui/icons-material/Delete";
import { database, storage } from "../../appwrite";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { MuiTextField } from "../auth/authStyle";
import AddQuizModel from "../modals/AddQuizModel";
import chroma from "chroma-js";
import { baseColor } from "../../utils/constants";

const columns = [
  {
    id: "index",
    label: "Index",
    minWidth: 50,
  },
  { id: "question", label: "Question", minWidth: 400 },
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
function Quiz() {
  const [quizList, setQuizList] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState({});
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

  const deleteRow = async (id, fileId) => {
    await database.deleteDocument("main", "quiz_questions", id);
    if (fileId != "") {
      await storage.deleteFile("audios", fileId);
    }
    await getQuiz(setQuizList);
  };

  useEffect(() => {
    getQuiz(setQuizList);
  }, []);

  return (
    <Container>
      <div style={{ display: "flex" }}>
        <ButtonLabel
          onClick={() => {
            setOpen(true);
            setCurrentQuiz({});
          }}
        >
          + Add new Quiz
        </ButtonLabel>
      </div>
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
              {quizList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  row.delete = (
                    <DeleteIcon
                      style={{
                        cursor: "pointer",
                        color: chroma(baseColor).darken(0.5).hex(),
                      }}
                      onClick={(e) => deleteRow(row.$id, row.audio)}
                    />
                  );
                  row.edit = (
                    <ModeEditIcon
                      style={{
                        cursor: "pointer",
                        color: chroma(baseColor).darken(0.5).hex(),
                      }}
                      onClick={(e) => {
                        setCurrentQuiz(row);
                        setOpen(true);
                      }}
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
          count={quizList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {open && (
        <AddQuizModel
          open={open}
          handleClose={() => setOpen(false)}
          setQuizList={setQuizList}
          currentQuiz={currentQuiz}
          quizList={quizList}
          currentContentId={null}
        />
      )}
    </Container>
  );
}

export default Quiz;
