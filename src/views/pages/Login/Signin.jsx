import * as React from 'react';
import { Link } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import {
  SuperDiv,
  SuperContainer,
  StyledPaper,
  StyledTypography,
  StyledBox,
  FormContainer,
  StyledDiv,
  StyledGrid,
  StyledTextField,
  StyledButton,
  SocialMediaContainer,
  Separator,
  StyledText,
  StyledRoute,
  StyledDivider
} from './Styled';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Logo from '../assets/Logo';
import GoogleLogo from '../assets/GoogleLogo';
import FackBookLogo from '../assets/FackBookLogo';

const defaultTheme = createTheme();

const Signin = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <SuperDiv>
        <SuperContainer component="main" maxWidth="xs">
          <CssBaseline />
          <StyledPaper>
            <StyledDiv>
              <Logo />
            </StyledDiv>

            <Divider>
              <StyledTypography className="auth__name">Sign In</StyledTypography>
            </Divider>
            <StyledBox>
              <FormContainer>
                <StyledGrid container spacing={2}>
                  <StyledGrid item xs={12}>
                    <StyledTextField id="email" label="Email Address" type="email" size="small" />
                  </StyledGrid>
                  <StyledGrid item xs={12}>
                    <StyledTextField label="Password" type="password" id="password" size="small" />
                  </StyledGrid>
                </StyledGrid>
                <StyledButton type="submit" fullWidth variant="contained" component={Link} to="/dashboard/default">
                  Sign In
                </StyledButton>
                <Divider>
                  <Chip label="OR" />
                </Divider>
                <SocialMediaContainer>
                  <GoogleLogo />

                  <Separator />
                  <FackBookLogo />
                </SocialMediaContainer>

                <StyledGrid item xs={12}>
                  <StyledDivider />
                </StyledGrid>
                <StyledGrid item xs={12}>
                  <StyledRoute>
                    <StyledText> Don&apos;t have an account?</StyledText>

                    <StyledText sm={6} component={Link} to="/pages/register">
                      Create Account
                    </StyledText>
                  </StyledRoute>
                </StyledGrid>
              </FormContainer>
            </StyledBox>
          </StyledPaper>
        </SuperContainer>
      </SuperDiv>
    </ThemeProvider>
  );
};

export default Signin;
