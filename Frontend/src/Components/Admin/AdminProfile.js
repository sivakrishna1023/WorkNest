import React, { useState } from 'react';
import { Container, 
         TextField, 
         Button, 
         Box, 
         Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';

const ProfilePage = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleUpdate = () => {
    console.log('Updated:', { userName, password, email });
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
          label="User Name"
          variant="outlined"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Company Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />
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
