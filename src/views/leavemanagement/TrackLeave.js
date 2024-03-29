import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import tableIcons from 'views/addemployeetable/MaterialTableIcons';
import jsPDF from 'jspdf';
import { TextSnippet } from '@mui/icons-material';
import { Card, ThemeProvider, Tooltip, createTheme } from '@mui/material';
import { saveAs } from 'file-saver';
import { format } from 'date-fns'; 

const columns = [
  { title: 'Employee ID', field: 'employeeId', editable: true, width: '50px' },
  { title: 'Employee Name', field: 'employeeName', editable: true },
  { title: 'Leave Type', field: 'leaveType', sorting: true, editable: true },
  { title: 'Start Date', field: 'startDate', sorting: true, editable: true },
  { title: 'End Date', field: 'endDate', sorting: true, editable: true },
  { title: 'Number of Days', field: 'numberOfDays', sorting: true, editable: true },
  { title: 'Attachments', field: 'attachments', sorting: true, editable: true },
  { title: 'Reason', field: 'reason', sorting: true, editable: true },
  {
    title: 'Status',
    field: 'status',
    sorting: true,
    editable: true,
    render: (rowData) => (
      rowData.status === 'Approved' || rowData.status === 'Rejected' ? (
        <span style={{ color: rowData.status === 'Approved' ? 'green' : 'red' }}>
          {rowData.status}
        </span>
      ) : (
        <span style={{ color: 'orange' }}>Pending</span>
      )
    ),
  },
  {
    sorting: false,
    editable: false,
    render: (rowData) => {
      if (rowData.status === 'Pending') {
        return (
          <div>
            <button onClick={() => console.log('Approve')}>Approve</button>
            <button onClick={() => console.log('Reject')}>Reject</button>
          </div>
        );
      }
      return null;
    },
  },
];

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, 'MM/dd/yyyy'); 
};

const TrackLeave = () => {
  const [Adata, setAdata] = useState([]);
  const [Loader, setLoader] = useState(true);
  const navigate = useNavigate();

  const fetchAts = async () => {
    try {
      setLoader(false);
      const res = await axios.get(`https://hrm-backend-square.onrender.com/api/leave/`);
      const filldata = res.data.map((item) => ({
        ...item,
        startDate: formatDate(item.startDate), 
        endDate: formatDate(item.endDate), 
      }));
      console.log(filldata);
      setAdata(filldata);
      setLoader(false);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAttachments = async (id, name) => {
    try {
      const response = await axios.get(`https://hrm-backend-square.onrender.com/api/leave/${id}`, {
        responseType: 'arraybuffer',
      });
      const byteArray = new Uint8Array(response.data);
      const blob = new Blob([byteArray], { type: 'attachments/pdf' });
      saveAs(blob, `${name} attachments.pdf`);
    } catch (error) {
      console.log('Error downloading attachments:', error);
    }
  };

  const exportCsv = () => {
    const csvData = Adata.map((item) => ({
      'Employee ID': item.employeeId,
      'Employee Name': item.employeeName,
      'Leave Type': item.leaveType,
      'Start Date': item.startDate,
      'End Date': item.endDate,
      'Number of Days': item.numberOfDays,
      'Attachments': item.attachments,
      'Reason': item.reason,
      'Status': item.status,
    }));
    const csvHeaders = ['Employee ID', 'Employee Name', 'Leave Type', 'Start Date', 'End Date', 'Number of Days', 'Attachments', 'Reason', 'Status'];
    const csvRows = [csvHeaders, ...csvData.map((item) => Object.values(item).map((value) => `"${value}"`))];
    const csvContent = csvRows.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    saveAs(blob, 'list.csv');
  };

  const exportPdf = () => {
    const pdf = new jsPDF('landscape');
    pdf.text('View Leave', 10, 10);

    const rows = Adata.map((item) => [
      item.employeeId,
      item.employeeId,
      item.leaveType,
      item.startDate,
      item.endDate,
      item.numberOfDays,
      item.attachments,
      item.reason,
      item.status,
    ]);

    pdf.autoTable({
      head: [columns.map((column) => column.title)],
      body: rows,
      startY: 20,
    });

    pdf.save('list.pdf');
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#757575',
      },
      secondary: {
        main: '#7e57c2',
      },
    },
  });

  const handleView = async (e, data) => {
    const id = data.map((x) => x.id);
    console.log(data);
    navigate(`/approveleave/${id[0]}`);
  };

  useEffect(() => {
    fetchAts();
  }, []);

  return (
    <Card raised={true}>
      <ThemeProvider theme={theme}>
        {Loader ? (
          <div className="spinner" style={{ position: 'absolute', bottom: '35%', right: '45%' }} />
        ) : (
          <MaterialTable
            title={<div style={{ fontSize: '20px', marginTop: '10px', marginBottom: '10px' }}>Track Leave</div>}
            columns={columns.map((column) => {
              if (column.field === 'attachments') {
                return {
                  ...column,
                  render: (rowData) => (
                    <a href="#" onClick={() => handleAttachments(rowData.id, rowData.employeeName)}>
                      <Tooltip title="Download attachments">
                        <TextSnippet style={{ color: '#616161' }} />
                      </Tooltip>
                    </a>
                  ),
                };
              }
              return column;
            })}
            data={Adata}
            icons={tableIcons}
            actions={[
              (rowData) => ({
                icon: tableIcons.View,
                tooltip: 'View Details',
                onClick: (event, rowData) => handleView(event, rowData),
                disabled: rowData.length !== 1,
              }),
            ]}
            options={{
              actionsColumnIndex: -3,
              exportButton: true,
              exportCsv: exportCsv,
              exportPdf: exportPdf,
              grouping: true,
              selection: true,
              columnsButton: true,
              headerStyle: {
                backgroundColor: '#42a5f5',
                color: 'black',
              },
            }}
          />
        )}
      </ThemeProvider>
    </Card>
  );
};

export default TrackLeave;