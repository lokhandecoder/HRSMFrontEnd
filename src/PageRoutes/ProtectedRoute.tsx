import { Navigate, Route, useNavigate } from 'react-router-dom';
import { ReactNode, useEffect, useState } from "react";
import { EmployeeIDByLocalStorage } from '../APIConfig';
import { DecryptEmployeeID } from '../Services/EncryptEmplyeeID';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles  : any,
}

 /*a*/ 

const ProtectedRoute = ({ children,allowedRoles   }: ProtectedRouteProps) => {
  const navigate = useNavigate()

  const userRole = 'user'; // Replace with actual role retrieval logic
  const [roleAssignData, setRoleAssignData] = useState<number | null>(null);
  useEffect(() => {
    const assignId = localStorage.getItem("Role");
  
    if (assignId !== null) {
      // Parse the string to a number.
      const roleAssignId = parseInt(assignId, 10);
  
      if (!isNaN(roleAssignId)) {
        setRoleAssignData(roleAssignId);
      }
    }
  }, []);

  console.log("Role Assign id", roleAssignData);
  useEffect(() => {
    const isUserAuthenticated = localStorage.getItem("EmployeeID") !== null;

    if (!isUserAuthenticated) {

      // window.location.href = "/login";
      navigate("/login");
      
    }
    
  }, []);
  const userHasRequiredRole = () => {
    const userRole = "admin"; // Replace with actual logic to get user's role

    return allowedRoles.includes(userRole);
  };

  return userHasRequiredRole() ? <>{children}</> : <Navigate to="/login" />;

};

export default ProtectedRoute;
