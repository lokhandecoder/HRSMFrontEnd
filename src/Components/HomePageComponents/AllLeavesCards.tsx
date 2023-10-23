import React from "react";
import Box from "@mui/system/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/system/Unstable_Grid";

function AllLeavesCards() {
  const myArray = [
    {
      type: "Vacation leave",
      days: 13,
    },
    {
      type: "Sick leave",
      days: 13,
    },
    {
      type: "Perosnal leave",
      days: 13,
    },
    {
      type: "Matenity Leave",
      days: 13,
    },
    {
      type: "Paternity Leave",
      days: 20,
    },
  ];
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {myArray.map((value, key) => (
            <Grid xs={3} key={key}>
              <Card
                sx={{
                  boxShadow: "0px 12px 16px rgba(0, 0, 0, 0.25)", // Adjust the Y-offset (4px in this example) to control shadow
                  mt: 5,
                  backgroundColor: "#8bbb83",
                  color: "white",
                  borderRadius: 2,
                }}
              >
                <CardContent>
                  <Typography
                    sx={{ fontSize: 24,color: "white"  }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {value.type}
                  </Typography>
                  <Typography sx={{ mb: 1.5, color: "white"  }} color="text.secondary">
                    Total Leaves: 13
                  </Typography>
                  <Typography sx={{ mb: 1.5 , color: "white" }} color="text.secondary">
                    Remaining Leaves : 10
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default AllLeavesCards;
