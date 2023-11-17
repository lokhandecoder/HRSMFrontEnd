import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import dayjs, { Dayjs } from "dayjs";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function StatusFilter() {
  return (
    <Card sx={{ minWidth: 275, mt: 5, boxShadow: 5 }}>
      <CardContent>
        <Box sx={{ width: "100%" }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 1 }}
          >
            <Grid item xs={12} sm={4} md={3} lg={2}>
              <Typography
                sx={{ mt: 2, mb: 4,  }}
                variant="body2"
                color="text.secondary"
                align="center"
              >
                Name :
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={2}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                name="name"
                //   value={
                //     formData.leaveTypeCounts[leaveType.leaveTypeId] ||
                //     ""
                //   }
                //   onChange={(e) =>
                //     handleTextFieldChange(leaveType.leaveTypeId, e)
                //   }
                //   style={{ marginTop: "8px"}} // Adjust the margin as needed
              />
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={2}>
            <Typography
                sx={{ mt: 2, mb: 4 }}
                variant="body2"
                color="text.secondary"
                align="center"
              >
               LeaveType : 
              </Typography>

            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={2}>

            </Grid>
          </Grid>
        </Box>
      </CardContent>
      <CardActions style={{ justifyContent: "right" }}>
        <Button type="submit" size="large" variant="contained" color="primary">
          Filter
        </Button>
      </CardActions>
    </Card>
  );
}

export default StatusFilter;
