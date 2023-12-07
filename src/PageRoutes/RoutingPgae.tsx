import React, { useEffect, useState } from "react";
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
import { UserRoleMapping } from "../Model/UserRoleMapping";
import { GetUserRoleMappingsAsync } from "../Services/UserRoleMappingServices";
import RoleAssign from "../Pages/RoleAssign";
import LeaveApprovedPage from "../Pages/LeaveApprovedPage";
import AppliedLeaveUpdateStatusEmail from "../Pages/AppliedLeaveUpdateStatusEmail";
import PageNotFoundPage from "../Pages/PageNotFoundPage";
import LeaveReportsPage from "../Pages/LeaveReportsPage";
import ManageHolidays from "../Pages/ManageHolidays";
import ProfilePage from "../Pages/ProfilePage";
// import ManageHolidays from "../Pages/ManageHolidays_copy";

function RoutingPgae() {
  interface RouteConfig {
    path: string;
    element: JSX.Element;
    roleIds: number[]; // An array of role IDs that can access this route
  }

  const [userRoleMappings, setUserRoleMappings] = useState<UserRoleMapping[]>(
    []
  );
  const [token, setToken] = useState<Boolean>(false);
  const [userrole, setuserrole] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await GetUserRoleMappingsAsync();
        setUserRoleMappings(response.data);
        const roleid = localStorage.getItem("Role");
        const istoken = localStorage.getItem("Token");
        if (istoken) {
          setToken(true);
        } else {
          setToken(false);
        }
        if (roleid) {
          // Parse the JSON string back to an object
          const parsedData = JSON.parse(roleid);
          setuserrole(parsedData.roleAssignId);
        } else {
          setuserrole(null);
        }
        // setuserrole(loca)
        //console.log("222222222222222222");
      } catch (error) {
        console.error(
          "Error fetching user role mappings: " + (error as Error).message
        );
      }
    }

    fetchData();
  }, []);

  function mapElementToComponent(elementName: string) {
    switch (elementName) {
      case "AssignManager":
        return AssignManager;
      case "LoginPage":
        return LoginPage;
      case "DashBoardPage":
        return DashBoardPage;
      case "EmployeesPage":
        return EmployeesPage;
      case "EmployeePage":
        return EmployeePage;
      case "AccountingYear":
        return AccountingYear;
      case "StatusPage":
        return StatusPage;
      case "AssignManager":
        return AssignManager;
      case "LoginPage":
        return LoginPage;
      case "ForgotPasswordPage":
        return ForgotPasswordPage;
      case "UpdatePassword":
        return UpdatePassword;
      case "LeavePage":
        return LeavePage;
      case "RoleAssign":
        return RoleAssign;
      case "LeaveApprovedPage":
        return LeaveApprovedPage;
      case "LeaveReportsPage":
        return LeaveReportsPage;
      case "ManageHolidays":
        return ManageHolidays;
      case "ProfilePage":
        return ProfilePage;
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
          {token ? (
            <>
              {userRoleMappings &&
                userRoleMappings
                  .filter((route) => route.roleAssignId == userrole)
                  .map((route, index) => {
                    const Component = mapElementToComponent(
                      route.componentName
                    );
                    if (Component) {
                      return (
                        <Route
                          key={index}
                          path={route.routePath}
                          element={<Component />}
                        />
                      );
                    }
                    // Handle the case where the component mapping failed
                    return null;
                  })}
              {/* <Route path="/roleassign" element={<RoleAssign />} /> */}
              <Route
                path="/appliedleavestatus/:code"
                element={<AppliedLeaveUpdateStatusEmail />}
              />
              <Route path="*" element={<PageNotFoundPage />} />
            </>
          ) : (
            // If no token, redirect to the 'PageNotFoundPage' route
            <>
              <Route path="*" element={<PageNotFoundPage />} />
              <Route path="/login" element={<LoginPage />} />
              {/* <Route path="/" element={<LoginPage />} /> */}
              <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
              <Route path="/updatepassword/:id" element={<UpdatePassword />} />
              <Route path="/leaveapproved" element={<LeaveApprovedPage />} />
              <Route path="/404NOtFound" element={<PageNotFoundPage />} />
              <Route
                path="/appliedleavestatus/:code"
                element={<AppliedLeaveUpdateStatusEmail />}
              />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default RoutingPgae;
