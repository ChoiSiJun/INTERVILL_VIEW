import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import Chart from '@features/dashboard/components/molecule/Chart';
import UpdateList from '@features/dashboard/components/molecule/UpdateList';
import Orders from '@features/dashboard/components/molecule/Orders';
import ModuleSettingUtill from '@common/utill/ModuleSettingUtill';
import ContentTitle from '@common/components/atoms/text/ContentTitle';
import { Toolbar } from '@mui/material';

const LibertyDashboard = () => {
  return (
    <>
      <ModuleSettingUtill />
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Toolbar>
            <ContentTitle />
          </Toolbar>
        </Grid>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <Chart />
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <UpdateList />
          </Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Orders />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default LibertyDashboard;
