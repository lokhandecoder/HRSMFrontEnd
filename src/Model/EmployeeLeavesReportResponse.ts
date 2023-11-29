export interface EmployeeLeavesReportResponse {
    appliedLeaveTypeId: number;
    employeeId: number;
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
  }

