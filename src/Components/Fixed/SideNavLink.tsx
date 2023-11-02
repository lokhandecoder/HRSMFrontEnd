
import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import BadgeIcon from '@mui/icons-material/Badge';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { useNavigate } from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { UserRoleMapping } from '../../Model/UserRoleMapping';
import { GetUserRoleMappingsAsync } from '../../Services/UserRoleMappingServices';
import { getDecryptedValueFromStorage } from '../../Utilities/LocalStorageEncryptionUtilities';
import ReduceCapacityIcon from '@mui/icons-material/ReduceCapacity';
import Tooltip from '@mui/material/Tooltip';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';


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
  // const menuItems: MenuItem[] = [
  //     { label: 'Dashboard', path: '/', roles: ['admin', 'user','manager'] },
  //     { label: 'Apply for Leave', path: '/leave', roles: ['user','admin','manager'] },
  //     { label: 'Status', path: '/status', roles: ['admin', 'manager', 'user'] },
  //     { label: 'Accounting Year', path: '/accountingyear', roles: ['admin'] },
  //     { label: 'Add Employee', path: '/employee', roles: ['admin'] },
  //     { label: 'Employees List', path: '/employees', roles: ['admin'] }
  //   ];


  const menuItems: MenuItem[] = [
    { label: 'Dashboard', path: '/', roleIds: [1, 2] },
    { label: 'Apply for Leave', path: '/leave', roleIds: [1, 2] },
    { label: 'Status', path: '/status', roleIds: [1, 2] },
    { label: 'Accounting Year', path: '/accountingyear', roleIds: [1] },
    { label: 'Add Employee', path: '/employee', roleIds: [1] },
    { label: 'Employees List', path: '/employees', roleIds: [2] },
  ];

  // function filterMenuItemsByRole(menuItems: MenuItem[], role: string): MenuItem[] {
  //   return item.roleIds.some((roleId) => userRoleIds.includes(roleId));
  // }
  
  //const userRoleId = 4; // Replace this with the user's actual role
  const [userrole, setuserrole] = useState(null);
  // const filterMenuItemsByRole = menuItems.filter((item) => {
  //   if (item.roleIds) {
  //     // If the menu item has specified roleIds, check if the user's role matches any of them
  //     return item.roleIds.includes(userRoleId);
  //   }
  //   // If there are no specified roleIds, the item is accessible to all
  //   return true;
  // });

  // Example usage
  // const roleToFilter = 1; // Replace with the desired role
  //const filteredMenuItems = filterMenuItemsByRole(menuItems);
  //console.log(filteredMenuItems);

  const getIconForItem = (label: string): JSX.Element | null => {
    console.log({label});
    switch (label) {
      case 'DashBoardPage':
        return <SpaceDashboardIcon />;
      case 'LeavePage':
        return <ExitToAppIcon />
      // Return the icon component for "Apply for Leave"
      // return <YourApplyForLeaveIconComponent />;
      case 'StatusPage':
        return <FactCheckIcon />;
      case 'AccountingYear':
        return <AccountBalanceIcon />;
      case 'EmployeePage':
        return <BadgeIcon />;
      case 'EmployeesPage':
        return <FormatListBulletedIcon />;
      case 'RoleAssign':
        return <ReduceCapacityIcon />;
      case 'AssignManager':
        return <AssignmentIndIcon />;
      default:
        return <FormatListBulletedIcon />;
    }
  };
  const [userRoleMappings, setUserRoleMappings] = useState<UserRoleMapping[]>([]);
  
  const roleid = JSON.parse(localStorage.getItem("Role") || "{}");
  //const roleAssignId = roleid?.employee?.roleAssignId;
  //alert(roleAssignId)
  // useEffect(() => {

  // }, []);

  useEffect(() => {


    async function fetchData() {
      try {
        const response = await GetUserRoleMappingsAsync();
        setUserRoleMappings(response.data);
        //console.log(response.data);
        //const roleid = localStorage.getItem("Role")
        // if (roleid) {
        //   // Parse the JSON string back to an object
        //   const parsedData = JSON.parse(roleid);
        //   console.log("parsedata",parsedData.employee.roleAssignId)
        //   setuserrole(parsedData.employee.roleAssignId);
        // }else{
        //   setuserrole(null)
        // }
        //console.log("222222222222222222");
      } catch (error) {
        console.error('Error fetching user role mappings: ' + (error as Error).message);
      }
    }

    fetchData();
  }, []);


  // const filterMenuItemsByRole2 = userRoleMappings.filter((item) => {

  //   if (item.isMenuPage) {
  //     // If the menu item has specified roleIds, check if the user's role matches any of them
  //     const component = getIconForItem(item.componentName);
  //     if (component) {
  //       return item.roleAssignId==userRoleId;
  //     }
      
  //   }
  //   // If there are no specified roleIds, the item is accessible to all
  //   return true;
  // });
  const roleAssignId = getDecryptedValueFromStorage("roleAssignId","0");
  //alert(roleAssignId);
  const filterMenuItemsByRole2 = userRoleMappings.filter((item) => {
    return item.isMenuPage === true && item.roleAssignId === parseInt( roleAssignId);
  });

  return (
    
 <>
   {console.log({userRoleMappings})}
   {console.log({filterMenuItemsByRole2})}
   <List>
      {filterMenuItemsByRole2.map((item, index) => (
        
        <>
        {console.log(item.pageName)}
        {console.log(index)}
        <Tooltip key={index} title={item.pageName} placement="right">

        <ListItem
        
        key={index}
        disablePadding
        sx={{ display: 'block' }}
        onClick={() => navigate(item.menuPath)}
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
            {getIconForItem(item.componentName)}
          </ListItemIcon>
          <ListItemText primary={item.pageName} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </ListItem>
      </Tooltip>

        </>
        
       
      ))
     
      }
     
    </List>
 </>
  );
};

export default SideNavLink;
