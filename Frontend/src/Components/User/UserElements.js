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
import { server , domain} from "../../constants/config";
import { useNavigate } from "react-router-dom";
import { Toaster,toast } from "react-hot-toast";

const JobCards = () => {
  const [jobData, setJobData] = useState([]);
  const [role, setRole] = useState("");
  const [salary, setSalary] = useState(0);
  const [location, setLocation] = useState("");
  const [company, setCompany] = useState("");
  const navigate=useNavigate();
  const [isLoading,setIsLoading]=useState(false);
  const jobapplication=(job)=>{
    navigate(`/user/applyjob?jobid=${job._id}`);
  }

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${server}/api/v1/work/alljobs`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${localStorage.getItem("token")}`,
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
  }, []);

  const handleFilter = async () => {
    const newobj = {
      name: role,
      amount: salary,
      place: location,
      company: company,
    };
    setIsLoading(true);
    const toastId=toast.loading("Filtering your result");
    fetch(`${server}/api/v1/work/jobsbyvariables`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newobj),
    })
      .then((response) => {
        if (!response.ok) {
          toast.error("Failed to Filter",{id:toastId});  
        }
        return response.json();
      })
      .then((data) => {
        setJobData([]);
        setJobData(data["works"]);
        toast.success("Here your results",{id:toastId});
      })
      .catch((error) => {
        toast.error("Failed to Filter",{id:toastId});        
      });
      setIsLoading(false);
  };

  return (
    <>
     <Toaster
      position="top-center"
      reverseOrder={false}
      />
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
                          disabled={isLoading}
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
                top: 100,
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
                      disabled={isLoading}
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
