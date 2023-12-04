import React, { useState, useEffect } from "react";
import ProfileImage from "./ProfileImage";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import UpcomingTable from "../HomePageComponents/UpcomingTable";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Collapse from "@mui/material/Collapse"; // Import Collapse from Material-UI
import { GetHolidaysAsync } from "../../Services/HolidaysServices";

export interface Holiday {
  holidayName: string;
  holidayDate: string;
}

function UpcomingHolidays() {
  return (
    // <Card sx={{ p: 1, boxShadow: 4, mt: 5, height: "365px" }}> {/* Adjust the height as needed */}
       <Card sx={{ p: 1, boxShadow: 4, mt: 5 }}>
      <Typography variant="h5" sx={{ textAlign: "center", marginTop: "30px" }}>
        Upcoming Holidays
      </Typography>
      <CardContent>
        <UpcomingTable />
      </CardContent>
    </Card>
  );
}

export default UpcomingHolidays;
