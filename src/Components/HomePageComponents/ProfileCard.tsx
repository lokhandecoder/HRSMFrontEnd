import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import "../../Resources/Styles/HomePageCSS/Profile.css";
import ProfileImage from "./ProfileImage";
import Grid from "@mui/material/Grid";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { GetEmployees } from "../../Database/EmployeeServices";
import MainCard from "./MainCard";


const employee = GetEmployees();

function ProfileCard() {
  return (
    <Card sx={{  p: 1, boxShadow: 4, mt: 5 }}>
      <CardContent>
        <div id="container">
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <MainCard />
            </Grid>
            <Grid item xs={4} >
              <ProfileImage />
            </Grid>
          </Grid>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProfileCard;
