import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getPurchases } from "../RealTimeFunctions/plans";
import { Container } from "./purchases";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import { baseColor } from "../../utils/constants";

const columns = [
  { id: "index", label: "Index", minWidth: 30 },
  { id: "type", label: "Type", minWidth: 50 },
  {
    id: "calls",
    label: "Calls",
    minWidth: 30,
  },
  {
    id: "callsDone",
    label: "Calls Done",
    minWidth: 30,
  },
  {
    id: "amount",
    label: "Amount",
    minWidth: 70,
  },
  {
    id: "paymentId",
    label: "Payment Id",
    minWidth: 70,
  },
  {
    id: "paymentStatus",
    label: "Payment Status",
    minWidth: 70,
  },
  {
    id: "paymentMethod",
    label: "Payment Method",
    minWidth: 70,
  },
];
function Purchases() {
  const [purchases, setPurchases] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    getPurchases(setPurchases);
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
              {purchases
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  row.index = <p>{index + 1}</p>;
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
                            {column.id === "paymentId" && (
                              <Tooltip title="Copy PaymentId" placement="top">
                                <Button style={{ padding: 0, margin: 0 }}>
                                  <CopyAllIcon
                                    onClick={() => {
                                      navigator.clipboard.writeText(value);
                                    }}
                                    style={{
                                      height: "20px",
                                      width: "20px",
                                      cursor: "pointer",
                                      color: baseColor,
                                    }}
                                  />
                                </Button>
                              </Tooltip>
                            )}
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
          count={purchases.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
}

export default Purchases;
