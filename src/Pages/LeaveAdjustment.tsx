import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import LayoutComponent from "../Components/Fixed/LayoutComponent";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { leaveAdjustmentModel } from "../Model/leaveAdjustmentModel";
import Autocomplete from "@mui/material/Autocomplete";
import { EmployeeModel } from "../Model/EmployeeModel";
import { GetEmployeesAsync } from "../Services/EmployeeServices";
import {
  GetEmployeeLeaveByEmployeeId,
  GetEmployeeLeaveById,
} from "../Services/EmployeeLeaveServices";
import { EmployeeLeave } from "../Model/EmployeeLeave";
import useCustomSnackbar from "../Components/CustomComponent/useCustomSnackbar";
import {
  InputLabel,
  MenuItem,
  Select,
  Chip,
  SelectChangeEvent,
} from "@mui/material";
import { LeaveAdjustmentUtilities } from "../Utilities/LeaveAdjustmentUtilities";
function LeaveAdjustment() {
    const Data = LeaveAdjustmentUtilities();

    const {employeeNames,formData, handleEmployeeChange, fieldErrors,employeeLeaves,selectedOption,handleChangeOption,handleNoOfDays, handleInputChange, handleSubmit,handleClear,snackbar  } = Data;
//   const [formData, setFormData] = useState<leaveAdjustmentModel>({
//     employeeId: 0,
//     addLeaves: 0,
//     deleteLeaves: 0,
//     leaveReason: "", // Add leaveReason field to the state
//   });
//   const [selectedOption, setSelectedOption] = useState("Add"); // State to manage selected option
//   const snackbar = useCustomSnackbar();
//   const [employeeNames, setEmployeeNames] = useState<EmployeeModel[]>([]);
//   const [employeeLeaves, setemployeeLeaves] = useState<EmployeeLeave[]>([]);
//   const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

//   const handleChange = (field: string, value: any) => {
//     setFormData({
//       ...formData,
//       [field]: value,
//     });
//   };
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };
//   const handleChangeOption = (event: SelectChangeEvent) => {
//     const selectedValue = event.target.value as string;
//     setSelectedOption(selectedValue);

//     if (selectedValue === "Add") {
//       setFormData({
//         ...formData,
//         addLeaves: formData.addLeaves + formData.deleteLeaves, // Add deleteLeaves value to addLeaves
//         deleteLeaves: 0, // Reset deleteLeaves to 0
//       });
//     } else if (selectedValue === "Subtract") {
//       setFormData({
//         ...formData,
//         deleteLeaves: formData.addLeaves + formData.deleteLeaves, // Add addLeaves value to deleteLeaves
//         addLeaves: 0, // Reset addLeaves to 0
//       });
//     }
//   };

//   const handleNoOfDays = (value: string) => {
//     const regex = /^[0-9]*$/;
//     if (value === "" || (value.length <= 30 && regex.test(value))) {
//       const numberOfDays = value === "" ? 0 : parseInt(value, 10);

//       if (selectedOption === "Add") {
//         setFormData({
//           ...formData,
//           addLeaves: numberOfDays, // Set the number of days to addLeaves if 'Add' is selected
//         });
//       } else if (selectedOption === "Subtract") {
//         setFormData({
//           ...formData,
//           deleteLeaves: numberOfDays, // Set the number of days to deleteLeaves if 'Subtract' is selected
//         });
//       }
//     }
//   };
//   const fetchLeaves = async (id: number) => {
//     try {
//       const employeeLeaves = await GetEmployeeLeaveById(id); // Assuming GetEmployeeLeaveById accepts an 'id' argument
//       console.log("employeeLeaves", employeeLeaves.data);
//       setemployeeLeaves(employeeLeaves.data);
//       // Further logic with employeeLeaves
//     } catch (e) {
//       console.log("error", e);
//       // Handle errors
//     }
//   };
//   const handleEmployeeChange = async (employeeId: number) => {
//     handleChange("employeeId", employeeId);
//     if (employeeId !== 0) {
//       setFieldErrors({}); // Clear the error for employeeId field
//       await fetchLeaves(employeeId);
//     } else {
//       setFieldErrors({
//         employeeId: "Please select an employee",
//       });
//     }
//   };

//   useEffect(() => {
//     const fetchEmployeeData = async () => {
//       try {
//         const employeesResponse = await GetEmployeesAsync();
//         setEmployeeNames(employeesResponse.data);
//         console.log("employeesResponse", employeesResponse.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchEmployeeData();
//   }, []);

//   const handleSubmit = () => {
//     if (formData.employeeId === 0) {
//       setFieldErrors({
//         employeeId: "Please select an employee",
//       });
//     } else {
//       setFieldErrors({}); // Clear the error for employeeId field
//       console.log("Form Data: ", formData);
//       handleClear();
//       snackbar.showSnackbar(
//         "Leaves Updated Successfully",
//         "success",
//         { vertical: "top", horizontal: "center" },
//         5000
//       );
//       // Implement logic for form submission or API calls here
//     }
//   };

//   const handleClear = () => {
//     setFormData({
//       employeeId: 0,
//       addLeaves: 0,
//       deleteLeaves: 0,
//       leaveReason: "",
//     });
//     setemployeeLeaves([]); // Resetting employeeLeaves state as well
//   };
  return (
    <>
      <LayoutComponent>
        <Card sx={{ minWidth: 275, mt: 3, boxShadow: 5 }}>
          <h1 style={{ marginLeft: "1%", fontSize: "24px" }}>
            Leave Adjustment
          </h1>
          <CardContent>
            <Box sx={{ width: "100%" }}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 1 }}
              >
                <Grid item xs={12} sm={4} md={3} lg={3}>
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
                      ) || null // Set value to null if employee is not found
                    }
                    onChange={(e, value) =>
                      handleEmployeeChange(value ? value.employeeId : 0)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Employee Name"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        error={!!fieldErrors.employeeId} // Set error state
                        helperText={fieldErrors.employeeId} // Display error message
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={3} lg={3}>
                  <TextField
                    label="Balanced Leaves"
                    variant="outlined"
                    fullWidth
                    disabled
                    name="balanced leaves"
                    value={
                      employeeLeaves.length > 0
                        ? employeeLeaves[0].balanceLeaves
                        : ""
                    }
                    // onChange={(e) =>
                    //   handleNoOfDays("balanced leaves", e.target.value)
                    // }
                    inputProps={{
                      maxLength: 2,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={4} md={3} lg={3}>
                  {/* <TextField
                    label="Enter the Number of Days"
                    variant="outlined"
                    fullWidth
                    name="addLeaves"
                    value={formData.addLeaves}
                    onChange={(e) =>
                      handleNoOfDays("addLeaves", e.target.value)
                    }
                    inputProps={{
                      maxLength: 2,
                    }}
                  /> */}
                  <FormControl fullWidth>
                    <InputLabel id="adjust-perform-label">
                      Adjust/Perform
                    </InputLabel>
                    <Select
                      labelId="adjust-perform-label"
                      id="adjust-perform-select"
                      value={selectedOption}
                      onChange={handleChangeOption}
                      label="Adjust/Perform"
                    >
                      <MenuItem value="Add">Add</MenuItem>
                      <MenuItem value="Subtract">Subtract</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4} md={3} lg={3}>
                  <TextField
                    label="Enter the Number of Days to be adjusted"
                    variant="outlined"
                    fullWidth
                    name={
                      selectedOption === "Add" ? "addLeaves" : "deleteLeaves"
                    }
                    value={
                      selectedOption === "Add"
                        ? formData.adjustmentAdd
                        : formData.adjustmentDel
                    }
                    onChange={(e) => handleNoOfDays(e.target.value)}
                    inputProps={{
                      maxLength: 2,
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
            {/* <TextField
              error={!!fieldErrors.leaveReason} // Set error state
              sx={{ mt: 1 }}
              id="leaveReason"
              name="leaveReason"
              label="Leave Reason"
              multiline
              rows={4}
              value={formData.leaveReason}
              onChange={handleInputChange}
              helperText={fieldErrors.leaveReason || ""}
              fullWidth
              inputProps={{
                maxLength: 250, // Set the maximum length here
              }}
            /> */}
          </CardContent>
          <CardActions style={{ justifyContent: "right" }}>
            <Button
              type="submit"
              size="large"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{ mt: 5 }}
            >
              Save
            </Button>
            <Button
              size="large"
              variant="contained"
              color="secondary"
              onClick={handleClear}
              sx={{ mt: 5 }}
            >
              Clear
            </Button>
          </CardActions>
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
        </Card>
      </LayoutComponent>
    </>
  );
}

export default LeaveAdjustment;
