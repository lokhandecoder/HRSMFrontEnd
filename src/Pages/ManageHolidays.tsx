import LayoutComponent from "../Components/Fixed/LayoutComponent";
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
import axios from "axios";
import dayjs, { Dayjs } from "dayjs"; // Import Dayjs
import { CreateHoliday } from "../Services/HolidaysServices";
import { ManageHolidayModel } from "../Model/ManageHolidayModel";

function ManageHolidays() {
  const [holidayName, setHolidayName] = useState(""); // State to store the holiday name
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null); // Define the type for selectedDate

  const handleDateChange = (date: Dayjs | null) => { // Define the type for the 'date' parameter
    setSelectedDate(date);
  };

  const handleAddHoliday = async () => {
    if (holidayName && selectedDate) {
      const formattedDate = selectedDate.toDate(); // Convert Dayjs to Date object
      const holidayData: ManageHolidayModel = {
        holidayName: holidayName,
        HolidayDate: formattedDate,
      };
      console.log("holidayData", holidayData);
  
      try {
        const sendData = await CreateHoliday(holidayData);
        console.log('Holiday successfully created:', sendData);
      } catch (error) {
        console.error('Error creating holiday:', error);
      }
    } else {
      console.error('Please fill in both holiday name and select a date.');
    }
  };
  
  

  return (
    <LayoutComponent>
      <Card sx={{ minWidth: 275, mt: 3, boxShadow: 5 }}>
        <h1 style={{ marginLeft: "1%", fontSize: "24px" }}>Manage Holidays</h1>
        <CardContent>
          <Box sx={{ width: "100%" }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 1 }}
            >
              <Grid item xs={12} sm={4} md={3} lg={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Select the date"
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={4} md={3} lg={3}>
                <TextField
                  label="Enter the holiday name"
                  variant="outlined"
                  fullWidth
                  value={holidayName}
                  sx={{ mt: 1 }}
                  onChange={(e) => setHolidayName(e.target.value)}
                />
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
            onClick={handleAddHoliday}
            sx={{ mt: 5 }}
          >
            Add
          </Button>
        </CardActions>
      </Card>
    </LayoutComponent>
  );
}

export default ManageHolidays;
