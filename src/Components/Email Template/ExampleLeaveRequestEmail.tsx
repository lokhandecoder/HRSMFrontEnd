// ExampleLeaveRequestEmail.tsx
import React from 'react';
import LeaveRequestEmailTemplate from './LeaveRequestEmailTemplate';

const ExampleLeaveRequestEmail: React.FC = () => {
  const leaveType = 'Vacation';
  const startDate = '2023-10-10';
  const endDate = '2023-10-15';
  const message = 'I would like to request leave for the mentioned dates for personal reasons.';

  const handleApprove = () => {
    alert('Leave request approved.');
    // Add logic to handle leave approval in your application
  };

  const handleReject = () => {
    alert('Leave request rejected.');
    // Add logic to handle leave rejection in your application
  };

  return (
    <LeaveRequestEmailTemplate
      leaveType={leaveType}
      startDate={startDate}
      endDate={endDate}
      message={message}
      onApprove={handleApprove}
      onReject={handleReject}
    />
  );
};

export default ExampleLeaveRequestEmail;
