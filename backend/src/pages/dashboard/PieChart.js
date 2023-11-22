import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';

const PieChart = ({ activeUsersCount, inactiveUsersCount }) => {
  const theme = useTheme();
  //   const { primary, secondary } = theme.palette.text;

  const [options, setOptions] = useState({
    chart: {
      type: 'pie'
    },
    labels: ['Active Users', 'Inactive Users'],
    colors: [theme.palette.success.main, theme.palette.error.main], // Colors for active and inactive slices
    legend: {
      labels: {
        colors: 'grey.500'
      }
    }
  });

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState
    }));
  }, []);

  const series = [activeUsersCount, inactiveUsersCount];

  return <ReactApexChart options={options} series={series} type="pie" height={345} />;
};

export default PieChart;
