import React, { useState, useEffect } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Button, Typography, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
  } from "@mui/material";
  import CloseIcon from "@mui/icons-material/Close";
  import IconButton from "@mui/material/IconButton";

const WorkAccordion = () => {
  const [works, setWorks] = useState([]);
  const [open, setOpen] = useState(false);
  const fetchWorks = () => {
    fetch('http://localhost:3000/api/v1/work/myuploads',{
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
    return response.json(); // Parse the JSON from the response
  })
  .then(data => {
    // console.log(data['works']);
     setWorks(data['works']);  
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

};
useEffect(() => {
    fetchWorks();
    }, []);
    let p1,p2,p3,p4,p5;
    const handleClickOpen = (work) => {
         p1=work.Role;
         p2=work.description;
         p3=work.salary;
         p4=work.location;
        p5=work.company;
        localStorage.setItem('p1',p1);
        localStorage.setItem('p2',p2);
        localStorage.setItem('p3',p3);
        localStorage.setItem('p4',p4);
        localStorage.setItem('p5',p5);
        setOpen(true);
        };
    

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteWork = (work) => {
    fetch('http://localhost:3000/api/v1/work/deletework',{
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

  const handleUpdateWork = (work) => {
    alert(`Updating work: ${work.title}`);
    // Add update logic here
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
                <Button variant="contained" color="primary" onClick={() => handleUpdateWork(work)} sx={{ ml: 2 }}>
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
                <Typography>comapny:{localStorage.getItem('p5')}</Typography>
            </Grid>
        </DialogContent>
      </Dialog>
        </Box>
    </div>
  );
};

export default WorkAccordion;
