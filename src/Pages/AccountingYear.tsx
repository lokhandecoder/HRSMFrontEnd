import React, { useEffect, useState } from "react";
import Axios from "axios";
import LayoutComponent from "../Components/Fixed/LayoutComponent";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { API_URL } from "../APIConfig";
import axios from "axios";
import { LeaveType } from "../Database/LeaveType";
import { EmployeeLeave } from "../Model/EmployeeLeave";
import { getLeaveTypes } from "../Services/LeaveType";
import { GetEmployeeLeaveByEmployeeId } from "../Services/EmployeeLeaveServices";
import { AccountingYearUtilities } from "../Utilities/AccountingYearUtilities";

function AccountingYear() {
  const Accountingyear = AccountingYearUtilities();

  const {
    leaveTypes,
    employeeLeaves,
    formData,
    handleChange,
    isWeekend,
    handleTextFieldChange,
    handleSubmit,
  } = Accountingyear;

  return (
    <LayoutComponent>
      <form onSubmit={handleSubmit}>
        <Card sx={{ minWidth: 275, mt: 5, boxShadow: 5 }}>
          <h1 style={{ marginLeft: "1%" }}>Accounting Year</h1>
          <CardContent>
            <Box sx={{ width: "100%" }}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={12} sm={4} md={3} lg={2}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <FormControl fullWidth>
                        <DatePicker
                          label="Start Date"
                          shouldDisableDate={isWeekend}
                          value={dayjs(formData.startDate)} // Convert string to Dayjs object
                          onChange={(date) => handleChange("startDate", date)}
                        />
                      </FormControl>
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={4} md={3} lg={2}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <FormControl fullWidth>
                        <DatePicker
                          label="End Date"
                          shouldDisableDate={isWeekend}
                          value={dayjs(formData.endDate)} // Convert string to Dayjs object
                          onChange={(date) => handleChange("endDate", date)}
                        />
                      </FormControl>
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={4} md={3} lg={2}>
                  {leaveTypes.map((leaveType, key) => {
                    const matchingEmployeeLeave =
                      employeeLeaves &&
                      employeeLeaves.find(
                        (employeeLeave) =>
                          employeeLeave.leaveTypeId === leaveType.leaveTypeId
                      );

                    return (
                      <>
                        <TextField
                          sx={{ mt: 1 }}
                          label={leaveType.leaveTypeName}
                          variant="outlined"
                          name={leaveType.leaveTypeName}
                          fullWidth
                          value={
                            formData.leavetype[
                              leaveType.leaveTypeId.toString()
                            ] || ""
                          }
                          onChange={(e) =>
                            handleTextFieldChange(
                              leaveType.leaveTypeId.toString(),
                              e as React.ChangeEvent<HTMLInputElement>
                            )
                          }
                        />
                      </>
                    );
                  })}
                </Grid>
              </Grid>
            </Box>
          </CardContent>
          <CardActions style={{ justifyContent: "right" }}>
            <Button
              type="submit"
              size="large"
              variant="contained"
              color="primary"
            >
              Save
            </Button>
          </CardActions>
        </Card>
      </form>
    </LayoutComponent>
  );
}

export default AccountingYear;
