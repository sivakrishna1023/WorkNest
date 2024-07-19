
import React, { useState } from 'react';
import { Container, 
         TextField, 
         Button, 
         Typography, 
         Box, 
         Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ApplicationForm = () => {
  const [name, setName] = useState('');
  const [skills, setSkills] = useState('');
  const [whyJoin, setWhyJoin] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const navigate=useNavigate();
  const handleFileChange = async (e) => {
    setPdfFile( e.target.files[0]);
  };

  const handleCancel = () => {
    setName('');
    setSkills('');
    setWhyJoin('');
    setPdfFile(null);
    navigate('/');
  };

  const handleApply = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("name", name);
    formData.append("skills", skills);
    formData.append("whyJoin", whyJoin);
    formData.append("file", pdfFile);
    formData.append("jobid", localStorage.getItem('jobid'));
    
    console.log(pdfFile);
  
    try {
      const response = await fetch("http://localhost:3000/api/v1/work/applyjobs", {
        method: 'POST',
        body: formData,
        headers: {
          // "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        }
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
  
      const result = await response.json(); // Assuming the response is in JSON format
      alert("work Applied Successfully");
      window.location.href='http://localhost:3001/user'
      console.log(result);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };
  

  return (
    <>
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Application Form
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            fullWidth
            name="skills"
            margin="normal"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            fullWidth
             name="skills"
            margin="normal"
            label="Skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
          <TextField
            fullWidth
            name="whyJoin"
            margin="normal"
            label="Why do you want to join this role?"
            multiline
            rows={4}
            value={whyJoin}
            onChange={(e) => setWhyJoin(e.target.value)}
          />
          <Button
            variant="contained"
            component="label"
            sx={{ marginTop: 2 }}
          >
            Upload Resume
            <input
              type="file"
              name="file"
              hidden
              accept=".pdf"
              onChange={handleFileChange}
            />
          </Button>
          {pdfFile && (
            <Typography variant="body2" sx={{ marginTop: 1 }}>
              {pdfFile.name}
            </Typography>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
            <Button variant="contained" color="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" type='submit' onClick={handleApply}>
              Apply
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
    {/* <form action="http://localhost:3000/upload" method="post" enctype="multipart/form-data">
  <input type="file" name="file" />
  <button variant="contained" color="primary" type='submit'>
              Apply
            </button>
</form> */}
    </>
  );
};

export default ApplicationForm;
