import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import AllLeavesCards from "./AllLeavesCards";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import leaveimage from "../../Resources/Images/leave.png";
import Typography from "@mui/material/Typography";

function LeavesScreenDialog() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = true; // Always show in full screen

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Card
        sx={{
          boxShadow: "0px 12px 16px rgba(0, 0, 0, 0.25)", // Adjust the Y-offset (4px in this example) to control shadow
          mt: 5,
          height: 340,
          backgroundColor: "#8bbb83",
          color: "white",
          borderRadius: 6,
        }}
      >
        <CardContent>
          <Typography
            sx={{ fontSize: 24, color: "white" }}
            color="text.secondary"
            gutterBottom

          >
            01
          </Typography>
          <CardMedia 
            component="img"
            height="100"
            image={leaveimage}
            alt="green iguana"
            style={{ maxWidth: "100px", filter: "brightness(0) invert(1)" }}
          />
          <Button onClick={handleClickOpen} sx={{ color: "white" }}>
            Leaves
          </Button>
          <Dialog
            style={{ margin: "150px" }}
            fullScreen={fullScreen}
            open={open}
            onClick={handleClose}
            aria-labelledby="responsive-dialog-title"

          >
            <DialogTitle id="responsive-dialog-title" >Leaves</DialogTitle>
            <DialogContent>
              <AllLeavesCards />
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}

export default LeavesScreenDialog;
