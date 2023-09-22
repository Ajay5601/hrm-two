import styled, { keyframes } from "styled-components";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const slideInFromLeft = keyframes`
  from {
    transform: translateX(-20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

// Define a keyframe animation for buttons
const scaleIn = keyframes`
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

export const SuperDiv = styled.div`
  min-height:100vh;
  background-color:#1c1c1c;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const SuperContainer = styled(Container)`
 max-width:444px;

`;

export const StyledPaper = styled(Paper)`
  padding: 40px;
  elevation:0;
  width: 100%;
  padding-left: 40px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 40px;
  font-family: 'Roboto', sans-serif;
  animation: ${fadeIn} 0.5s ease-in-out;
  border-radius: 20px;
  
`;
export const StyledDiv = styled.div`
margin: 15px;
display: flex;
justify-content: center;
`;
export const StyledSign = styled.div`
margin: 15px;

`;

export const StyledTypography = styled(Typography)`
  margin-top: -10px;
  font-size: 1.5rem;
  font-weight: 700;
  font-family: 'Roboto', sans-serif;
  line-height: 1.2;
  color:"#34a853" ;
  
  @font-face {
    font-family: 'Roboto';
    src: url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
  }
  
  &.auth__name {
    font-size: 1.5rem; 
   font-weight: bold;
   
  }
`;

export const StyledBox = styled(Box)`
  margin-top: 1px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FormContainer = styled.form`
margin-top: 0.5rem; 
`;

export const StyledGrid = styled(Grid)`
  && {
    margin-bottom:-1px; 
  }
`;

export const StyledTextField = styled(TextField)`
&& {
  width: 100%;
  box-sizing: content-box;
  border: none;
  background: #f8fafc;
  animation: ${slideInFromLeft} 0.5s ease-in-out;
}
`;


export const StyledButton = styled(Button)`
  && {
    width: 100%;
    margin-top: 15px;
    margin-bottom: 8px;
    background: #18122B;
    animation: ${scaleIn} 0.5s ease-in-out;


    &:hover {
      background: #333; /* Change to the desired hover color */
    }
  }
`;

export const StyledOr = styled.div`
margin: 10px;

`;
export const SocialMediaContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3px;
  margin-bottom: 8px;
`;

export const Separator = styled.div`
  margin-top: 3px;
  border-right: 0.1px solid #786a6a;
  height: 20px;
  margin: 0 16px;
`;


export const StyledRoute = styled(Grid)`
  && {
    display: flex;
    justify-content: center;
    margin: 12px;
  }
`;

// Define a styled component for the Typography
export const StyledText = styled(Typography)`
  && {
   
  }
`;
export const StyledDivider = styled.hr`
  border: 0.5px solid;
`;