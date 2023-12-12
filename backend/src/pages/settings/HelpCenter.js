import { userIssue, updateUserIssueStatus } from '../../ApiServices';
import React, { useEffect, useState } from 'react';
import MUIDataTable from 'mui-datatables';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Grid, CircularProgress, Typography } from '@mui/material';
import Switch from '@mui/material/Switch';
import { useUserState } from '../../context/UserContext';

// ==============================|| MEDICAL CONDITION PAGE ||============================== //

const HelpCenter = () => {
  const [datatableData, setdatatableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userRole } = useUserState();

  const list = async () => {
    setIsLoading(true);
    await userIssue()
      .then((response) => {
        setIsLoading(false);
        setdatatableData(response.data.info);
      })
      .catch((err) => {
        if (!err.response.data.isSuccess) {
          if (err.response.data.status === 401) {
            toast.error(err.response.data.message);
            setIsLoading(false);
          } else {
            console.log(err.response.data, 'else');
          }
        }
      });
  };

  useEffect(() => {
    const redirectSuccess = localStorage.getItem('redirectSuccess');

    if (redirectSuccess === 'true') {
      // The value was found in local storage, perform actions as needed
      toast.success(localStorage.getItem('redirectMessage'), {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      // Remove the value from local storage
      localStorage.removeItem('redirectSuccess');
    }
    list();
  }, []);
  const columns = [
    {
      name: 'userid',
      label: 'User',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, { rowIndex }) => {
          // Extract user details from the userid object
          const { name, email } = datatableData[rowIndex].userid;

          return (
            <div style={{ maxWidth: '20%' }}>
              <div>{name}</div>
              <div>{email}</div>
            </div>
          );
        }
      }
    },
    {
      name: 'question',
      label: 'Issue',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (_, { rowIndex }) => {
          const issueText = datatableData[rowIndex].question;

          return <div>{issueText}</div>;
        }
      }
    },

    {
      name: 'status',
      label: 'Status',
      options: {
        filter: true,
        sort: false,
        customBodyRender: (_, { rowIndex }) => {
          const { status, _id } = datatableData[rowIndex];
          return (
            <Switch
              checked={status}
              onChange={() => {
                if (userRole == 1) {
                  const data = { id: _id, status: !status };
                  updateUserIssueStatus(data, _id)
                    .then(() => {
                      toast.success('status changed successfully!', {
                        key: data._id
                      });
                      list();
                    })
                    .catch(() => {
                      toast.error('something went wrong!', {
                        key: data._id
                      });
                    });
                } else {
                  toast.error('Sorry, you do not have permission to access this feature.Please contact your administrator for assistance.');
                }
              }}
            />
          );
        }
      }
    },
    {
      name: 'status',
      label: 'Status',
      options: {
        filter: true,
        sort: false,
        customBodyRender: (_, { rowIndex }) => {
          const { status } = datatableData[rowIndex];
          return <div>{status ? <p className="activeP">Pending</p> : <p className="deactiveP">Resolved</p>}</div>;
        }
      }
    }
  ];

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <ToastContainer />

          <div className="text-container">
            <div className="left-text">
              <Typography variant="h4" size="sm">
                Customer Issue
              </Typography>
            </div>
          </div>

          {isLoading ? (
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <CircularProgress size={26} fullWidth />
            </Grid>
          ) : (
            <MUIDataTable
              data={datatableData}
              columns={columns}
              options={{
                selectableRows: false // This removes the checkbox column
              }}
            />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default HelpCenter;
