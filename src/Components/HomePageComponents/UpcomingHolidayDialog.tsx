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
import UpcomingTable from "./UpcomingTable";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import holidayimage from "../../Resources/Images/holiday.png";

function UpcomingHolidayDialog() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = true; // Always show in full screen

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  interface Holiday {
    date: string;
    holiday: string;
  }

  const holidays: Holiday[] = [
    {
      date: "2023-10-02",
      holiday: "Gandhi Jayanti",
    },
    {
      date: "2023-10-19",
      holiday: "Diwali (Deepavali)",
    },
    {
      date: "2023-12-25",
      holiday: "Christmas",
    },
    {
      date: "2024-01-01",
      holiday: "New Year's Day",
    },
    {
      date: "2024-01-26",
      holiday: "Republic Day",
    },
    {
      date: "2024-03-18",
      holiday: "Holi",
    },
    {
      date: "2024-04-05",
      holiday: "Good Friday",
    },
    {
      date: "2024-04-14",
      holiday: "Baisakhi (Vaisakhi)",
    },
    {
      date: "2024-05-01",
      holiday: "Labour Day (May Day)",
    },
    {
      date: "2024-04-23",
      holiday: "Eid ul-Fitr",
    },
    {
      date: "2024-08-15",
      holiday: "Independence Day",
    },
    {
      date: "2024-09-02",
      holiday: "Ganesh Chaturthi",
    },
  ];

  return (
    <div>
      <Card
        sx={{
          boxShadow: "0px 12px 16px rgba(0, 0, 0, 0.25)", // Adjust the Y-offset (4px in this example) to control shadow
          mt: 5,
          height: 340,
          backgroundColor: "#1e2146",
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
            image={holidayimage}
            alt="green iguana"
            style={{ maxWidth: "100px", filter: "brightness(0) invert(1)" }}
          />
          <Button onClick={handleClickOpen} sx={{ color: "white" }}>
            Upcoming Holidays
          </Button>
          <Dialog
            style={{ margin: "100px" }}
            fullScreen={fullScreen}
            open={open}
            onClick={handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">Leaves</DialogTitle>
            <DialogContent>
              <UpcomingTable holidays={holidays} />
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}

export default UpcomingHolidayDialog;
