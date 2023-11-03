import React , { useEffect }from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import axios from "axios";
import { API_URL } from '../APIConfig';

const StyledCard = styled(Card)`
  min-width: 275px;
  padding: 16px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  background-color: #4CAF50; /* Green color */
  color: #fff; /* White font color */


`;

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};



function LeaveApprovedPage() {
    useEffect(() => {
        axios.get(`${API_URL}appliedLeave/UpdateIsApprovedAsync/48/true`).then((res) => console.log("res", res.data.message)).catch((e) => console.log(e))
    
    },[])
  return (
    <div style={containerStyle}>
      <StyledCard>
        <CardContent>
          <Typography variant="h5" component="div">
            Leave has been Approved Successfully
          </Typography>
        </CardContent>
      </StyledCard>
    </div>
  );
}

export default LeaveApprovedPage;
