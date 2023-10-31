
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
  const userRoleId = 1; // Replace this with the user's actual role

  const filterMenuItemsByRole = menuItems.filter((item) => {
    if (item.roleIds) {
      // If the menu item has specified roleIds, check if the user's role matches any of them
      return item.roleIds.includes(userRoleId);
    }
    // If there are no specified roleIds, the item is accessible to all
    return true;
  });

  // Example usage
  // const roleToFilter = 1; // Replace with the desired role
  //const filteredMenuItems = filterMenuItemsByRole(menuItems);
  //console.log(filteredMenuItems);

  const getIconForItem = (label: string): JSX.Element | null => {
    switch (label) {
      case 'Dashboard':
        return <SpaceDashboardIcon />;
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
      default:
        return <FormatListBulletedIcon />;
    }
  };
  const [userRoleMappings, setUserRoleMappings] = useState<UserRoleMapping[]>([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await GetUserRoleMappingsAsync();
        setUserRoleMappings(response.data);
        console.log(response.data);
        //console.log("222222222222222222");
      } catch (error) {
        console.error('Error fetching user role mappings: ' + (error as Error).message);
      }
    }

    fetchData();
  }, []);


  const filterMenuItemsByRole2 = userRoleMappings.filter((item) => {
    if (item.isMenuPage) {
      // If the menu item has specified roleIds, check if the user's role matches any of them
      return item.roleAssignId==userRoleId;
    }
    // If there are no specified roleIds, the item is accessible to all
    return true;
  });

  return (

   
    <List>
      {filterMenuItemsByRole2.map((item, index) => (
        
        <>
        {console.log(item.pageName)}
        {console.log(index)}
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
            {getIconForItem(item.pageName)}
          </ListItemIcon>
          <ListItemText primary={item.pageName} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </ListItem>
        </>
        
       
      ))
     
      }
     
    </List>
  );
};

export default SideNavLink;
