import PropTypes from 'prop-types';

// material-ui
import { Box, Chip, Grid, Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// assets
import { RiseOutlined, FallOutlined } from '@ant-design/icons';

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

const AnalyticEcommerce = ({ color, title, count, percentage, isLoss, viewurl, headerBackground, footerBackground }) => {
  const headerStyle = {
    backgroundColor: headerBackground
  };

  const footerStyle = {
    backgroundColor: footerBackground
  };
  return (
    <div>
      <MainCard>
        <Stack spacing={0.5} contentSX={{ p: 2.25 }} className="p0 countheader" style={headerStyle}>
          <Typography variant="h6" color="textPrimary" className="text-center pt-12">
            {title}
          </Typography>
          <Grid container alignItems="center" className="countdiv">
            <Grid item>
              <Typography variant="h4" color="inherit" className="h4Box">
                {count}
              </Typography>
            </Grid>
            {percentage && (
              <Grid item>
                <Chip
                  variant="combined"
                  color={color}
                  icon={
                    <>
                      {!isLoss && <RiseOutlined style={{ fontSize: '0.75rem', color: 'inherit' }} />}
                      {isLoss && <FallOutlined style={{ fontSize: '0.75rem', color: 'inherit' }} />}
                    </>
                  }
                  label={`${percentage}%`}
                  sx={{ ml: 1.25, pl: 1 }}
                  size="small"
                />
              </Grid>
            )}
          </Grid>
        </Stack>
        <a href={viewurl} className="textdecoration">
          <Box sx={{ pt: 2.25 }} className="text-center countfooter" style={footerStyle}>
            <Typography variant="caption" color="textPrimary">
              View Details &nbsp;&gt;&gt;
            </Typography>
          </Box>
        </a>
      </MainCard>
    </div>
  );
};

AnalyticEcommerce.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.string,
  percentage: PropTypes.number,
  isLoss: PropTypes.bool,
  extra: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};

AnalyticEcommerce.defaultProps = {
  color: 'primary'
};

export default AnalyticEcommerce;
