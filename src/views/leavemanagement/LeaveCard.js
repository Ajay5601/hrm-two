import { Button } from '@mui/material';
import React from 'react'
import styled from 'styled-components'
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
const Cards = styled.div`
display: flex;
gap: 70px;
justify-content: center;
`

const Card1 = styled.div`
height: 150px;
background-color: #000;
width: 300px;
border-radius: 5px;
color: #fff;
justify-content: center;
display: flex;
flex-direction: column;
align-items: center;
`;

const Card2 = styled.div`
height: 150px;
background-color: #000;
width: 300px;
border-radius: 5px;
color: #fff;
justify-content: center;
display: flex;
flex-direction: column;
align-items: center;

`
const Card3 = styled.div`
height: 150px;
background-color: #000;
width: 300px;
border-radius: 5px;
color: #fff;
justify-content: center;
display: flex;
flex-direction: column;
align-items: center;

`
const AddDialog = styled(Dialog)`
&&{
    height: 300px;
    width: 300px;
   justify-content: center !important;
   display: flex;
}
`
const SumbitButton = styled(Button)`
&&{
    width: 100%;
    background-color: #2196F3;
    margin-top: 40px;
    color: #ffff;
}
`
const Number=styled.h2`
margin: 0px;
position: absolute;
top:310px;
`
const HeadText = styled.h2`
position:fixed;
`

const LeaveCard = () => {
    const [open, setopen] = useState(false);
    const [annualleave,setAnnualLeave]=useState("");
    // const [cardone,setcardone]=useState('')
    const [employeeId,setEmployeeId]=useState("");
    const [selectemployee,setSelectemployee]=useState([]);
    console.log(selectemployee)
    const EmployeeId = selectemployee._id;
    console.log(EmployeeId)
    const [allemployees,setAllemployees]=useState([]);
    const employee = useSelector((state)=>state.customization.authId)


const handleSubmit = async () => {
    
    try {
      const apiUrl = `https://hrm-backend-square.onrender.com/api/updateemployee/${EmployeeId}`;
      const response = await axios.put(apiUrl, { annualLeave: annualleave });
      console.log(response.data); 
      setAnnualLeave('');
      setSelectemployee([]);
      setopen(false);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchEmployeesData = async () => {
    try {
      const getall = await axios.get(`https://hrm-backend-square.onrender.com/api/allemployee`);
      const employees = getall.data;
      setAllemployees(employees);
      const empId=employee;
      const filteredEmployees = employees.filter(employee => employee.employeeid === empId);
    setEmployeeId(filteredEmployees.map((emp)=>emp._id))
    console.log(employeeId)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    fetchEmployeesData();
  },[])
    return (
        <>
            <Button variant='contained' onClick={() => setopen(true)} >Add</Button>
            <Cards>
                <Card1>
                   <HeadText>Annual Leave</HeadText> 
                    <Number>{annualleave?annualleave:''}</Number>
                </Card1>
                <Card2>
                   <h2>Leave Taken</h2> 
                   <Number>0</Number>
                </Card2>
                <Card3>
                   <h2> Remaining Leave</h2>
                   <Number>12</Number>
                </Card3>
            </Cards>
            <AddDialog
                header='Apply leave'
                visible={open}
                onHide={() => setopen(false)}
            >
        <div >
            <Dropdown value={selectemployee} onChange={(e) => setSelectemployee(e.value)} options={allemployees} optionLabel="name" 
                placeholder="Select Employee" style={{width:"100%",marginBottom:"20px"}} />
        </div>
        <InputNumber value={annualleave} onValueChange={(e)=>setAnnualLeave(e.target.value)} mode="decimal" showButtons min={0} max={100} style={{width:"100%"}}/>
<SumbitButton onClick={handleSubmit}>Add</SumbitButton>
            </AddDialog>

        </>
    )
}

export default LeaveCard