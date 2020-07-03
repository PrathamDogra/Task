import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import styles from "./RecipeTable.module.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
const checkLabel = (protein, fat, carb) => {
  console.log(`${protein} and ${fat} and ${carb}`);
  if (protein/(protein + carb + fat) > 15) {
    return "High Protein";
  } else if (protein/(protein + carb + fat) >= 12 &&
    protein/(protein + carb + fat) <= 15
  ) {
    return "Balanced";
  } else if ((carb + fat)/(protein + carb + fat) > 50) {
    return "High Carb";
  } else {
    return "Regular";
  }
};
const RecipeTable = ({ data }) => {
  const classes = useStyles;
  return (
    <TableContainer component={Paper} className={styles.table}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Image</StyledTableCell>
            <StyledTableCell align="right">Calories</StyledTableCell>
            <StyledTableCell align="right">Label</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row.recipe.label}>
              <StyledTableCell component="th" scope="row">
                <h3>{row.recipe.label}</h3>
              </StyledTableCell>
              <StyledTableCell align="right">
                <img
                  src={row.recipe.image}
                  width="80rem"
                  height="100rem"
                  alt="Image"
                />
              </StyledTableCell>
              <StyledTableCell align="right">
                {Math.round(row.recipe.calories)} kcal
              </StyledTableCell>
              <StyledTableCell align="right">
                {checkLabel(
                  Math.round(row.recipe.totalDaily.PROCNT.quantity),
                  Math.round(row.recipe.totalDaily.FAT.quantity),
                  Math.round(row.recipe.totalNutrients.CHOCDF.quantity)
                )}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default RecipeTable;
