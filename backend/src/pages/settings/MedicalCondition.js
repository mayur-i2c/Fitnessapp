import { getAllMedicalCon, deleteMedicalCon, deleteMultMedicalCon, updateMedicalConStatus } from '../../ApiServices';
import React, { useEffect, useState } from 'react';
import MUIDataTable from 'mui-datatables';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Icons from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Grid, CircularProgress, IconButton, Button } from '@mui/material';
import swal from 'sweetalert';
import Switch from '@mui/material/Switch';
// ==============================|| SAMPLE PAGE ||============================== //

const MedicalCondition = () => {
  const [datatableData, setdatatableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const list = async () => {
    setIsLoading(true);
    await getAllMedicalCon()
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
    list();
  }, []);
  const columns = [
    {
      name: 'title',
      label: 'Title',
      options: {
        filter: true,
        sort: true
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
                const data = { id: _id, status: !status };
                updateMedicalConStatus(data, _id)
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
              }}
            />
          );
        }
      }
    },
    {
      name: '_id',
      label: 'Action',
      options: {
        customBodyRender: (value) => {
          return (
            <div>
              <Icons.Edit
                style={{
                  color: '#6495ED',
                  cursor: 'pointer',
                  border: '1px solid',
                  borderRadius: '5px',
                  margin: '0px 6px',
                  fontSize: '30px',
                  padding: '4px'
                }}
                onClick={() => {
                  const editdata = datatableData.find((data) => data._id === value);
                  console.log(editdata);
                  navigate('/settings/medicalCondition/manage', { state: { editdata: editdata } });
                }}
              />
              <Icons.Delete
                style={{
                  color: '#FF5733',
                  cursor: 'pointer',
                  border: '1px solid',
                  borderRadius: '5px',
                  margin: '0px 6px',
                  fontSize: '30px',
                  padding: '4px'
                }}
                onClick={async () => {
                  const confirm = await swal({
                    title: 'Are you sure?',
                    text: 'Are you sure that you want to delete this Medical Condition?',
                    icon: 'warning',
                    buttons: ['No, cancel it!', 'Yes, I am sure!'],
                    dangerMode: true
                  });
                  if (confirm) {
                    console.log(value);
                    deleteMedicalCon(value)
                      .then(() => {
                        toast.success('deleted successfully!', {
                          key: value
                        });
                        list();
                      })
                      .catch(() => {
                        toast.error('something went wrong!', {
                          key: value
                        });
                      });
                  }
                }}
              />
            </div>
          );
        }
      }
    }
  ];

  const deleteMultiple = async (index) => {
    const ids = index.data.map((index1) => datatableData.find((data, index2) => index2 === index1.dataIndex && data._id)._id);
    const confirm = await swal({
      title: 'Are you sure?',
      text: 'Are you sure that you want to delete this medical conditions?',
      icon: 'warning',
      buttons: ['No, cancel it!', 'Yes, I am sure!'],
      dangerMode: true
    });

    if (confirm) {
      deleteMultMedicalCon(ids)
        .then(() => {
          list();
          toast.success('Deleted successfully!', {
            key: ids
          });
        })
        .catch(() => {
          toast.error('Something went wrong!', {
            key: ids
          });
        });
    }
  };

  const SelectedRowsToolbar = ({ selectedRows, data }) => {
    return (
      <div>
        <IconButton onClick={() => deleteMultiple(selectedRows, data)}>
          <Icons.Delete />
        </IconButton>
      </div>
    );
  };

  const options = {
    customToolbarSelect: (selectedRows, data) => (
      <SelectedRowsToolbar selectedRows={selectedRows} data={data} columns={columns} datatableTitle="test" />
    )
  };

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <ToastContainer />
          <Button
            variant="contained"
            size="medium"
            color="secondary"
            onClick={() => {
              navigate('/settings/medicalCondition/manage');
            }}
          >
            Add Medical Condition
          </Button>
          {isLoading ? (
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <CircularProgress size={26} fullWidth />
            </Grid>
          ) : (
            <MUIDataTable title={'Medical Conditions'} data={datatableData} columns={columns} options={options} />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default MedicalCondition;
