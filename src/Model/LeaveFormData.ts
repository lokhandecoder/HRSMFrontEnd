export interface LeaveFormData {
  
    employeeId : number;
    appliedLeaveTypeId : number;
    leaveTypeId: number;
    leaveType: null;
    startDate: Date | null;
    endDate: Date | null;
    leaveReason: string;
    balanceLeave: number;
    applyLeaveDay : number,
    remaingLeave:number,
    leaveStatusId: number,
    isHalfDay : boolean,
}
