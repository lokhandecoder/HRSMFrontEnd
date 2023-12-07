import React, { useState, useEffect, ChangeEvent } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Holiday } from "../HomePageComponents/UpcomingHolidays";
import { GetHolidaysAsync } from "../../Services/HolidaysServices"; // Import the UpdateHolidayAsync function from your service
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import DatePicker from "@mui/lab/DatePicker";
import { TextFieldProps } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FormControl from "@mui/material/FormControl";

const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  return new Date(date).toLocaleDateString(undefined, options);
};
interface DisplayHolidayProps {
  data: Holiday[];
  handleEdit: (index: number) => void;
  handleDelete: (index: number) => void;
  // Other props if present
}

const DisplayHoliday: React.FC<DisplayHolidayProps> = ({ data, handleEdit , handleDelete }) => {

  


  return (
    <>
      <Card sx={{ minWidth: 275, mt: 3, boxShadow: 5 }}>
        <TableContainer style={{ maxHeight: 500, overflow: "auto" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Holiday</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((holiday, index) => (
                <React.Fragment key={index}>
                  <TableRow>
                    <TableCell align="center">{formatDate(holiday.holidayDate)}</TableCell>
                    <TableCell align="center">{holiday.holidayName}</TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() => handleEdit(holiday.id)}
                        variant="outlined"
                        color="primary"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(holiday.id)}
                        variant="outlined"
                        color="primary"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
}

export default DisplayHoliday;
