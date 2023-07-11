import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import PopularCard from './PopularCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import Upcomingevents from './Upcomingevents'



const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div>
      <Grid item lg={4} md={6} sm={6} xs={12}>
        <Upcomingevents isLoading={isLoading} />
      </Grid>

      {/* <Grid item lg={4} md={6} sm={6} xs={12}>
        <EarningCard isLoading={isLoading} />
      </Grid>
      
      <Grid item lg={4} md={6} sm={6} xs={12}>
        <TotalOrderLineChartCard isLoading={isLoading} />
      </Grid>
      
      <Grid item lg={4} md={12} sm={12} xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={80} md={64} sm={44} xs={32}>
            <TotalIncomeDarkCard isLoading={isLoading} />
          </Grid>
          
          <Grid item sm={6} xs={12} md={6} lg={12}>
            <TotalIncomeLightCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid> */}
      
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={8}>
            <TotalGrowthBarChart isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} md={4}>
            <PopularCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
