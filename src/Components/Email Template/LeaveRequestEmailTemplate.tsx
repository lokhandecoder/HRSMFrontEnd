// LeaveRequestEmailTemplate.tsx
import React, { FunctionComponent } from 'react';

interface LeaveRequestEmailProps {
  leaveType: string;
  startDate: string;
  endDate: string;
  message: string;
  onApprove: () => void;
  onReject: () => void;
}

const LeaveRequestEmailTemplate: FunctionComponent<LeaveRequestEmailProps> = ({
  leaveType,
  startDate,
  endDate,
  message,
  onApprove,
  onReject,
}) => {
  const emailStyle = {
    fontFamily: 'Arial, sans-serif',
    fontSize: '16px',
    color: '#000000',
    border: '1px solid #ccc',
    padding: '20px',
  };

  const buttonStyle = {
    marginRight: '10px',
  };

  return (
    <div style={emailStyle}>
      <h2>Leave Request</h2>
      <p>
        <strong>Leave Type:</strong> {leaveType}
      </p>
      <p>
        <strong>Start Date:</strong> {startDate}
      </p>
      <p>
        <strong>End Date:</strong> {endDate}
      </p>
      <p>
        <strong>Message:</strong> {message}
      </p>
      <p>Please review and take action on this leave request.</p>
      <button style={buttonStyle} onClick={onApprove}>
        Approve
      </button>
      <button onClick={onReject}>Reject</button>
    </div>
  );
};

export default LeaveRequestEmailTemplate;
