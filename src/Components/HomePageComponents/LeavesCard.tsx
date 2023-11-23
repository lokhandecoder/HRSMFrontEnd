import React, { useEffect, useState } from "react";
import Box from "@mui/system/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/system/Unstable_Grid";
import styled from "@mui/system/styled";
import Cards from "./Cards";
import { GetEmployeeLeave, LeaveType } from "../../Database/LeaveType";
import { GetEmployeeLeaveByEmployeeId } from "../../Services/EmployeeLeaveServices";
import { getLeaveTypes } from "../../Services/LeaveType";
import { EmployeeLeave } from "../../Model/EmployeeLeave";
import { LeaveFormData } from "../../Model/LeaveFormData";

interface LeavesCardProps {
  handleSubmit: (formData: any) => void; // Adjust the type according to your form data type
}

function LeavesCard({ handleSubmit }: LeavesCardProps) {
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([]);
  const [employeeLeaves, setemployeeLeaves] = useState<EmployeeLeave[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [leaveTypesData, employeeLeaveData] = await Promise.all([
          getLeaveTypes(),
          GetEmployeeLeaveByEmployeeId(),
        ]);
        const leaveTypes = leaveTypesData.data;
        setLeaveTypes(leaveTypes);
        const employeeLeave = employeeLeaveData.data;
        setemployeeLeaves(employeeLeave);
      } catch (error) {
        console.error("Failed to fetch data: ", (error as Error).message);
      }
    };

    fetchData();
  }, [handleSubmit]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {leaveTypes.map((leaveType, key) => {
          const matchingEmployeeLeave = employeeLeaves && employeeLeaves.find(
            (employeeLeave) =>
              employeeLeave.leaveTypeId === leaveType.leaveTypeId
          );

          return (
            <Grid xs={3} key={key} >
              <Card
                sx={{
                  minWidth: 275,
                  boxShadow: 4,
                  borderRadius: 3,
                }}
              >
                <CardContent>
                  <Typography sx={{ fontSize: 24 }} color="" gutterBottom>
                    {leaveType.leaveTypeName}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="">
                    Total Leaves: {matchingEmployeeLeave?.leaveCount}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="">
                    Remaining Leaves: {matchingEmployeeLeave?.balanceLeaves}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default LeavesCard;
