import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import tableIcons from 'views/addemployeetable/MaterialTableIcons';
import jsPDF from 'jspdf';
import { Image, TextSnippet } from '@mui/icons-material';
import { Card, ThemeProvider, Tooltip, createMuiTheme } from '@mui/material';
import { saveAs } from 'file-saver';

const columns = [
  { title: 'Name', field: 'Name', editable: false,Width:'50px'},
  { title: 'Jobrole', field: 'Jobrole', editable: false},
  { title: 'Mobile No', field: 'MobileNo', sorting: false, editable: false },
  { title: 'Email', field: 'Email', sorting: false, editable: false },
  { title: 'Resume', field: 'Resume', sorting: false, editable: false },
  { title: 'Photo', field: 'Photo', sorting: false, editable: false },
  // { title: 'Applying Date', field: 'AppliedAt', type: 'date', sorting: false, editable: false},
  {title:'Rating', field: 'roundrating', sorting: false, editable: false}
];

const Shortlist = () => {
  const [Adata, setAdata] = useState([]);
  const [Loader, setLoader] = useState(true);
  const [fil, setFil] = useState([]);
  const [matchedResults, setMatchedResults] = useState([]);
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      setLoader(true);
      const res = await axios.get(`https://hrm-backend-square.onrender.com/ats/`);
      const filldata = res.data.getData;
      setAdata(filldata);
      setLoader(false);
      console.log(res.data.getData);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRec = async () => {
    try {
      const res = await axios.get(`https://hrm-backend-square.onrender.com/rec/getRec`);
      const data = res.data.getData;
      setFil(data);
    } catch (err) {
      console.log(err);
    }
  };


  const handleResume = async (id, name) => {
    try {
      const response = await axios.get(`https://hrm-backend-square.onrender.com/ats/resume/${id}`, {
        responseType: 'arraybuffer',
      });
      const byteArray = new Uint8Array(response.data);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      saveAs(blob, `${name} resume.pdf`);
    } catch (error) {
      console.log('Error downloading resume:', error);
    }
  };

  const handlePhotoDown = async (id, name) => {
    try {
      const response = await axios.get(`https://hrm-backend-square.onrender.com/ats/photo/${id}`, {
        responseType: 'arraybuffer',
      });
      const contentType = response.headers['Content-Type'];
      const extension = contentType === 'image/jpeg' ? 'jpeg' : 'png';
      const byteArray = new Uint8Array(response.data);
      const blob = new Blob([byteArray], { type: contentType });
      saveAs(blob, `${name}.${extension}`);
    } catch (error) {
      console.log('Error downloading photo:', error);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchRec();
  }, []);

 let rating,roundrating;

  useEffect(() => {
    const matched = [];
    Adata.forEach(data => {
      const matchingRole = fil.find(role => role.Jobrole.toLowerCase() == data.position.toLowerCase());
      if (matchingRole) {
        const a = matchingRole.Skills;
        const skilllength=a[0].split(',').length
        const b = data.skills;
        const aSkills = a[0].split(',').map(skill => skill.trim());
        const bSkills = b[0].split(',').map(skill => skill.trim());
        console.log(aSkills)
        const commonSkills = aSkills.filter(skill => bSkills.includes(skill));
        const commonskilllength=commonSkills.length
        rating = (commonskilllength/skilllength)*10
        roundrating=rating.toFixed(1)
       
        console.log(roundrating +' rating')

        if (commonSkills.length > 0) {
          matched.push({
            _id:data._id,
            Name:data.name,
            Jobrole: data.position,
            MobileNo:data.phone,
            Email: data.email,
            Resume: data.resume,
            Photo:data.photo,
            AppliedAt:data.appliedAt,
            Status: data.Status=="null"?"Shortlist":data.Status,
            Qualification: data.department,
            YearOfPassing:data.graduationYear,
            Skills:data.skills,
            Experience:data.experience,
            College:data.college,
            sslc:data.sslc,
            hsc:data.hsc,
            roundrating:roundrating

          });
        }
      }
    });
    console.log(matched);
    setMatchedResults(matched);
  }, [Adata, fil]);


  const exportCsv = (columns, data) => {
    const csvData = data.map((item) => ({
      Name: item.Name,
      JobRole: item.Jobrole,
      MobileNo: item.MobileNo,
      Email: item.Email,
      Qualification: item.Qualification,
      College: item.College,
      YearOfPassing: item.YearOfPassing,
      SSLCPercentage: item.sslc,
      HSCPercentage: item.hsc,
    }));
    const csvHeaders = ['Name', 'Jobrole', 'Mobile No', 'Email', 'Qualification', 'College', 'Year of Passing', 'SSLC Percentage', 'HSC Percentage'];
    const csvRows = [csvHeaders, ...csvData.map((item) => Object.values(item).map((value) => `"${value}"`))];
    const csvContent = csvRows.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Shortlist Candidates.csv');
    link.click();
  };

  const exportPdf = (columns, data) => {
    const pdf = new jsPDF('landscape');
    pdf.text('Employee Application Tracker', 10, 10);

    const rows = data.map((item) => [
      item.Name,
      item.Jobrole,
      item.MobileNo,
      item.Email,
      item.Qualification,
      item.College,
      item.YearOfPassing,
      item.sslc,
      item.hsc,
    ]);
    const columnStyle={
      0:{columnWidth:20},
      1:{columnWidth:20},
      2:{columnWidth:35},
      3:{columnWidth:20},
      4:{columnWidth:20},
      5:{columnWidth:40},
      6:{columnWidth:30},
      7:{columnWidth:20},
      8:{columnWidth:20},
      9:{columnWidth:23},
      10:{columnWidth:30},
      11:{columnWidth:25},
      12:{columnWidth:20},
    }
    const pdfHeaders = ['Name', 'Jobrole', 'Mobile No', 'Email', 'Qualification', 'College', 'Year of Passing', 'SSLC Percentage', 'HSC Percentage'];
    pdf.autoTable({
      head: [pdfHeaders],
      body: rows,
      startY: 20,
      columnStyle:columnStyle,
      theme:'grid',
    });

    pdf.save('Shortlist Candidates list.pdf');
  };

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#757575',
      },
      secondary: {
        main: '#7e57c2',
      },
    },
  });

 const handleView = async(e,data) =>{
    const id=data.map(x=>x._id)
    console.log(data)
    navigate(`/applicationview/${id[0]}`);
  }

  return (
    <Card raised={true}>
    <ThemeProvider theme={theme}>
      {Loader ? (
        <div className="spinner" style={{ position: 'absolute', bottom: '40%', right: '45%' }} />
      ) : (
        <MaterialTable
          title={<div style={{ fontSize: '20px', marginTop: '10px', marginBottom: '10px' }}>Candidates Shortlist </div>}
          columns={columns.map(column => {
            if (column.field === 'Resume') {
              return {
                ...column,
                render: rowData => (
                  <a href="#" onClick={() => handleResume(rowData._id, rowData.Name)}>
                    <Tooltip title="Download Resume">
                      <TextSnippet style={{ color: '#616161' }} />
                    </Tooltip>
                  </a>
                ),
              };
            } else if (column.field === 'Photo') {
              return {
                ...column,
                render: rowData => (
                  <a href="#" onClick={() => handlePhotoDown(rowData._id, rowData.Name)}>
                    <Tooltip title="Download Photo">
                      <Image style={{ color: '#616161' }} />
                    </Tooltip>
                  </a>
                ),
              };
            }
            return column;
          })}
          data={matchedResults}
          icons={tableIcons}
          actions={[
            rowData => ({
              icon: tableIcons.View,
              tooltip: 'View Details',
              onClick: (event, rowData) => handleView(event, rowData),
              disabled: rowData.length !== 1,
            }),
          ]}
          options={{
            actionsColumnIndex: -1,
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

export default Shortlist;
