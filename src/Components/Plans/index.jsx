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
import { database, storage } from "../../appwrite";
import { baseColor } from "../../utils/constants";
import AddPlans from "../modals/AddPlans";
import { getPlans } from "../RealTimeFunctions/plans";
import { ButtonLabel, Container } from "./plans";

const columns = [
  { id: "index", label: "Index", minWidth: 30 },
  { id: "name", label: "Name", minWidth: 200 },
  {
    id: "description",
    label: "Description",
    minWidth: 350,
  },
  {
    id: "price",
    label: "Price",
    minWidth: 100,
  },
  {
    id: "calls",
    label: "Calls",
    minWidth: 100,
  },
  {
    id: "delete",
    label: "",
    minWidth: 50,
  },
];
function Plans() {
  const [plans, setPlans] = useState([]);
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
    await database.deleteDocument("main", "discussions", id);
    if (fileId != "") {
      await storage.deleteFile("discussions", fileId);
    }
    await getPlans(setPlans);
  };

  useEffect(() => {
    getPlans(setPlans);
  }, []);

  return (
    <Container>
      <ButtonLabel onClick={() => setOpen(true)}>+ Create Plans</ButtonLabel>
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
              {plans
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  row.index = <p>{index + 1}</p>;
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
          count={plans.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {open && (
        <AddPlans
          open={open}
          handleClose={() => setOpen(false)}
          setPlans={setPlans}
          plans={plans}
        />
      )}
    </Container>
  );
}

export default Plans;
