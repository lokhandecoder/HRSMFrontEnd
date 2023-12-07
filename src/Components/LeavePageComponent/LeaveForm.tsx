import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import {
  GetEmployeeLeave,
  GetLeaveType,
  LeaveType,
} from "../../Database/LeaveType";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import LeaveApplyUtilities from "../../Utilities/LeaveApplyUtilities";
import utc from "dayjs/plugin/utc"; // Import the UTC plugin for Dayjs
import { LeaveFormData } from "../../Model/LeaveFormData";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
// import {MuiAlert} from '@mui/material';
import { DateValidationError } from "@mui/x-date-pickers/models";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams to get the ID from the route params
import { GetLeaveData } from "../../Database/LeaveData";
import { getLeaveTypes } from "../../Services/LeaveType";
import { GetEmployeeLeaveByEmployeeId } from "../../Services/EmployeeLeaveServices";
import { EmployeeLeave } from "../../Model/EmployeeLeave";
import { GetApplyLeaveById } from "../../Services/EmployeeLeaveApplyServices";
import { Checkbox, FormControlLabel, FormHelperText } from "@mui/material";
import useCustomSnackbar from "../CustomComponent/useCustomSnackbar";
import { EmployeeIDByLocalStorage } from "../../APIConfig";
import { DecryptEmployeeID } from "../../Services/EncryptEmplyeeID";
import LeavesCard from "../HomePageComponents/LeavesCard";
import { Holiday } from "../HomePageComponents/UpcomingHolidays";
import { GetHolidaysAsync } from "../../Services/HolidaysServices";

dayjs.extend(utc); // Extend Dayjs with UTC plugin
interface LeaveFormProps {
  onSubmit: (formData: LeaveFormData) => void;
  // employeeLeavesCount: any[];
}

const employee = GetEmployeeLeave();
// console.log(employee);

const LeaveForm: React.FC<LeaveFormProps> = ({ onSubmit }) => {
  const snackbar = useCustomSnackbar();
  const EMPIDD = DecryptEmployeeID();
  // const employeeID: number | null = employeeIdNumber ? parseInt(employeeIdNumber, 10) : 0;

  const { id } = useParams();
  const appliedLeaveTypeId = id ? parseInt(id, 10) : 0;
  const today = dayjs();
  const todayDate = today.toDate();
  const [difference, setdifference] = useState(0);
  const [balanceLeave, setBalanceLeave] = useState(0);
  const [applyLeaveDefaultValue, setApplyLeaveDefaultValue] = useState(1); // Default value for Apply Leave dropdown
  const [applyLeaveReadOnly, setApplyLeaveReadOnly] = useState(false); // Readonly state for Apply Leave dropdown
  const navigate = useNavigate()

  const initialFormData: LeaveFormData = {
    appliedLeaveTypeId: appliedLeaveTypeId,
    leaveTypeId: 0,
    leaveType: null,
    startDate: todayDate,
    endDate: todayDate,
    leaveReason: "",
    balanceLeave: 0,
    applyLeaveDay: 0,
    remaingLeave: 0,
    leaveStatusId: 2,
    employeeId: parseInt(EMPIDD.toString(), 10), // Convert EMPIDD to a string and then parse it
    isHalfDay: false,
  };
  const [formData, setFormData] = useState<LeaveFormData>(initialFormData);
  // const [publicHolidaysList, setPublicHolidaysList] = useState<string[]>([]);
  const isWeekend = (date: Dayjs) => {
    const day = date.day();

    return day === 0 || day === 6;
  };

  const handleCancel = () => {
    setFormData(initialFormData);
  };
  // const [previousApplyLeave, setPreviousApplyLeave] = useState(0);
  // const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([]);
  const [employeeLeaves, setemployeeLeaves] = useState<EmployeeLeave[]>([]);
  const [errors, setErrors] = useState<
    Partial<Record<keyof LeaveFormData, string>>
  >({});

  const {
    handleSelectChange,
    handleInputChange,
    handleDateChange,
    handleClear,
    Test,
    handleSubmit,
    loading,
    previousApplyLeave,
    leaveTypes,
    handleIsHalfDayChange,
    publicHolidaysList,
    isPublicHoliday,
    startDateFinancialYear,
    endDateFinancialYear,

    
  } = LeaveApplyUtilities(
    formData,
    setFormData,
    todayDate,
    onSubmit,
    difference,
    setdifference,
    balanceLeave,
    setBalanceLeave,
    employeeLeaves,
    setemployeeLeaves,
    errors,
    setErrors,
    snackbar,
    initialFormData,
  );

  useEffect(() => {
    Test();
  }, [
    formData.leaveTypeId,
    formData.endDate,
    formData.startDate,
    formData.isHalfDay,
  ]);
  const handleReturn = () => {
    navigate('/')
  }


  return (
    <>
      <form onSubmit={handleSubmit}>
        <Card sx={{ minWidth: 275, mt: 5, boxShadow: 5 }}>
          <h1 style={{ marginLeft: "1%", fontSize: "24px" }}>
            Apply for Leave
          </h1>
          <CardContent>
            <Box sx={{ width: "100%" }}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={12} sm={4} md={3} lg={2}>
                  <FormControl
                    fullWidth
                    sx={{ mt: 1 }}
                    error={!!errors.leaveTypeId}
                  >
                    <InputLabel id="leaveType">Leave Type</InputLabel>
                    <Select
                      labelId="leaveType"
                      id="demo-simple-select"
                      value={formData.leaveTypeId}
                      label="Leave Type"
                      name="leaveTypeId"
                      onChange={handleSelectChange}
                    >
                      <MenuItem value={0}>Select</MenuItem>
                      {leaveTypes.map((type, index) => (
                        <MenuItem key={index} value={type.leaveTypeId}>
                          {type.leaveTypeName}
                        </MenuItem>
                      ))}
                    </Select>
                    {!!errors.leaveTypeId && (
                      <FormHelperText>{errors.leaveTypeId}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={4} md={3} lg={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.isHalfDay} // Set the checked state of the checkbox
                        onChange={handleIsHalfDayChange} // Attach the onChange event
                      />
                    }
                    label="Half day"
                  />
                </Grid>

                <Grid item xs={12} sm={4} md={3} lg={2}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <FormControl fullWidth error={!!errors.startDate}>
                        <DatePicker
                          label="Start Date"
                          minDate={startDateFinancialYear ? dayjs(startDateFinancialYear) : undefined}
                          maxDate={endDateFinancialYear ? dayjs(endDateFinancialYear) : undefined}
                          shouldDisableDate={(date) =>
                            isWeekend(date) || isPublicHoliday(date.toDate())
                          }
                          value={
                            formData.startDate
                              ? dayjs.utc(formData.startDate)
                              : today
                          }
                          onChange={(date) => {
                            if (date) {
                              handleDateChange("startDate", date.toDate());

                              // Update endDate if isHalfDay is true
                              if (formData.isHalfDay) {
                                //handleDateChange("endDate", date.toDate());
                                setFormData((prevFormData: LeaveFormData) => ({
                                  ...prevFormData,
                                  endDate: date.toDate(),
                                }));
                              }
                            }
                          }}
                        />
                        {!!errors.startDate && (
                          <FormHelperText>{errors.startDate}</FormHelperText>
                        )}
                      </FormControl>
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={12} sm={4} md={3} lg={2}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <FormControl fullWidth error={!!errors.endDate}>
                        <DatePicker
                          label="End Date"
                          // minDate={}
                          minDate={startDateFinancialYear ? dayjs(startDateFinancialYear) : undefined}
                          maxDate={endDateFinancialYear ? dayjs(endDateFinancialYear) : undefined}
                          shouldDisableDate={(date) =>
                            isWeekend(date) || isPublicHoliday(date.toDate()) 
                          }
                          value={
                            formData.endDate
                              ? dayjs.utc(formData.endDate)
                              : today
                          }
                          onChange={(date) => {
                            if (!formData.isHalfDay) {
                              // Only allow changing the end date if not half-day
                              if (date) {
                                handleDateChange("endDate", date.toDate());
                              }
                            }
                          }}
                          disabled={formData.isHalfDay} // Disable the DatePicker when isHalfDay is checked
                        />
                        {!!errors.endDate && (
                          <FormHelperText>{errors.endDate}</FormHelperText>
                        )}
                      </FormControl>
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={12} sm={4} md={3} lg={2}>
                  <TextField
                    sx={{ mt: 1 }}
                    id="BalancedLeaves"
                    name="Balanced Leaves"
                    label="Balanced Leaves"
                    disabled
                    value={formData.balanceLeave}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={3} lg={2}>
                  <TextField
                    error={!!errors.applyLeaveDay}
                    sx={{ mt: 1 }}
                    id="AppliedLeaves"
                    name="AppliedLeaves"
                    label="Applied Leaves"
                    // aria-readonly
                    disabled
                    value={formData.applyLeaveDay}
                    fullWidth
                    helperText={errors.applyLeaveDay || ""}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={3} lg={2}>
                  <TextField
                    sx={{ mt: 1 }}
                    id="RemainingLeaves"
                    name="Remaining Leaves"
                    label="Remaining Leaves"
                    // aria-readonly
                    disabled
                    value={formData.remaingLeave}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Box>
            <TextField
              error={!!errors.leaveReason}
              sx={{ mt: 1 }}
              id="leaveReason"
              name="leaveReason"
              label="Leave Reason"
              multiline
              rows={4}
              value={formData.leaveReason}
              onChange={handleInputChange}
              helperText={errors.leaveReason || ""}
              fullWidth
              // inputProps={{
              //   maxLength: 250 // Set the maximum length here
              // }}
            />
          </CardContent>
          <CardActions style={{ justifyContent: "right" }}>
            <Button
              type="submit"
              size="large"
              variant="contained"
              color="primary"
              disabled={loading} // Disable the button when loading
            >
              {loading ? (
                <div>
                  Please wait...
                  <CircularProgress size={24} />
                </div>
              ) : (
                "Save"
              )}
            </Button>
            {/* Conditionally render the Cancel button when in edit mode */}
            {appliedLeaveTypeId > 0 && (
              <Button
                size="large"
                variant="contained"
                color="secondary"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            )}
            <Button
              size="large"
              variant="contained"
              color="secondary"
              onClick={handleClear}
            >
              Clear
            </Button>
            <Button
              size="large"
              variant="contained"
              color="warning"
              onClick={handleReturn}
            >
              Back to Dashboard
            </Button>
          </CardActions>
        </Card>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={snackbar.duration}
          onClose={snackbar.handleSnackbarClose}
          anchorOrigin={snackbar.position}
        >
          <Alert
            onClose={snackbar.handleSnackbarClose}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </form>
    </>
  );
};

export default LeaveForm;
