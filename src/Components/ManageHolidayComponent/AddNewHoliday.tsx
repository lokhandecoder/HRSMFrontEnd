import React, { useState } from "react";
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
import axios from "axios";
import dayjs, { Dayjs } from "dayjs"; //
import { ManageHolidayModel } from "../../Model/ManageHolidayModel";
import { CreateHoliday } from "../../Services/HolidaysServices";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { ManageHolidayUtilities } from "../../Utilities/ManageHolidayUtilities";

enum Severity {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
}
type SnackbarSeverity = 'success' | 'error' | 'warning' | 'info';
type CustomSeverity = 'low' | 'medium' | 'high';

type Position = {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
};


interface AddNewHolidayProps {
  selectedDate: Dayjs | null;
  handleDateChange: (name: string, date: Date | null) => void;
  holidayName: string;
  setHolidayName: React.Dispatch<React.SetStateAction<string>>;
  handleAddHoliday: () => void;
  safeEditingRowId: number;
  handleUpdate: () => void;
  formData: ManageHolidayModel;
  handleFieldChange: (
    fieldName: keyof ManageHolidayModel,
    value: string | number | boolean
  ) => void; // Other props if any
  snackbar: {
    open: boolean;
    message: string;
    severity: SnackbarSeverity; // Use the appropriate severity type
    handleSnackbarClose: () => void;
    showSnackbar: (
      newMessage: string,
      newSeverity: Severity,
      newPosition: Position,
      newDuration: number
    ) => void;
    position: Position; // Using the 'Position' enum
    duration: number;
  };
  // fieldErrors: string | null; // Updated type definition
}

const AddNewHoliday: React.FC<AddNewHolidayProps> = ({
  selectedDate,
  handleDateChange,
  holidayName,
  setHolidayName,
  handleAddHoliday,
  safeEditingRowId,
  handleUpdate,
  formData,
  // fieldErrors,
  snackbar,
  handleFieldChange,
}) => {
  // const [holidayName, setHolidayName] = useState(""); // State to store the holiday name
  // const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null); // Define the type for selectedDate

  // const handleDateChange = (date: Dayjs | null) => {
  //   // Define the type for the 'date' parameter
  //   setSelectedDate(date);
  // };

  // const handleAddHoliday = async () => {
  //   if (holidayName && selectedDate) {
  //     // const formattedDate = selectedDate.toDate(); // Convert Dayjs to Date object
  //     const formattedDate = selectedDate.startOf("day").toDate(); // Extract only the date part

  //     const holidayData: ManageHolidayModel = {
  //       holidayName: holidayName,
  //       HolidayDate: formattedDate,
  //     };
  //     console.log("holidayData", holidayData);

  //     try {
  //       const sendData = await CreateHoliday(holidayData);
  //       console.log("Holiday successfully created:", sendData);
  //     } catch (error) {
  //       console.error("Error creating holiday:", error);
  //     }
  //   } else {
  //     console.error("Please fill in both holiday name and select a date.");
  //   }
  // };

  return (
    <Card sx={{ minWidth: 275, mt: 3, boxShadow: 5 }}>
      <h1 style={{ marginLeft: "1%", fontSize: "24px" }}>Manage Holidays</h1>
      <CardContent>
        <Box sx={{ width: "100%" }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 1 }}
          >
            {/* <Grid item xs={12} sm={4} md={3} lg={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Select the date"
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                </LocalizationProvider>
              </Grid> */}
            <Grid item xs={12} sm={4} md={3} lg={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <FormControl fullWidth>
                  <DatePicker
                    label="Select the date"
                    value={
                      formData.HolidayDate
                        ? dayjs(formData.HolidayDate)
                        : null
                    }
                    onChange={(date) => {
                      if (date) {
                        handleDateChange("HolidayDate", date.toDate());
                      }
                    }}
                  />
                </FormControl>
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={4} md={3} lg={3}>
              <TextField
                label="Enter the holiday name"
                variant="outlined"
                fullWidth

                name="HolidayName"
                                // value={holidayName}
                value={formData.holidayName}
                // sx={{ mt: 1 }}
                onChange={(e) => handleFieldChange('holidayName', e.target.value)}
                />
            </Grid>
          </Grid>
        </Box>
      </CardContent>
      <CardActions style={{ justifyContent: "right" }}>
        {safeEditingRowId && safeEditingRowId !== null ? (
          <Button
            type="submit"
            size="large"
            variant="contained"
            color="primary"
            onClick={handleUpdate}
            sx={{ mt: 5 }}
          >
            Update
          </Button>
        ) : (
          <Button
            type="submit"
            size="large"
            variant="contained"
            color="primary"
            onClick={handleAddHoliday}
            sx={{ mt: 5 }}
          >
            Add
          </Button>
        )}
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

  );
};

export default AddNewHoliday;
