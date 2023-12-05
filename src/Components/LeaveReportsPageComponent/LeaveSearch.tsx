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
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { GetEmployeesAsync } from "../../Services/EmployeeServices";
import { EmployeeModel } from "../../Model/EmployeeModel";
import { getLeaveStatus } from "../../Services/LeaveType";
import { LeaveStatus } from "../../Model/LeaveStatus";
import { LeaveSearchUtlilities } from "../../Utilities/LeaveSearchUtlilities";
import { EmployeeLeavesReportResponse } from "../../Model/EmployeeLeavesReportResponse";
import LeaveSearchList from "./LeaveSearchList";

function LeaveSearch() {
  const leavesearch = LeaveSearchUtlilities();

  const {
    handleEmployeeLeaveReportSearch,
    employeeLeaveReport,
    employeeNames,
    leaveStatuses,
    handleChange,
    formData,
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
                {/* <Grid item xs={12} sm={4} md={3} lg={3} sx={{ mt: 1 }}>
                  <Autocomplete
                    fullWidth
                    options={employeeNames}
                    getOptionLabel={(employee) =>
                      `${employee.firstName} ${employee.lastName}`
                    }                    
                    value={
                      employeeNames.find(
                        (employee) =>
                          employee.employeeId === formData.employeeId
                      ) || null
                    }
                    onChange={(e, value) =>
                      handleChange("employeeId", value ? value.employeeId : 0)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Employee Name"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    )}
                  />
                </Grid> */}
                <Grid item xs={12} sm={4} md={3} lg={3} sx={{ mt: 1 }}>
                  <Autocomplete
                    fullWidth
                    options={[
                      { employeeId: 0, firstName: "None", lastName: "" },
                      ...employeeNames,
                    ]} // Adding "None" option
                    getOptionLabel={(employee) =>
                      `${employee.firstName} ${employee.lastName}`
                    }
                    value={
                      employeeNames.find(
                        (employee) =>
                          employee.employeeId === formData.employeeId
                      ) || { employeeId: 0, firstName: "None", lastName: "" } // Set default value to "None"
                    }
                    onChange={(e, value) =>
                      handleChange("employeeId", value ? value.employeeId : 0)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Employee Name"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={3} lg={3} sx={{ mt: 1 }}>
                  <Autocomplete
                    fullWidth
                    options={[
                      { leaveStatusId: 0, leaveStatusName: "None" },
                      ...leaveStatuses,
                    ]} // Adding "None" option
                    getOptionLabel={(leave) => leave.leaveStatusName}
                    value={
                      leaveStatuses.find(
                        (leave) =>
                          leave.leaveStatusId === formData.leaveStatusId
                      ) || { leaveStatusId: 0, leaveStatusName: "None" } // Set default value to "None"
                    }
                    onChange={(e, value) =>
                      handleChange(
                        "leaveStatusId",
                        value ? value.leaveStatusId : 0
                      )
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Leave Status"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    )}
                  />
                </Grid>

                {/* <Grid item xs={12} sm={4} md={3} lg={3} sx={{ mt: 1 }}>
                  <Autocomplete
                    fullWidth
                    options={leaveStatuses}
                    getOptionLabel={(leave) => leave.leaveStatusName}
                    value={
                      leaveStatuses.find(
                        (leave) =>
                          leave.leaveStatusId === formData.leaveStatusId
                      ) || null
                    }
                    onChange={(e, value) =>
                      handleChange(
                        "leaveStatusId",
                        value ? value.leaveStatusId : 0
                      )
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Leave Status"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    )}
                  />
                </Grid> */}

                {/* <Grid item xs={12} sm={4} md={3} lg={3} sx={{ mt: 1 }}>
                  <FormControl fullWidth>
                    <InputLabel id="employee-name-label">
                      Employee Name
                    </InputLabel>
                    <Select
                      labelId="employee-name-label"
                      id="employeeId"
                      label="EmployeeName"
                      name="employeeId"
                      value={formData.employeeId || ""} 
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
                <Grid item xs={12} sm={4} md={3} lg={3} sx={{ mt: 1 }}>
                  <FormControl fullWidth>
                    <InputLabel id="leave-status-label">
                      Leave Status
                    </InputLabel>
                    <Select
                      labelId="leave-status-label"
                      id="leaveStatusId"
                      label="Leave Status"
                      name="leaveStatusId"
                      value={formData.leaveStatusId || ""} 
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
                </Grid> */}
              </Grid>
              <Grid
                container
                rowSpacing={5}
                columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 1 }}
              ></Grid>
            </Box>
          </CardContent>
          <CardActions style={{ justifyContent: "right" }}>
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
      </form>
      <LeaveSearchList employeeLeaveReport={employeeLeaveReport} />
    </>
  );
}

export default LeaveSearch;
