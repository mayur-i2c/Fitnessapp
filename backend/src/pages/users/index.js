import React, { useEffect, useState } from 'react';
import MUIDataTable from 'mui-datatables';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { allUsers, deleteMultiUser } from '../../ApiServices';
import * as Icons from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Grid, CircularProgress, IconButton } from '@mui/material';
import swal from 'sweetalert';

const Users = () => {
  const [datatableData, setdatatableData] = useState([]);
  const [baseurl, setbaseurl] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const list = async () => {
    setIsLoading(true);
    await allUsers()
      .then((response) => {
        setIsLoading(false);
        setdatatableData(response.data.info);
        setbaseurl(`${process.env.REACT_APP_API_KEY}/public/`);
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
      name: 'image',
      label: 'Profile',
      options: {
        customBodyRender: (image) =>
          image ? (
            <img
              src={`${process.env.REACT_APP_API_KEY_IMAGE_PATH}${image}`}
              alt={image}
              style={{ height: '50px', width: '50px', borderRadius: '50%' }}
            />
          ) : (
            ''
          )
      }
    },
    {
      name: 'name',
      label: 'Name',
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: 'email',
      label: 'Email',
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: 'mo_no',
      label: 'Mobile No',
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: '_id',
      label: 'Action',
      options: {
        customBodyRender: (value) => {
          return (
            <div>
              {/* <Icons.Visibility
                style={{
                  color: '#52c41a',
                  cursor: 'pointer',
                  border: '1px solid',
                  borderRadius: '5px',
                  margin: '0px 6px',
                  fontSize: '30px',
                  padding: '4px'
                }}
              /> */}
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
                  navigate('/user/manage', { state: { editdata: editdata, imageurl: baseurl } });
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
                    text: 'Are you sure that you want to delete this user?',
                    icon: 'warning',
                    buttons: ['No, cancel it!', 'Yes, I am sure!'],
                    dangerMode: true
                  });
                  if (confirm) {
                    console.log(value);
                    deleteUser(value)
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

  // const options = {
  //   filterType: 'checkbox'
  // };

  const deleteMultiple = async (index) => {
    const ids = index.data.map((index1) => datatableData.find((data, index2) => index2 === index1.dataIndex && data._id)._id);
    const confirm = await swal({
      title: 'Are you sure?',
      text: 'Are you sure that you want to delete this users?',
      icon: 'warning',
      buttons: ['No, cancel it!', 'Yes, I am sure!'],
      dangerMode: true
    });

    if (confirm) {
      deleteMultiUser(ids)
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
          {isLoading ? (
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <CircularProgress size={26} fullWidth />
            </Grid>
          ) : (
            <MUIDataTable title={'Users'} data={datatableData} columns={columns} options={options} />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Users;
