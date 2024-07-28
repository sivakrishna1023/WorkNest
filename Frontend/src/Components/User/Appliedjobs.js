import React,{useEffect, useState} from 'react'
import { server } from '../../constants/config';
import { Container, Typography,Grid, Card, CardContent, CardMedia } from '@mui/material';
import axios from 'axios';

const Appliedjobs = () => {
    const [jobData,setJobData]=useState(null);
    useEffect(()=>{
        const getAppliedJobs = async () => {
            try {
              const response = await axios.post(
                `${server}/api/v1/work/appliedworks`,
                {},
                {
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );
              setJobData([]);
              setJobData(response.data.works);
            } catch (error) {
              console.error("There was a problem with the fetch operation:", error);
            }
        };
        getAppliedJobs();
    },[])
  return (
    <Container sx={{marginTop:"8rem"}} >
    <Grid container spacing={4}>
      { jobData &&  jobData.map((job, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={job.logo}
              alt={`${job.company} logo`}
            />
            <CardContent>
              <Typography variant="h6">Role:- {job.Role}</Typography>
              <Typography variant="body2" color="textSecondary">
              Company:-  {job.company}
              </Typography>
              <Typography variant="body2">
               Location:- {job.location}
              </Typography>
              <Typography variant="body2"  color="textSecondary"> Description:- {job.description}</Typography>
              <Typography variant="body2"> Salary:- {job.salary}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Container>
  )
}

export default Appliedjobs
