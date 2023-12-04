import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import "../../Resources/Styles/HomePageCSS/Profile.css";
import ProfileImage from "./ProfileImage";
import Grid from "@mui/material/Grid";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { GetEmployees } from "../../Database/EmployeeServices";
import MainCard from "./MainCard";
import PersonIcon from "@mui/icons-material/Person";
import ProfileImageSetter from "./ProfileImageSetter";
import { GetPendingAppliedLeavesByEmpIdAsync } from "../../Services/EmployeeServices";
import { AppliedLeave } from "../../Model/AppliedLeaveModel";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { EmployeeIDByLocalStorage } from "../../APIConfig";
import { getDecryptedValueFromStorage } from "../../Utilities/LocalStorageEncryptionUtilities";

function EmployeePendingLeaves() {
  const [pendingLeaves, setPendingLeaves] = useState<AppliedLeave[]>([]);

  const fetchdata = async () => {
    try {
      const employeeId = getDecryptedValueFromStorage("employeeID", 0);
      const data = await GetPendingAppliedLeavesByEmpIdAsync(employeeId);
      console.log(data.data);

      // Assuming data.data is an array of AppliedLeave objects
      if (Array.isArray(data.data)) {
        setPendingLeaves(data.data); // Saving fetched data in state
      } else {
        // Handle the case where data.data is not an array
        console.error("Data is not an array:", data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <Card sx={{ p: 1, boxShadow: 4, mt: 2 }}>
      <CardContent>
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          Pending Leaves
        </Typography>
        {/* <TableContainer  style={{ maxHeight: pendingLeaves.length > 2 ? 300 : 'auto', overflow: 'auto', marginTop : "2px" }}> */}
        <TableContainer
          component={Paper}
          style={{ maxHeight: 250, overflow: "auto" }}
        >
          {/* <Table stickyHeader > */}
          <Table aria-label="pending-leaves-table">
            <TableHead>
              <TableRow>
                {/* <TableCell>Leave Type</TableCell> */}
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Applied Days</TableCell>
                <TableCell>Reason</TableCell>
                <TableCell>Status</TableCell>
                
                {/* Add additional TableCell components for more leave details */}
              </TableRow>
            </TableHead>
            <TableBody>
              {pendingLeaves.map((leave, index) => (
                <TableRow key={index}>
                  {/* <TableCell>{leave.leaveTypeName}</TableCell> */}
                  <TableCell>
                    {leave.startDate
                      ? new Date(leave.startDate).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    {leave.endDate
                      ? new Date(leave.endDate).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  <TableCell>{leave.applyLeaveDay}</TableCell>
                  <TableCell>{leave.leaveReason}</TableCell>
                  <TableCell>{leave.leaveStatusName}</TableCell>
                  {/* Add additional TableCell components for more leave details */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}

export default EmployeePendingLeaves;
