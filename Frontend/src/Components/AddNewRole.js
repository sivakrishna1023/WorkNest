import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Container,
  FormControl,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const OpenDialogButton = styled(Button)(({ theme }) => ({
  // margin: theme.spacing(10),
  backgroundColor: '#1976d2',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#115293',
  },
}));

const LogoUpload = styled('input')({
  display: 'none',
});

const AddRoleButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#1976d2',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#115293',
  },
}));

const FormComponent = () => {
  const [open, setOpen] = useState(false);
  const [imageData, setImageData] = useState('');
  const [formData, setFormData] = useState({
    role: '',
    description: '',
    company: '',
    salary: '',
    location: '',
    logo: null,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      role: '',
    description: '',
    company: '',
    salary: '',
    location: '',
    logo: null,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogoChange = (e) => {
    setFormData({
      ...formData,
      logo: e.target.files[0],
    });
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result;
      setImageData(base64String);
    };

    reader.readAsDataURL(file);
    console.log('Image Data:', imageData);
  };

  const handleSubmit = async() => {
    const newobj={
      Role: formData.role,
    description: formData.description,
    company: formData.company,
    salary: formData.salary,
    location: formData.location,
    logo: imageData,
    }
    console.log(newobj);
    try{
      const newpromise=await fetch('http://localhost:3000/api/v1/work/createnew',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization':localStorage.getItem('token')
      },
      body: JSON.stringify(newobj)
    })
    if (!newpromise.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await newpromise.json();
    console.log(data);
    alert('New Role added with given Specifications');
    setTimeout(() => {
      window.location.href="http://localhost:3001/admin"
    }, 500);
} catch (error) {
  console.error('There has been a problem with your fetch operation:', error);
  alert('Could  Not Add role');
}
    handleClose();
  };

  return (
    <Container sx={{marginTop:'2%', marginLeft:'64%'}}>
      <OpenDialogButton variant="contained" onClick={handleClickOpen}>
        Add New Role
      </OpenDialogButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" >
        <Grid container  style={{display:'flex'}}>
            <Grid item xs={11}>
                <DialogTitle>Add New Role</DialogTitle>
            </Grid>
            <Grid item xs={1}>
            <IconButton aria-label="close" onClick={handleClose} xs={2} style={{alignContent:'end'}}>
                <CloseIcon />
                </IconButton>
            </Grid>
        </Grid>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="role"
                  label="Role"
                  fullWidth
                  value={formData.role}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="description"
                  label="Description"
                  fullWidth
                  multiline
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="company"
                  label="Company"
                  fullWidth
                  value={formData.company}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="salary"
                  label="Salary"
                  fullWidth
                  value={formData.salary}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="location"
                  label="Location"
                  fullWidth
                  value={formData.location}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" alignItems="center">
                  <Typography variant="subtitle1" component="div" sx={{ marginRight: 2 }}>
                    Logo
                  </Typography>
                  <FormControl>
                    <AddRoleButton
                      variant="contained"
                      component="label"
                    >
                      Upload Logo
                      <LogoUpload
                        type="file"
                        name="logo"
                        onChange={handleLogoChange}
                        accept="image/*"
                      />
                    </AddRoleButton>
                  </FormControl>
                  {formData.logo && <Typography sx={{ marginLeft: 2 }}>{formData.logo.name}</Typography>}
                </Box>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <AddRoleButton onClick={()=>{handleSubmit();}}>
            Add Role
          </AddRoleButton>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default FormComponent;
