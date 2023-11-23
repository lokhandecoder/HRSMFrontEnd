import LayoutComponent from "../Components/Fixed/LayoutComponent";
import Card from "@mui/material/Card";
import * as React from "react";
import CardContent from "@mui/material/CardContent";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import StatusTable from "../Components/StatusPageComponent/StatusTable";
import EmployeeAppliedLeave from "../Components/StatusPageComponent/EmployeeAppliedLeave";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
function StatusPage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <LayoutComponent>
        <Box sx={{ width: "100%", mt: 3 }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="My Leaves" {...a11yProps(0)} />
              <Tab label="Team Leaves" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Card sx={{ minWidth: 275, boxShadow: 5 }}>
              <h1 style={{ marginLeft: "1%", fontSize: "24px" }}>
                My Leaves
              </h1>
              <CardContent>
                <StatusTable />
              </CardContent>
            </Card>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Card sx={{ minWidth: 275, boxShadow: 5 }}>
              <h1 style={{ marginLeft: "1%", fontSize: "24px" }}>
                Team Leaves
              </h1>
              <CardContent>
                <EmployeeAppliedLeave />
              </CardContent>
            </Card>
          </CustomTabPanel>
        </Box>
      </LayoutComponent>
    </>
  );
}

export default StatusPage;
