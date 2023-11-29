import React from "react";
import Grid from "@mui/material/Grid";
import LayoutComponent from "../Components/Fixed/LayoutComponent";
import LeaveSearch from "../Components/LeaveReportsPageComponent/LeaveSearch";
// import LeaveSearchList from "../Components/LeaveReportsPageComponent/LeaveSearchList";
import { LeaveSearchUtlilities } from "../Utilities/LeaveSearchUtlilities";


function LeaveReportsPage() {
  
  


  return (
    <>
      <LayoutComponent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <LeaveSearch  />
          </Grid>
          <Grid item xs={12}>
            {/* <LeaveSearchList /> */}
          </Grid>
        </Grid>
      </LayoutComponent>
    </>
  );
}

export default LeaveReportsPage;
