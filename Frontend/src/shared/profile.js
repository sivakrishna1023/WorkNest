import React, { useState } from 'react';
import { Container, 
         TextField, 
         Button, 
         Box, 
         Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import {useSelector} from 'react-redux'

const ProfilePage = () => {
  const {user}=useSelector((state)=>state.auth);
  const [userName, setUserName] = useState(user.name);
  const [Company,setCompany]=useState(user.company);
  const email = user.email;
  const handleUpdate = () => {
    console.log('Updated:', { userName, email });
  };

  const handleDelete = () => {
    console.log('Profile Deleted');
  };
  return (
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
          Company && <TextField
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
            onClick={handleUpdate}
          >
            Update
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ProfilePage;
