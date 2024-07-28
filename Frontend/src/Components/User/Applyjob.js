import React, { useEffect, useState } from 'react';
import { Container, 
         TextField, 
         Button, 
         Typography, 
         Box, 
         Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { server } from '../../constants/config';
import axios from 'axios'
import { Toaster,toast } from 'react-hot-toast';

const ApplicationForm = () => {
  const [name, setName] = useState('');
  const [skills, setSkills] = useState('');
  const [whyJoin, setWhyJoin] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const navigate=useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const jobid = query.get('jobid');
  const [isLoading,setIsLoading]=useState(false);
  const [jobDetails,setJobDetails]=useState(null);
  
  useEffect(()=>{
    const getJobDetails=async()=>{
      try{
           const response=await axios.get(`${server}/api/v1/work/details`,{
           headers: {
             "authorization": `Bearer ${localStorage.getItem("token")}`,
             "id":jobid
           }})
           const {data}=response;
           if(!data){
             console.log("Error in getting Detail's");
             return;
           }
           if(data.work){
            setJobDetails(data.work);
           }
      }catch(error){
       console.log("Error in getting detail's",error);
      }
     }
     getJobDetails();
  },[])
  const handleFileChange = async (e) => {
    setPdfFile( e.target.files[0]);
  };

  const handleCancel = () => {
    setName('');
    setSkills('');
    setWhyJoin('');
    setPdfFile(null);
    navigate('/user');
  };

  const handleApply = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("skills", skills);
    formData.append("whyJoin", whyJoin);
    formData.append("file", pdfFile);
    formData.append("jobid", jobid);
    if(pdfFile===null){
      toast.error("Please Provide Resume");
      return;
    }
    if(name.length===0 || skills.length==0 || whyJoin.length==0){
      toast.error("Please Provide all Details to Apply");
      return;
    }
    setIsLoading(true);
    const toastId=toast.loading("Please Wait Sending Application");
    try {
      const response = await axios.post(`${server}/api/v1/work/applyjobs`, formData, {
        headers: {
          "authorization": `Bearer ${localStorage.getItem("token")}`,
        }
      });
      if(response){
        toast.success("Applied to Job",{id:toastId});
      }
      navigate('/user/appliedjobs');
    } catch (error) {
      toast.error("Failed to Apply",{id:toastId});
      console.error('There was a problem with the axios operation:', error);
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
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 15}}>
        {
          jobDetails && <Box mb={4}>
          <Typography variant='h4' >Job Details</Typography>
          <Typography variant="h6">
           Role:-  {jobDetails.Role}
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
           Company:-  {jobDetails.company}
          </Typography>
          <Typography variant="body1" gutterBottom>
           Description:-  {jobDetails.description}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Salary: ${jobDetails.salary}
          </Typography>
          <Typography variant="body1" gutterBottom>
           Location:-  {jobDetails.location}
          </Typography>
        </Box>
        }
         
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
            <Button 
            disabled={isLoading}
            variant="contained" color="primary" type='submit' onClick={handleApply}>
              Apply
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
    </>
  );
};

export default ApplicationForm;
