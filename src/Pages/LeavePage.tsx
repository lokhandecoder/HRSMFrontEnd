import React from 'react'
import SideNav from "../Components/Fixed/SideNav";
import LayoutComponent from '../Components/Fixed/LayoutComponent';
import LeaveForm from '../Components/LeavePageComponent/LeaveForm';
import LeavesCard from '../Components/HomePageComponents/LeavesCard';
import { Box } from '@mui/material';


function LeavePage() {
  const handleSubmit = (formData: any) => {
    // Handle form submission (e.g., send the data to the server)
    console.log('Form submitted with data:', formData);
  };
  return (
    <>
     <LayoutComponent>
      <Box sx={{ mt: 4 }}/>
      {/* <LeavesCard /> */}
      <LeaveForm onSubmit={handleSubmit} />
     </LayoutComponent>
    </>
  )
}

export default LeavePage