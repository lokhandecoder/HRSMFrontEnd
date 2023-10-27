import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
import RoleAssign from "../Pages/RoleAssign";

function RoutingPgae() {
  const jsonConfig = {
    routes: [
      {
        path: "/assign",
        protected: false,
        component: "AssignManager",
      },
      {
        path: "/login",
        protected: false,
        component: "LoginPage",
      },
      {
        path: "/forgotpassword",
        protected: false,
        component: "ForgotPasswordPage",
      },
      {
        path: "/updatepassword/:id?",
        protected: false,
        component: "UpdatePassword",
      },
      {
        path: "/",
        component: "DashBoardPage",
        protected: true,
        allowedRoles: ["admin", "user"],
      },
      {
        path: "/leave/:id?",
        component: "LeavePage",
        protected: true,
        allowedRoles: ["admin", "user"],
      },
      {
        path: "/status",
        component: "StatusPage",
        protected: true,
        allowedRoles: ["admin", "user"],
      },
      {
        path: "/accountingyear",
        component: "AccountingYear",
        protected: true,
        allowedRoles: ["admin"],
      },
      {
        path: "/employee/:id?",
        component: "EmployeePage",
        protected: true,
        allowedRoles: ["admin"],
      },
      {
        path: "/employees",
        component: "EmployeesPage",
        protected: true,
        allowedRoles: ["admin"],
      },
      {
        path: "/roleassign",
        component: "RoleAssign",
        protected: true, // Set this to true if it should be protected
        allowedRoles: ["admin"], // Define allowed roles if needed
      },
    ],
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/assign" element={<AssignManager />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route
            path="/forgotpassword"
            element={<ForgotPasswordPage />}
          ></Route>
          <Route
            path="/updatepassword/:id?"
            element={<UpdatePassword />}
          ></Route>
          <Route
            path="/"
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]}>
                <DashBoardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leave/:id?"
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]}>
                <LeavePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/status"
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]}>
                <StatusPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/accountingyear"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AccountingYear />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employee/:id?"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <EmployeePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employees"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <EmployeesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/roleassign"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <RoleAssign />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default RoutingPgae;
