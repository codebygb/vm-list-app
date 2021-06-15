import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "./styles.css";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  root: {
    flexGrow: 1,
  },

  title: {
    flexGrow: 1,
  },
});
export default function VMTable({ data }) {
  const classes = useStyles();

  return (
    <div className="data-container">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Client</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Requestor</TableCell>
              <TableCell align="right">ExpDate</TableCell>
              <TableCell align="right">ReqDate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.client}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.requestor}</TableCell>
                <TableCell align="right">{row.expdate}</TableCell>
                <TableCell align="right">{row.reqdate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
