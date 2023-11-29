import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx"; // Import xlsx library
import useCustomSnackbar from "../CustomComponent/useCustomSnackbar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import dayjs, { Dayjs } from "dayjs";
import CircularProgress from "@mui/material/CircularProgress";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { GetEmployeesAsync } from "../../Services/EmployeeServices";
import { EmployeeModel } from "../../Model/EmployeeModel";
import { getLeaveStatus } from "../../Services/LeaveType";
import { LeaveStatus } from "../../Model/LeaveStatus";
import { LeaveSearchUtlilities } from "../../Utilities/LeaveSearchUtlilities";
import { EmployeeLeavesReportResponse } from "../../Model/EmployeeLeavesReportResponse";

function LeaveSearch() {
  const leavesearch = LeaveSearchUtlilities();
  // const [exportData, setExportData] = useState([]); // State to hold data for export

  const {
    handleEmployeeLeaveReportSearch,
    employeeLeaveReport,
    employeeNames,
    leaveStatuses,
    handleChange,
    formData,
    handleExportToExcel,
  } = leavesearch;

  const today = dayjs();
  const todayDate = today.toDate();
  return (
    <>
      <form onSubmit={handleEmployeeLeaveReportSearch}>
        <Card sx={{ minWidth: 275, mt: 5, boxShadow: 5 }}>
          <h1 style={{ marginLeft: "1%", fontSize: "24px" }}>Leave Reports</h1>
          <CardContent>
            <Box sx={{ width: "100%" }}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 1 }}
              >
                <Grid item xs={12} sm={4} md={3} lg={3}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <FormControl fullWidth>
                        <DatePicker
                          label="Start Date"
                          value={
                            formData.startDate
                              ? dayjs.utc(formData.startDate)
                              : today
                          }
                          onChange={(date) => {
                            if (date) {
                              handleChange("startDate", date.toDate());
                            }
                          }}
                        />
                      </FormControl>
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={4} md={3} lg={3}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <FormControl fullWidth>
                        <DatePicker
                          label="End Date"
                          value={
                            formData.startDate
                              ? dayjs.utc(formData.startDate)
                              : today
                          }
                          onChange={(date) => {
                            if (date) {
                              handleChange("endDate", date.toDate());
                            }
                          }}
                        />
                      </FormControl>
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
                {/* Dropdown for Leave Status */}
                <Grid item xs={12} sm={4} md={3} lg={3}  sx={{ mt : 1}}>
                  <FormControl fullWidth>
                    <InputLabel id="employee-name-label">
                      Employee Name
                    </InputLabel>
                    <Select
                      labelId="employee-name-label"
                      value={formData.employeeId || ""} // Use formData values or empty string
                      onChange={(e) =>
                        handleChange("employeeId", e.target.value as string)
                      }
                    >
                      {employeeNames.map((employee) => (
                        <MenuItem
                          key={employee.employeeId}
                          value={employee.employeeId}
                        >
                          {employee.firstName} {employee.lastName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4} md={3} lg={3} sx={{ mt : 1}}>
                  <FormControl fullWidth>
                    <InputLabel id="leave-status-label">
                      Leave Status
                    </InputLabel>
                    <Select
                      labelId="leave-status-label"
                      value={formData.leaveStatusId || ""} // Use formData values or empty string
                      onChange={(e) =>
                        handleChange("leaveStatusId", e.target.value as string)
                      }
                    >
                      {leaveStatuses.map((leave) => (
                        <MenuItem
                          key={leave.leaveStatusId}
                          value={leave.leaveStatusId}
                        >
                          {leave.leaveStatusName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid
                container
                rowSpacing={5}
                columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 1 }}
              ></Grid>
            </Box>
          </CardContent>
          <CardActions style={{ justifyContent: "right",}}>
            <Button
              type="submit"
              size="large"
              variant="contained"
              color="primary"
              //disabled={loading}
              sx={{ mt: 5 }}
            >
              Search
            </Button>
          </CardActions>
        </Card>
        <Card sx={{ minWidth: 275, mt: 5, boxShadow: 5 }}>
          <TableContainer>
            <Table sx={{ minWidth: 700 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Leave Type</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Reason for Leave</TableCell>
                  <TableCell>Applied Days</TableCell>
                  <TableCell>Status </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employeeLeaveReport && employeeLeaveReport.length != 0 ? (
                  employeeLeaveReport.map(
                    (row: EmployeeLeavesReportResponse, key: number) => (
                      <TableRow key={key}>
                        <TableCell>
                          {row.firstName} {row.lastName}
                        </TableCell>
                        <TableCell>{row.leaveTypeName}</TableCell>
                        <TableCell>{row.startDate}</TableCell>
                        <TableCell>{row.endDate}</TableCell>
                        <TableCell>{row.leaveReason}</TableCell>
                        <TableCell>{row.applyLeaveDay}</TableCell>
                        <TableCell>{row.leaveStatusName}</TableCell>
                      </TableRow>
                    )
                  )
                ) : (
                  <TableRow>
                    <TableCell colSpan={7}>No data available </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <CardActions style={{ justifyContent: "right" }}>
            <Button
              type="submit"
              size="large"
              variant="contained"
              color="primary"
              onClick={handleExportToExcel} // Call handleExportToExcel function on button click
              sx={{ mt: 2, marginRight: 2 }} // Add margin to the right
              disabled={
                !employeeLeaveReport || employeeLeaveReport.length === 0
              } // Disable button if no data available
            >
              Export to Excel
            </Button>
          </CardActions>
        </Card>
      </form>
    </>
  );
}

export default LeaveSearch;
