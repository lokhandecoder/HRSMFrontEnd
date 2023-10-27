import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
} from "@mui/material";

type DataTableProps = {
  columnHeaders: string[];
  rowHeaders: string[];
  data: { [key: string]: { [key: string]: boolean } };
  setData: React.Dispatch<React.SetStateAction<{ [key: string]: { [key: string]: boolean } }>>;
};

const DataTable: React.FC<DataTableProps> = ({
  columnHeaders,
  rowHeaders,
  data,
  setData,
}) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          {columnHeaders.map((header, colIndex) => (
            <TableCell key={colIndex} align="center">
              {header}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rowHeaders.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            <TableCell component="th" scope="row">
              {row}
            </TableCell>
            {columnHeaders.map((header, colIndex) => (
              <TableCell key={colIndex} align="center">
                <Checkbox
                  checked={data[row][header]}
                  onChange={() => {
                    setData((prevData) => ({
                      ...prevData,
                      [row]: {
                        ...prevData[row],
                        [header]: !prevData[row][header],
                      },
                    }));
                  }}
                />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;
