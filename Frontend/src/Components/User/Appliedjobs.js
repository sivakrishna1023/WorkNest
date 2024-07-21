import React,{useEffect, useState} from 'react'
import { server } from '../../constants/config';
import { Container, Typography } from '@mui/material';
import axios from 'axios';

const Appliedjobs = () => {
    const [jobData,setJobData]=useState([]);
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
              console.log(response.data);
              setJobData(response.data.works);
              
            } catch (error) {
              console.error("There was a problem with the fetch operation:", error);
            }
        };
        getAppliedJobs();
    },[])
  return (
   <Container style={{marginTop:100}}  >
   <Typography>Hello world</Typography>
   </Container>
  )
}

export default Appliedjobs
