// import { Link } from 'react-router-dom';

// material-ui
import { Grid } from '@mui/material';

// project import
import AuthResetPass from './auth-forms/AuthResetPass';
import AuthWrapper from './AuthWrapper';

// ================================|| RESET PASSWORD ||================================ //

const ResetPassword = () => (
  <AuthWrapper>
    <Grid container spacing={3}>
      <Grid item xs={12} pt={0}>
        <AuthResetPass />
      </Grid>
    </Grid>
  </AuthWrapper>
);

export default ResetPassword;
