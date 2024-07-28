import React, { useState } from 'react';
import { Container, 
         TextField, 
         Button, 
         Box, 
         Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import {useSelector} from 'react-redux'
import {Toaster,toast} from 'react-hot-toast'
import { server } from '../../constants/config';

const AdminProfile = () => {
  const {user}=useSelector((state)=>state.auth);
  const [userName, setUserName] = useState(user.name);
  const [Company,setCompany]=useState(user.company);
  const [loading,setIsLoading]=useState(false);
  const email = user.email;
  const handleDelete = async () => {
  setIsLoading(true);
  const toastId=toast.loading("Deleting Your Account...");
  try{
      const newpromise=await fetch(`${server}/api/v1/admin/delete`,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authorization':`bearer ${localStorage.getItem('token')}`
      },})
        if (!newpromise.ok) {
          setIsLoading(false);
          throw new Error('Network response was not ok');
        }
        const data = await newpromise.json();
          if(data.success){
            toast.success("Deleted successfully...!",{id:toastId});
            window.location.href = '/';
          }else{
            toast.error("Failed to Delete",{id:toastId});
          }
        } catch (error) {
          toast.error("Failed to Delete",{id:toastId});
        }finally{
          setIsLoading(false);
        }
  };

  const handleSubmitUpdate = async() => {
    const newobj={
        name:userName,
        company:Company
    }
    setIsLoading(true);
    const toastId=toast.loading("Updating details...");
    try{
        const newpromise=await fetch(`${server}/api/v1/admin/update`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'authorization':`bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newobj)
          })
          if (!newpromise.ok) {
            setIsLoading(false);
            throw new Error('Network response was not ok');
          }
          const data = await newpromise.json();
            if(data.success){
              toast.success("Updated successfully...!",{id:toastId})
            }else{
              toast.error("Failed to update",{id:toastId});
            }
          } catch (error) {
            toast.error("Failed to update",{id:toastId});
          }finally{
            setIsLoading(false);
          }
  };
  return (
    <>
    <Toaster
    position="top-center"
    reverseOrder={false}
    />
    <Container maxWidth="sm"  sx={{mt:12,paddingTop:3}}   >
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          User Profile
        </Typography>
        <TextField
          fullWidth
          label="Company Email"
          variant="outlined"
          value={email}
          disabled={true}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="User Name"
          variant="outlined"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          sx={{ mb: 2 }}
        />
        {
          Company!==null && <TextField
          fullWidth
          label="Company Name"
          variant="outlined"
          value={Company}
          onChange={(e) => setCompany(e.target.value)}
          sx={{ mb: 2 }}
          />
        }
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<UpdateIcon />}
            onClick={handleSubmitUpdate}
            disabled={loading}
          >
            Update
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
            disabled={loading}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Container>
    </>
  );
};

export default AdminProfile;

