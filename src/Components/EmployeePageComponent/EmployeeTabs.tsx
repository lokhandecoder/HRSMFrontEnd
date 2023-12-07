import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AddEmployee from "./AddEmployee";
import EmployeeBankDetails from "./EmployeeBankDetails";
import EmployeeIdentity from "./EmployeeIdentity";
import EmployeePassportDetailsPage from "./EmployeePassportDetailsPage";

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

export default function EmployeeTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Add Employee" {...a11yProps(0)} />
          <Tab label="Bank Details" {...a11yProps(1)} />
          <Tab label="Identity Details" {...a11yProps(2)} />
          <Tab label="Passport Details" {...a11yProps(3)} />
          <Tab label="Identity Details" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <AddEmployee />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <EmployeeBankDetails />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <EmployeeIdentity />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <EmployeePassportDetailsPage />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}></CustomTabPanel>
    </Box>
  );
}
