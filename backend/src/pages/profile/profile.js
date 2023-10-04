import { Grid, Typography, Stack } from '@mui/material';

import EditProfileTab from './EditProfileTab';
import ChangePassTab from './ChangePassTab';

import MainCard from 'components/MainCard';

const Profile = () => {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 2 */}
      <Grid item xs={12} md={6} lg={6}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Update Profile</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <Stack spacing={3}>
            <Grid xs={12} sx={{ p: 3 }}>
              <EditProfileTab />
            </Grid>
          </Stack>
        </MainCard>
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Change Password</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <Stack spacing={3}>
            <Grid xs={12} sx={{ p: 3 }}>
              <ChangePassTab />
            </Grid>
          </Stack>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default Profile;
