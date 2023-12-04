import React from "react";
import SideNav from "../Components/Fixed/SideNav";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LayoutComponent from "../Components/Fixed/LayoutComponent";
import ProfileCard from "../Components/HomePageComponents/ProfileCard";
import ProfileImage from "../Components/HomePageComponents/ProfileImage";
import Paper from '@mui/material/Paper';
import UpcomingHolidays from "../Components/HomePageComponents/UpcomingHolidays";
import LeavesCard from "../Components/HomePageComponents/LeavesCard";
import EmployeePendingLeaves from "../Components/HomePageComponents/EmployeePendingLeaves";


function DashBoardPage() {
  return (
    <>
      <LayoutComponent>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <ProfileCard />
   
            {/* <ProfileCard /> */}
            <EmployeePendingLeaves />
           
          </Grid>
          <Grid item xs={4}>
            <UpcomingHolidays />
            <LeavesCard />
          </Grid>
        </Grid>
      </LayoutComponent>
    </>
  );
}

export default DashBoardPage;
