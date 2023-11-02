import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoardPage from "../Pages/DashBoardPage";
import LeavePage from "../Pages/LeavePage";
import StatusPage from "../Pages/StatusPage";
import AssignManager from "../Pages/AssignManager";
import LoginPage from "../Pages/LoginPage";
import ForgotPasswordPage from "../Pages/ForgotPaswordPage";
import UpdatePassword from "../Pages/UpdatePasword";
import ProtectedRoute from "./ProtectedRoute";
import AccountingYear from "../Pages/AccountingYear";
import EmployeePage from "../Pages/EmployeePage";
import EmployeesPage from "../Pages/EmployeesPage";
import { UserRoleMapping } from '../Model/UserRoleMapping';
import { GetUserRoleMappingsAsync } from '../Services/UserRoleMappingServices';
import RoleAssign from "../Pages/RoleAssign";

function RoutingPgae() {

  interface RouteConfig {
    path: string;
    element: JSX.Element;
    roleIds: number[]; // An array of role IDs that can access this route
  }

  // const routes: RouteConfig[] = [
  //   { path: '/assign', element: <AssignManager /> , roleIds: [1, 2]},
  //   { path: '/login', element: <LoginPage /> , roleIds: [1, 2]},
  //   { path: '/', element: <DashBoardPage />, roleIds: [1, 2] },
  //   { path:"/leave/:id?", element: <LeavePage />, roleIds: [2] },
  //   // Add more routes here as needed
  // ];
  // const routes: RouteConfig[] = [
  //   { path: '/assign', element: <AssignManager />, roleIds: [1, 2] },
  //   { path: '/login', element: <LoginPage />, roleIds: [1, 2, 3] },
  //   { path: '/forgotpassword', element: <ForgotPasswordPage />, roleIds: [1, 2, 3] },
  //   { path: '/updatepassword/:id?', element: <UpdatePassword />, roleIds: [1, 2, 3] },
  //   { path: '/', element: <DashBoardPage />, roleIds: [1, 2] },
  //   { path: '/leave/:id?', element: <LeavePage />, roleIds: [1, 2] },
  //   { path: '/status', element: <StatusPage />, roleIds: [1, 2] },
  //   { path: '/accountingyear', element: <AccountingYear />, roleIds: [1] },
  //   { path: '/employee/:id?', element: <EmployeePage />, roleIds: [1] },
  //   { path: '/employees', element: <EmployeesPage />, roleIds: [1] },
  // ];
  //const userRoleId = 3; // Replace this with the user's actual role(s)


  const [userRoleMappings, setUserRoleMappings] = useState<UserRoleMapping[]>([]);
  const [userrole, setuserrole] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await GetUserRoleMappingsAsync();
        setUserRoleMappings(response.data);
        console.log("user role",response.data);
        const roleid = localStorage.getItem("Role" )
        if (roleid) {
          // Parse the JSON string back to an object
          const parsedData = JSON.parse(roleid);
          console.log("parsedata",parsedData.employee.roleAssignId)
          setuserrole(parsedData.employee.roleAssignId);
        }else{
          setuserrole(null)
        }
        // setuserrole(loca)
        //console.log("222222222222222222");
      } catch (error) {
        console.error('Error fetching user role mappings: ' + (error as Error).message);
      }
    }

    fetchData();
  }, []);

  function mapElementToComponent(elementName: string) {
    switch (elementName) {
      case 'AssignManager':
        return AssignManager;
      case 'LoginPage':
        return LoginPage;
      case 'DashBoardPage':
        return DashBoardPage;
      case 'EmployeesPage':
          return EmployeesPage;
      case 'EmployeePage':
          return EmployeePage;
      case 'AccountingYear':
          return AccountingYear;
      case 'StatusPage':
          return StatusPage;
      case 'AssignManager':
          return AssignManager;
      case 'LoginPage':
          return LoginPage;
      case 'ForgotPasswordPage':
            return ForgotPasswordPage;
      case 'UpdatePassword':
            return UpdatePassword;
      case 'LeavePage':
              return LeavePage;     
      case 'RoleAssign':
            return RoleAssign;                                         
      default:
        return null; // Return a default component or handle the error

    }
  }
  return (
    <>
      <BrowserRouter>
        {/* <Routes>
          {userRoleMappings
            .filter((route) => route.roleAssignId == userRoleId)
            .map((route, index) => (
              <Route key={index} path={route.routePath} element={mapElementToComponent(route.componentName)} />
            ))}
        </Routes> */}

<Routes>
      {userRoleMappings
      .filter((route)=> route.roleAssignId == userrole)
      .map((route, index) => {
        const Component = mapElementToComponent(route.componentName);
        if (Component) {
          return (
            <Route key={index} path={route.routePath} element={<Component />} />
          );
        }
        // Handle the case where the component mapping failed
        return null;
      })}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
      <Route path="/updatepassword/:id" element={<UpdatePassword />} />      
    </Routes>
      </BrowserRouter>



    </>
  );
}

export default RoutingPgae;
