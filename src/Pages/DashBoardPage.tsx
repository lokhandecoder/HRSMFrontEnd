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


function DashBoardPage() {
  return (
    <>
      <LayoutComponent>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <ProfileCard />
            {/* <ProfileCard /> */}
            <LeavesCard />
          </Grid>
          <Grid item xs={4}>
            <UpcomingHolidays />
          </Grid>
        </Grid>
      </LayoutComponent>
    </>
  );
}

export default DashBoardPage;
