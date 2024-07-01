import React, { useState, useEffect } from 'react';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  TextField,
  Button,
  Grid,
  Typography,
  FormControl,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { styled } from '@mui/system';
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { server, domain } from '../../constants/config';
import { Toaster,toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const WorkAccordion = () => {
  const navigate=useNavigate();
  const [works, setWorks] = useState([]);
  const [open, setOpen] = useState(false);
  const [imageData, setImageData] = useState('');
  const [openforupdate, setOpenforupdate] = useState(false);
  const [isLoading,setIsLoading]=useState(false);
  const [formData, setFormData] = useState({
    role: '',
    description: '',
    company: '',
    salary: '',
    location: '',
    logo: null,
  });
  
  const LogoUpload = styled('input')({
    display: 'none',
  });
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const AddRoleButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#1976d2',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#115293',
    },
  }));


  const fetchWorks = () => {
    fetch(`${server}/api/v1/work/myuploads`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify()
    }).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
      .then(data => {
        setWorks(data['works']);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };
  useEffect(() => {
    fetchWorks();
  }, []);

  const handleClickOpenDetials = (work) => {
    setFormData({
      role: work.Role,
      description: work.description,
      company: work.company,
      salary: work.salary,
      location: work.location,
      logo: work.logo,
    });
    setImageData(work.logo);
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
  const handleCloseforupdate = () => {
    setOpenforupdate(false);
  };

  const handleDeleteWork = async (id) => {
    setIsLoading(true);
    const toastId=toast.loading("Please Wait Deleting...!!")
    await fetch(`${server}/api/v1/work/deletework`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `bearer ${localStorage.getItem('token')}`,
        'id': id
      }
    }).then(response => {
      if (!response.ok) {
        toast.error("failed to delete...!!",{id:toastId});
        setIsLoading(false);
        throw new Error('Network response was not ok ' + response.statusText);
      }
      setIsLoading(false);
      return response.json(); 
    }).then(data => {
        fetchWorks();
        toast.success("Job Deleted Succefully",{id:toastId});
      })
      .catch(error => {
        toast.error("failed to delete...!!",{id:toastId});
      });
    setIsLoading(false);
  };
  const onclickUpdate = (work) => {
    setFormData({
      role: work.Role,
      description: work.description,
      company: work.company,
      salary: work.salary,
      location: work.location,
      logo: work.logo,
    });
    setImageData(work.logo);
    setOpenforupdate(true);
  };
  const handleUpdate = async () => {
    const newobj = {
      Role: formData.role,
      description: formData.description,
      company: formData.company,
      salary: formData.salary,
      location: formData.location,
      logo: imageData,
      id: localStorage.getItem('id')
    }
    setIsLoading(false);
    const toastId=toast.loading("Updating Please Wait..!!");
    try {
      const newpromise = await fetch(`${server}/api/v1/work/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newobj)
      })
      if (!newpromise.ok) {
        toast.error("failed to update...!",{id:toastId});
        handleClose();
        throw new Error('Network response was not ok');
      }
      const data = await newpromise.json();
      if(data?.success){
        toast.success("Updated successfully...!",{id:toastId});
        setTimeout(() => {
        navigate(0);
        }, 500);
      }else{
        toast.error("failed to update...!",{id:toastId});
      }
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
      toast.error("failed to update...!",{id:toastId});
    }finally{
      setIsLoading(false);
    }
    handleClose();
  };


  return (
    <div>
      <Toaster
      position="top-center"
      reverseOrder={false}
      />
      <Box sx={{ width: '70%', marginTop: '13%', marginLeft: '10%' }}>
        <h2>ALL THE JOBS THAT YOU ADDED</h2>
        {works.map((work) => (
          <Accordion key={Math.random() * 10000}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{work.Role}-{work.company}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Button 
              variant="outlined" 
              color="primary" 
              disabled={isLoading}
              onClick={() => handleClickOpenDetials(work)}>
                Show More Details
              </Button>
              <Button 
              variant="outlined" 
              color="primary" 
              disabled={isLoading}
              onClick={() => handleDeleteWork(work._id)} 
              sx={{ ml: 2 }}>
                Delete Work
              </Button>
              <Button 
              variant="outlined" 
              color="primary" 
              onClick={() => onclickUpdate(work)} sx={{ ml: 2 }}
              disabled={isLoading}
              >
                Update Work
              </Button>
              <Button 
              variant="outlined" 
              color="primary" 
              disabled={isLoading}
              href={`/workapplicants?id=${work._id}`} 
              sx={{ ml: 2 }}>
                Job Applicants
              </Button>
            </AccordionDetails>
          </Accordion>
        ))}
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <Grid container style={{ display: "flex" }}>
            <Grid item xs={11}>
              <DialogTitle>Job Details</DialogTitle>
            </Grid>
            <Grid item xs={1}>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                xs={2}
                style={{ alignContent: "end" }}
              >
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
          <DialogContent>
            <Grid item xs={12}>
              <Typography>Role:{formData.role}</Typography>
              <Typography>Description:{formData.description}</Typography>
              <Typography>salary:{formData.salary}</Typography>
              <Typography>location:{formData.location}</Typography>
              <Typography>company:{formData.company}</Typography>
              <img src={formData.logo} style={{ border: '1px solid black' }} alt="zuii" />
            </Grid>
          </DialogContent>
        </Dialog>
      </Box>
      <Dialog open={openforupdate} onClose={handleCloseforupdate} fullWidth maxWidth="sm" >
        <Grid container style={{ display: 'flex' }}>
          <Grid item xs={11}>
            <DialogTitle>Update New Role</DialogTitle>
          </Grid>
          <Grid item xs={1}>
            <IconButton aria-label="close" onClick={handleCloseforupdate} xs={2} style={{ alignContent: 'end' }}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
        <DialogContent>
          <form>
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
                      disabled={isLoading}
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
          <AddRoleButton onClick={() => { handleUpdate() }}>
            Update Work
          </AddRoleButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default WorkAccordion;
