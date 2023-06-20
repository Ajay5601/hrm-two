import React, { useState } from 'react';
import styled from 'styled-components';

const LeaveTrackerWrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
`;

const Heading = styled.h1`
  text-align: center;
`;

const Form = styled.form`
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
`;

const SubmitButton = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const RequestList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const RequestItem = styled.li`
  margin-bottom: 20px;
`;

const RequestDetails = styled.div`
  margin-bottom: 10px;
`;

const RequestActions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ApproveButton = styled.button`
  background-color: #28a745;
  color: #fff;
  border: none;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background-color: #218838;
  }
`;

const RejectButton = styled.button`
  background-color: #dc3545;
  color: #fff;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;

const LeaveTracker = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [newRequest, setNewRequest] = useState({
    from: '',
    to: '',
    reason: '',
  });

  const handleInputChange = (event) => {
    setNewRequest({
      ...newRequest,
      [event.target.name]: event.target.value,
    });
  };

  const handleRequestSubmit = (event) => {
    event.preventDefault();
    if (newRequest.from.trim() !== '' && newRequest.to.trim() !== '' && newRequest.reason.trim() !== '') {
      const updatedRequests = [...leaveRequests, newRequest];
      setLeaveRequests(updatedRequests);
      setNewRequest({
        from: '',
        to: '',
        reason: '',
      });
    }
  };

  const handleRequestDelete = (index) => {
    const updatedRequests = [...leaveRequests];
    updatedRequests.splice(index, 1);
    setLeaveRequests(updatedRequests);
  };

  return (
    <LeaveTrackerWrapper>
      <Heading>Leave Tracker</Heading>
      <Form onSubmit={handleRequestSubmit}>
        <Input
          type="date"
          name="from"
          placeholder="From"
          value={newRequest.from}
          onChange={handleInputChange}
        />
        <Input
          type="date"
          name="to"
          placeholder="To"
          value={newRequest.to}
          onChange={handleInputChange}
        />
        <Input
          type="text"
          name="reason"
          placeholder="Reason"
          value={newRequest.reason}
          onChange={handleInputChange}
        />
        <SubmitButton type="submit">Submit</SubmitButton>
      </Form>
      <RequestList>
        {leaveRequests.map((request, index) => (
          <RequestItem key={index}>
            <RequestDetails>
              <strong>Date: </strong>
              {request.from} to {request.to}
            </RequestDetails>
            <RequestDetails>
              <strong>Reason: </strong>
              {request.reason}
            </RequestDetails>
            <RequestActions>
              <ApproveButton>Approve</ApproveButton>
              <RejectButton>Reject</RejectButton>
              <button onClick={() => handleRequestDelete(index)}>Delete</button>
            </RequestActions>
          </RequestItem>
        ))}
      </RequestList>
    </LeaveTrackerWrapper>
  );
};

export default LeaveTracker;
