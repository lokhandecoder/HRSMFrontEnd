export interface AppliedLeave {
    appliedLeaveTypeId?: number;
    employeeId: number;
    leaveTypeId: number;
    leaveType: null;
    startDate: Date | null;
    endDate: Date | null;
    leaveReason: string;
    balanceLeave: number;
    applyLeaveDay: number;
    remaingLeave: number;
    leaveStatusId: number;
    isRejected: boolean;
    isApproved: boolean;
    firstName: string;
    lastName: string;
    leaveTypeName: string;
    leaveStatusName: string;
    leaveStatusCode: string;
  }

  export interface AppliedLeaveUpdateStatus {
    appliedLeaveTypeId : number;
    statusCode : string;
    leaveAllocationId : number;
    commentByUser : string,
    date : Date | null;
  }