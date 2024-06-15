import React, { useState, useEffect } from 'react';
import { Accordion, AccordionSummary, AccordionDetails} from '@mui/material';
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
  import { server,domain } from '../constants/config';

const WorkAccordion = () => {
  const [works, setWorks] = useState([]);
  const [open, setOpen] = useState(false);
  const [imageData, setImageData] = useState('');
  const [openforupdate, setOpenforupdate] = useState(false);
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
    fetch(`${server}/api/v1/work/myuploads`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization':localStorage.getItem('token')
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
    let p1,p2,p3,p4,p5,p7,id;
    const handleClickOpen = (work) => {
         p1=work.Role;
         p2=work.description;
         p3=work.salary;
         p4=work.location;
        //  console.log(work.company)
        p5=work.company;
        p7=work.logo
        localStorage.setItem('p1',p1);
        localStorage.setItem('p2',p2);
        localStorage.setItem('p3',p3);
        localStorage.setItem('p4',p4);
        localStorage.setItem('p5',p5);
        localStorage.setItem('p7',p7);
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

  const handleDeleteWork = (work) => {
    fetch(`${server}/api/v1/work/deletework`,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'authorization':localStorage.getItem('token'),
          'id':work._id,
          'admin':work.admin
        }
      }).then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json(); // Parse the JSON from the response
      })
      .then(data => {
        fetchWorks();
        alert('Job Deleted');
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };
  const onclickUpdate=(work)=>{
         p1=work.Role;
         p2=work.description;
         p3=work.salary;
         p4=work.location;
         p5=work.company;
         p7=work.logo;
        //  console.log(p7);
         id=work._id;
        localStorage.setItem('p1',p1);
        localStorage.setItem('id',id);
        localStorage.setItem('p2',p2);
        localStorage.setItem('p3',p3);
        localStorage.setItem('p4',p4);
        localStorage.setItem('p5',p5);
        localStorage.setItem('p7',p7);
        setFormData({
          role: localStorage.getItem('p1'),
    description: localStorage.getItem('p2'),
    company: localStorage.getItem('p5'),
    salary: localStorage.getItem('p3'),
    location: localStorage.getItem('p4'),
    logo: localStorage.getItem('p7'),
        })
        setImageData(localStorage.getItem('p7'));
        setOpenforupdate(true);
  }
  const handleUpdate = async() => {
    const newobj={
      Role:formData.role,
    description: formData.description,
    company: formData.company,
    salary: formData.salary,
    location: formData.location,
    logo: imageData,
    id:localStorage.getItem('id')
    }
    console.log(newobj);
    try{
      const newpromise=await fetch(`${server}/api/v1/work/update`,{
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
    alert('New Role updated with given Specifications');
    setTimeout(() => {
      window.location.href=`${domain}/admin`
    }, 500);
} catch (error) {
  console.error('There has been a problem with your fetch operation:', error);
  alert('Could  Not Update role');
}
    handleClose();
  };
  
  return (
    <div>
        <Box sx={{ width: '70%', marginTop:'13%', marginLeft:'10%'}}>
        <h2>ALL THE JOBS THAT YOU ADDED</h2>
        {works.map((work) => (
            <Accordion key={Math.random() * 10000}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{work.Role}-{work.company}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Button variant="contained" color="primary" onClick={() => handleClickOpen(work)}>
                Show More Details
                </Button>
                <Button variant="contained" color="primary" onClick={() => handleDeleteWork(work)} sx={{ ml: 2 }}>
                Delete Work
                </Button>
                <Button variant="contained" color="primary" onClick={() => onclickUpdate(work)} sx={{ ml: 2 }}>
                Update Work
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
                <Typography>Role:{localStorage.getItem('p1')}</Typography>
                <Typography>Description:{localStorage.getItem('p2')}</Typography>
                <Typography>salary:{localStorage.getItem('p3')}</Typography>
                <Typography>location:{localStorage.getItem('p4')}</Typography>
                <Typography>company:{localStorage.getItem('p5')}</Typography>
                <img src={localStorage.getItem('p7')} style={{border:'1px solid black'}} alt="zuii" />
            </Grid>
        </DialogContent>
      </Dialog>
        </Box>
      <Dialog open={openforupdate} onClose={handleCloseforupdate} fullWidth maxWidth="sm" >
        <Grid container  style={{display:'flex'}}>
            <Grid item xs={11}>
                <DialogTitle>Update New Role</DialogTitle>
            </Grid>
            <Grid item xs={1}>
            <IconButton aria-label="close" onClick={handleCloseforupdate} xs={2} style={{alignContent:'end'}}>
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
          <AddRoleButton onClick={()=>{handleUpdate()}}>
          Update Work
          </AddRoleButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default WorkAccordion;
