import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Grid,
  Box,
  Button,
  Container,
} from "@mui/material";
import Appbar from "../Components/Appbar";
import { server ,domain} from "../constants/config";
// import { Sailing } from "@mui/icons-material";

const JobCards = () => {
  const [jobData, setJobData] = useState([]);
  const [role, setRole] = useState("");
  const [salary, setSalary] = useState(0);
  const [location, setLocation] = useState("");
  const [company, setCompany] = useState("");
  
  const jobapplication=(job)=>{
    localStorage.setItem('jobid',job._id);
    window.location.href=`${domain}/applyjob`;
  }

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        console.log("Sending fetch request...");
        const response = await fetch(`${server}/api/v1/work/alljobs`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token"),
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }

        const data = await response.json();
        console.log("Data received:", data);
        setJobData(data["works"]);
        console.log("State updated with new job data:", data["works"]);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchJobs();
  }, []); // Ensure this runs only once

  const handleFilter = async () => {
    const newobj = {
      name: role,
      amount: salary,
      place: location,
      company: company,
    };
    fetch(`${server}/api/v1/work/jobsbyvariables`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(newobj),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setJobData([]);
        setJobData(data["works"]);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  const appliedjobsfunc=async()=>{
    fetch(`${server}/api/v1/work/appliedworks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setJobData([]);
        setJobData(data["works"]);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }

  const defaultjobs=()=>{
    window.location.href=`${domain}/user`
  }

  return (
    <>
      <Appbar name6="Delete User" name7="Sign Out" name8="Applied Jobs" clicking={appliedjobsfunc} name9="Jobs to Apply" clicking2={defaultjobs}/>
      <Container sx={{ marginTop: "100px", width: "100%" }}>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            {jobData.length !== 0 && (
              <Grid
                container
                spacing={4}
                sx={{ paddingLeft: 2, paddingRight: 2 }}
              >
                {jobData.map((job, index) => (
                  <Grid item key={index} xs={12} sm={6} md={4}>
                    <Card
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="140"
                        image={job.logo}
                        alt={`${job.company} logo`}
                      />
                      <CardContent
                        sx={{ backgroundColor: "#F8F8F8", flexGrow: 1 }}
                      >
                        <Typography variant="h5" component="div">
                          {job.role}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {job.description}
                        </Typography>
                        <Typography variant="subtitle1" color="text.primary">
                          Salary: {job.salary}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary">
                          Company: {job.company}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary">
                          Location: {job.location}
                        </Typography>
                         <Button
                          color="primary"
                          variant="contained"
                          sx={{ marginTop: "8px" }}
                          onClick={() => {jobapplication(job)}}
                        >
                          Apply Now
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
          <Grid item xs={3}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                position: "sticky",
                top: 100, // This will move the FilterComponent 100px down from the top
                p: 2,
                width: "100%",
              }}
            >
              <Box
                component="form"
                sx={{
                  p: 3,
                  m: 2,
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "12%",
                  bgcolor: "background.paper",
                  boxShadow: 3,
                  borderRadius: 2,
                  maxWidth: 250,
                }}
                noValidate
                autoComplete="off"
              >
                <Typography variant="h6" gutterBottom>
                  Filter By
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Role"
                      size="small"
                      variant="outlined"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label=">=Salary"
                      variant="outlined"
                      size="small"
                      type="number"
                      value={salary}
                      onChange={(e) => {
                        setSalary(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Location"
                      size="small"
                      variant="outlined"
                      value={location}
                      onChange={(e) => {
                        setLocation(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Company"
                      size="small"
                      variant="outlined"
                      value={company}
                      onChange={(e) => {
                        setCompany(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      width="30%"
                      variant="contained"
                      color="primary"
                      onClick={handleFilter}
                    >
                      Filter
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default JobCards
