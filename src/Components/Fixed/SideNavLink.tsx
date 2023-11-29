import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import BadgeIcon from "@mui/icons-material/Badge";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import { useNavigate } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { UserRoleMapping } from "../../Model/UserRoleMapping";
import { GetUserRoleMappingsAsync } from "../../Services/UserRoleMappingServices";
import { getDecryptedValueFromStorage } from "../../Utilities/LocalStorageEncryptionUtilities";
import ReduceCapacityIcon from "@mui/icons-material/ReduceCapacity";
import Tooltip from "@mui/material/Tooltip";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AssessmentIcon from "@mui/icons-material/Assessment";

interface MenuItem {
  label: string;
  path: string;
  roleIds: number[];
}

interface SideNavLinkProps {
  open: boolean; // Assuming `open` is a boolean
}

const SideNavLink = ({ open }: SideNavLinkProps) => {
  const navigate = useNavigate();

  const menuItems: MenuItem[] = [
    { label: "Dashboard", path: "/", roleIds: [1, 2] },
    { label: "Apply for Leave", path: "/leave", roleIds: [1, 2] },
    { label: "Status", path: "/status", roleIds: [1, 2] },
    { label: "Accounting Year", path: "/accountingyear", roleIds: [1] },
    { label: "Add Employee", path: "/employee", roleIds: [1] },
    { label: "Employees List", path: "/employees", roleIds: [2] },
  ];

  const getIconForItem = (label: string): JSX.Element | null => {
    switch (label) {
      case "DashBoardPage":
        return <SpaceDashboardIcon />;
      case "LeavePage":
        return <ExitToAppIcon />;
      case "StatusPage":
        return <FactCheckIcon />;
      case "AccountingYear":
        return <AccountBalanceIcon />;
      case "EmployeePage":
        return <BadgeIcon />;
      case "EmployeesPage":
        return <FormatListBulletedIcon />;
      case "RoleAssign":
        return <ReduceCapacityIcon />;
      case "AssignManager":
        return <AssignmentIndIcon />;
      case "LeaveReportsPage":
        return <AssessmentIcon />;
      default:
        return <FormatListBulletedIcon />;
    }
  };
  const [userRoleMappings, setUserRoleMappings] = useState<UserRoleMapping[]>(
    []
  );

  const roleid = JSON.parse(localStorage.getItem("Role") || "{}");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await GetUserRoleMappingsAsync();
        setUserRoleMappings(response.data);
      } catch (error) {
        console.error(
          "Error fetching user role mappings: " + (error as Error).message
        );
      }
    }

    fetchData();
  }, []);

  const roleAssignId = getDecryptedValueFromStorage("roleAssignId", "0");
  const filterMenuItemsByRole2 = userRoleMappings.filter((item) => {
    return (
      item.isMenuPage === true && item.roleAssignId === parseInt(roleAssignId)
    );
  });

  return (
    <>
      <List>
        {filterMenuItemsByRole2.map((item) => (
          <Tooltip
            key={item.applicationPageId}
            title={item.pageName}
            placement="right"
          >
            <ListItem
              key={item.applicationPageId}
              disablePadding
              sx={{ display: "block" }}
              onClick={() => navigate(item.menuPath)}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {getIconForItem(item.componentName)}
                </ListItemIcon>
                <ListItemText
                  primary={item.pageName}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </Tooltip>
        ))}
      </List>
    </>
  );
};

export default SideNavLink;
