import React from 'react'
import EmployeeTabs from "../Components/EmployeePageComponent/EmployeeTabs";
import LayoutComponent from "../Components/Fixed/LayoutComponent";
import Box from "@mui/material/Box";

function ProfilePage() {
  return (
    <LayoutComponent>
      <Box sx={{ width: "100%", mt: 3 }}>
        <EmployeeTabs />
      </Box>
    </LayoutComponent>
  )
}

export default ProfilePage