
import { useEffect, useState } from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip  } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import BadgeIcon from '@mui/icons-material/Badge';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
//import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import {SpaceDashboard} from '@mui/icons-material';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { useNavigate } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
//import { GetRoleAssignIdByEmployee } from '../../Services/RoleAssignServices';
import { EmployeeModel } from '../../Model/EmployeeModel';



interface MenuItem {
    label: string;
    path: string;
    roles?: string[];
    ToolTiplabel: string;
  }
  
  interface SideNavLinkProps {
    open: boolean; // Assuming `open` is a boolean
  }

  const SideNavLink = ({ open }: SideNavLinkProps) => {
    const navigate = useNavigate();
    const menuItems: MenuItem[] = [
        { label: 'Dashboard', path: '/', roles: ['admin', 'user','manager'], ToolTiplabel: 'Way to Dashboard' },
        { label: 'Apply for Leave', path: '/leave', roles: ['user','admin','manager'], ToolTiplabel: 'Want to Apply a Leave'  },
        { label: 'Status', path: '/status', roles: ['admin', 'manager', 'user'], ToolTiplabel: 'Shows Leave Status'  },
        { label: 'Accounting Year', path: '/accountingyear', roles: ['admin'], ToolTiplabel: 'Setting Accounting Year'  },
        { label: 'Add Employee', path: '/employee', roles: ['admin'], ToolTiplabel: 'Dashboard'  },
        { label: 'Employees List', path: '/employees', roles: ['admin'], ToolTiplabel: 'Dashboard'  },
        { label: 'Role Assign', path: '/roleassign', roles: ['admin'], ToolTiplabel: 'Assign Roles' }
      ];
      
      function filterMenuItemsByRole(menuItems: MenuItem[], role: string): MenuItem[] {
        return menuItems.filter(item => !item.roles || item.roles.includes(role));
      }
      //const checking = GetRoleAssignIdByEmployee();
      

      // const [data, setData] = useState<EmployeeModel[] | null>(null);

      // useEffect(() => {
      //   const fetchData = async () => {
      //     try {
      //       // Use the employeeRoleAssignId in your API call or data fetching logic
      //       const result = await GetRoleAssignIdByEmployee();
      //       setData(result);
      //     } catch (error) {
      //       console.error("Failed to fetch data: ", (error as Error).message);
      //     }
      //   };
    
      //   fetchData();
      // }, []);

      // Example usage
      const roleToFilter = 'admin'; // Replace with the desired role
      const filteredMenuItems = filterMenuItemsByRole(menuItems, roleToFilter);
      console.log(filteredMenuItems);

  const getIconForItem = (label: string): JSX.Element | null => {
    switch (label) {
      case 'Dashboard':
        return <SpaceDashboard />;
      case 'Apply for Leave':
        return <ExitToAppIcon />
        // Return the icon component for "Apply for Leave"
        // return <YourApplyForLeaveIconComponent />;
      case 'Status':
        return <FactCheckIcon />;
      case 'Accounting Year':
        return <AccountBalanceIcon />;
      case 'Add Employee':
        return <BadgeIcon />;
      case 'Employees List':
        return <FormatListBulletedIcon />;
        case 'Role Assign':
          return <AssignmentIndIcon />;
      default:
        return null;
    }
  };
  
  return (
    <List>
      {filteredMenuItems.map((item, index) => (
        <Tooltip title={item.label} key={index} arrow>
          <ListItem
            disablePadding
            sx={{ display: 'block' }}
            onClick={() => navigate(item.path)}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center'
                }}
              >
                {/* Replace with appropriate icon based on the item */}
                {getIconForItem(item.label)}
              </ListItemIcon>
              <ListItemText primary={item.label} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </Tooltip>
      ))}
    </List>
  );
};

export default SideNavLink;
