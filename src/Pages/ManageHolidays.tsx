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
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import dayjs, { Dayjs } from "dayjs"; // Import Dayjs
import { CreateHoliday } from "../Services/HolidaysServices";
import { ManageHolidayModel } from "../Model/ManageHolidayModel";
import AddNewHoliday from "../Components/ManageHolidayComponent/AddNewHoliday";
import DisplayHoliday from "../Components/ManageHolidayComponent/DisplayHoliday";
import { ManageHolidayUtilities } from "../Utilities/ManageHolidayUtilities";

function ManageHolidays() {
  const manageHoliday = ManageHolidayUtilities();

  const {
    selectedDate,
    handleDateChange,
    holidayName,
    setHolidayName,
    handleAddHoliday,
    data,
    handleEdit,
    handleUpdate,
    editingRowId,
  } = manageHoliday;


  const safeEditingRowId: number = editingRowId !== null ? editingRowId : 0;

  return (
    <LayoutComponent>
      <AddNewHoliday
        selectedDate={selectedDate}
        handleDateChange={handleDateChange}
        holidayName={holidayName}
        setHolidayName={setHolidayName}
        handleAddHoliday={handleAddHoliday}
        safeEditingRowId={safeEditingRowId}
        handleUpdate={handleUpdate}
      />
      <DisplayHoliday data={data} handleEdit={handleEdit} />
    </LayoutComponent>
  );
}

export default ManageHolidays;
