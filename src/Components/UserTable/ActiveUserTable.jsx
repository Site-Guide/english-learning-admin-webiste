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
import { Query } from "appwrite";
import React, { useEffect, useState } from "react";
import { database } from "../../appwrite";
import { baseColor } from "../../utils/constants";
import { Container } from "./userTable";

const columns = [
  { id: "name", label: "Name", minWidth: 100 },
  { id: "email", label: "Email", minWidth: 100 },
  {
    id: "profession",
    label: "Profession",
    minWidth: 50,
  },
  {
    id: "experience",
    label: "Experience",
    minWidth: 50,
    align: "right",
  },
  {
    id: "level",
    label: "Level",
    minWidth: 50,
    align: "right",
  },
  {
    id: "purpose",
    label: "Purpose",
    minWidth: 200,
    align: "right",
  },

  {
    id: "lookingFor",
    label: "Looking For",
    minWidth: 200,
    align: "right",
  },
  {
    id: "haveYou",
    label: "Have You",
    minWidth: 200,
    align: "right",
  },
  {
    id: "phone",
    label: "Phone",
    minWidth: 50,
    align: "right",
  },
  {
    id: "whatsapp",
    label: "Whatsapp",
    minWidth: 50,
    align: "right",
  },
];

function ActiveUserTable() {
  const [activeUserList, setActiveUserList] = useState([]);
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
    const response = await database.listDocuments("main", "profiles", [
      Query.orderDesc("$createdAt"),
    ]);
    // setActiveUserList([
    //   ...response.documents.filter((res) => res && res.isAdmin != true),
    // ]);
    setActiveUserList([...response.documents]);
  };

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <Container>
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
              {activeUserList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                      style={{
                        background: row.isAdmin && baseColor,
                      }}
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
          count={activeUserList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
}

export default ActiveUserTable;
