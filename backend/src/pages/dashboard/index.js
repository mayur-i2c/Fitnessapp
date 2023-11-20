import { useState, useEffect } from 'react';

// material-ui
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Grid,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Stack,
  TextField,
  Typography,
  CircularProgress
} from '@mui/material';

// project import
import OrdersTable from './OrdersTable';
import IncomeAreaChart from './IncomeAreaChart';
import MonthlyBarChart from './MonthlyBarChart';
import ReportAreaChart from './ReportAreaChart';
import SalesColumnChart from './SalesColumnChart';
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

// assets
import { GiftOutlined, MessageOutlined, SettingOutlined } from '@ant-design/icons';
import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';

import { getDashboardCount } from '../../ApiServices';

// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};

// sales report status
const status = [
  {
    value: 'today',
    label: 'Today'
  },
  {
    value: 'month',
    label: 'This Month'
  },
  {
    value: 'year',
    label: 'This Year'
  }
];

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  const [value, setValue] = useState('today');
  const [slot, setSlot] = useState('week');
  const [isLoading, setIsLoading] = useState(true);
  const [allCount, setAllCount] = useState(null);

  const getAllCount = async () => {
    try {
      const response = await getDashboardCount();
      const newAllCount = response.data.info;
      setAllCount(newAllCount);
      setIsLoading(false);
    } catch (err) {
      if (!err.response.data.isSuccess) {
        if (err.response.data.status === 401) {
          toast.error(err.response.data.message);
        } else {
          console.log(err.response.data, 'else');
        }
      }
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getAllCount();
  }, []);

  return (
    <div>
      {isLoading ? (
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <CircularProgress size={26} fullWidth />
        </Grid>
      ) : (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
          {/* row 1 */}
          <Grid item xs={12} sx={{ mb: -2.25 }}>
            <Typography variant="h5">Dashboard</Typography>
          </Grid>

          <Grid item xs={12} sm={8} md={3} lg={2}>
            <AnalyticEcommerce title="Total Users" count={allCount.userCount} percentage={70.5} extra="8,900" />
          </Grid>
          <Grid item xs={12} sm={8} md={3} lg={2}>
            <AnalyticEcommerce title="Total Essentials" count={allCount.essentialsCount} percentage={59.3} extra="35,000" />
          </Grid>
          <Grid item xs={12} sm={8} md={3} lg={2}>
            <AnalyticEcommerce title="Total Reels" count={allCount.reelsCount} percentage={27.4} isLoss color="warning" extra="1,943" />
          </Grid>
          <Grid item xs={12} sm={8} md={3} lg={2}>
            <AnalyticEcommerce
              title="Total Workout Collections"
              count={allCount.workCollCount}
              percentage={27.4}
              isLoss
              color="warning"
              extra="$20,395"
            />
          </Grid>
          <Grid item xs={12} sm={8} md={3} lg={2}>
            <AnalyticEcommerce
              title="Total Exercise Library"
              count={allCount.exLibCount}
              percentage={27.4}
              isLoss
              color="warning"
              extra="$20,395"
            />
          </Grid>
          <Grid item xs={12} sm={8} md={3} lg={2}>
            <AnalyticEcommerce
              title="Total Recipes"
              count={allCount.recipesCount}
              percentage={27.4}
              isLoss
              color="warning"
              extra="$20,395"
            />
          </Grid>

          <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

          {/* row 2 */}
          <Grid item xs={12} md={7} lg={8}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="h5">Recent Orders</Typography>
              </Grid>
              <Grid item />
            </Grid>
            <MainCard sx={{ mt: 2 }} content={false}>
              <OrdersTable />
            </MainCard>
          </Grid>
          <Grid item xs={12} md={5} lg={4}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="h5">Analytics Report</Typography>
              </Grid>
              <Grid item />
            </Grid>
            <MainCard sx={{ mt: 2 }} content={false}>
              <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
                <ListItemButton divider>
                  <ListItemText primary="Company Finance Growth" />
                  <Typography variant="h5">+45.14%</Typography>
                </ListItemButton>
                <ListItemButton divider>
                  <ListItemText primary="Company Expenses Ratio" />
                  <Typography variant="h5">0.58%</Typography>
                </ListItemButton>
                <ListItemButton>
                  <ListItemText primary="Business Risk Cases" />
                  <Typography variant="h5">Low</Typography>
                </ListItemButton>
              </List>
              <ReportAreaChart />
            </MainCard>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default DashboardDefault;
