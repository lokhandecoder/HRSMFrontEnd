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
  const [isTableOpen, setIsTableOpen] = useState(false);

  const toggleTable = () => {
    setIsTableOpen(!isTableOpen);
  };



  return (
    <Card sx={{ p: 1, boxShadow: 4, mt: 5 }}>
      <Typography variant="h5" sx={{ textAlign: "center" }}>
        Upcoming Holidays
      </Typography>
      <CardContent>
        <Typography
          variant="body1"
          onClick={toggleTable}
          sx={{
            cursor: "pointer",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isTableOpen ? (
            <>
              <KeyboardArrowUpIcon />
              Hide Holidays
            </>
          ) : (
            <>
              <KeyboardArrowDownIcon />
              Show Holidays
            </>
          )}
        </Typography>
        <Collapse in={isTableOpen}>
        <UpcomingTable />
        </Collapse>
      </CardContent>
    </Card>
  );
}

export default UpcomingHolidays;
