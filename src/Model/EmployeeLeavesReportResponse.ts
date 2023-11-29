export interface EmployeeLeavesReportResponse {
    appliedLeaveTypeId: number;
    employeeId: number;
    employee : {
      firstName: string;
      lastName: string;
    }
    firstName: string;
    lastName: string;
    startDate: string;
    endDate: string;
    leaveTypeName: string;
    balanceLeave: number;
    appliedLeave: number;
    remainingLeave: number;
    leaveReason: string;
    applyLeaveDay: number;
    isApproved: boolean;
    isRejected: boolean;
    leaveStatusName: string;
    leaveStatusCode: string;
    leaveType : {
      leaveTypeName: string;
    }
    leaveStatus: {
      leaveStatusName : string;
    }
  }

