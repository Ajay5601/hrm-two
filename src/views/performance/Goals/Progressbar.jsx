import React from 'react';
import { Grid } from '@mui/material';
import Item from 'antd/es/list/Item';
import './Progressbar.css';

const Progressbar = ({goal }) => {
  const { GoalTit1, GoalPer1 } = goal
  // console.log(GoalTit1,GoalPer1)
  return (
    <>
          <div className="center">
            <div className="card green">
              <div className="additional">
                <div className="user-card"></div>
                <div className="more-info">
                  <div className="stats">

                    <div>
                      <div className="title">IceBox</div>

                      <div className="value">2</div>
                    </div>
                    <div>
                      <div className="title">Inprogress</div>

                      <div className="value">6</div>
                    </div>
                    <div>
                      <div className="title">Completed</div>

                      <div className="value">7</div>
                    </div>
                    <div>
                      <div className="title">Blocked</div>

                      <div className="value">1</div>
                    </div>
                  </div>
                </div>
              </div>
              <Grid container spacing={2}  sx={{listStyle:"none", }}>
  <Grid item xs={9}  sx={{marginLeft:"30px",  }}>
    <Item><h3 style={{marginBottom:"0px"}}>{GoalTit1}</h3></Item>
  </Grid>
  <Grid item xs={2}  sx={{}}>
    <Item><h4 className="h4" style={{marginBottom:"0px"}}>{GoalPer1}</h4></Item>
  </Grid>
  <Grid item xs={1} sx={{marginLeft:"30px", }}>
    <Item>50%</Item>
  </Grid>
  <Grid item xs={10} sx={{ }} >
    <Item sx={{}}>
    <svg width="100%" height="15" xmlns="http://www.w3.org/2000/svg">
              <rect y="30%" fill="#dce0e3" width="100%" height="7" strokeLinecap="round" rx="5" ry="5" />
              <rect y="30%" fill="#92bCa6" width="50%" height="7" strokeLinecap="round" rx="5" ry="5" />
            </svg>
    </Item>
  </Grid>
  </Grid>

            </div>
          </div>

         
          </>
  );
};

export default Progressbar;
