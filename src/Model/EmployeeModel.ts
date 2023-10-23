import { DesignationModel } from "./DesignationModel";
import { GenderModel } from "./GenderModel";

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
      designation : DesignationModel | null;
      gender : GenderModel | null;
      // gender: {
      //   designationName: string | null; // Adjust the type accordingly
      // };
      // gender: {
      //   genderCode: string | null;
      // }
    }