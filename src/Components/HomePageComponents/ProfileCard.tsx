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
import PersonIcon from '@mui/icons-material/Person';
import ProfileImageSetter from "./ProfileImageSetter";


const employee = GetEmployees();
const defaultImageURL = 'https://example.com/default-profile-image.jpg'; // Replace with your default image URL


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

{/* <PersonIcon  /> */}

              
              {/* <ProfileImage /> */}
              {/* <ProfileImageSetter /> */}
              {/* <ProfileImageSetter defaultImage={defaultImageURL} /> */}
            </Grid>
          </Grid>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProfileCard;
