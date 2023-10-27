import { DesignationModel } from "./DesignationModel";
import { GenderModel } from "./GenderModel";
import { ColumnHeaderModel } from "./RoleAssignModels";

export interface EmployeeModel {
    employeeId: number,
      firstName: string;
      lastName: string;
      dateOfBirth: string | null;
      dateOfJoining: string | null;
      emailAddress: string;
      mobileNo: string;
      genderId: number;
      designationId: number;
      isActive: boolean;
      roleAssignId: number;
      designation : DesignationModel | null;
      gender : GenderModel | null;  
      role: ColumnHeaderModel | null;    
      // gender: {
      //   designationName: string | null; // Adjust the type accordingly
      // };
      // gender: {
      //   genderCode: string | null;
      // }
    }