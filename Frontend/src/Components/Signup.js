import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch,  } from 'react-redux';
// import { useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import {actionCreators} from '../state/index';

export default function LoginTeam(props) {
  const [teamPassword, setTeamPassword] = useState('');
  const [teamUsername, setTeamUsername] = useState('');
  const [teamMemberName, setTeamMemberName] = useState('');
  const [teamCompany, setTeamCompany] = useState('');
  const [showTeamPassword, setShowTeamPassword] = useState(false);
  const [showTeamForm, setShowTeamForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [individualname, setindividualname] = useState('');

  const handleTeamUsernameChange = (e) => {
    setTeamUsername(e.target.value);
  };

  const handleTeamCompany = (e) => {
    setTeamCompany(e.target.value);
  };

  const handleTeamMemberNameChange = (e) => {
    setTeamMemberName(e.target.value);
  };

  const handleTeamPasswordChange = (e) => {
    setTeamPassword(e.target.value);
  };

  const toggleTeamPasswordVisibility = () => {
    setShowTeamPassword(!showTeamPassword);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleIndividualClick = () => {
    setShowTeamForm(false);
  };

  const handleTeamClick = () => {
    setShowTeamForm(true);
  };

  const handleChange = (prop) => (event) => {
    if (prop === 'username') setUsername(event.target.value);
    else if (prop === 'password') setPassword(event.target.value);
    else if (prop === 'individualname') setindividualname(event.target.value);
  };
  
  // const userDetails=useSelector(state=>state.userdetails);
  const dispatch=useDispatch();
  const {getdetails}=bindActionCreators(actionCreators,dispatch);
  const signing2=async()=>{
      const user={
          name:teamMemberName,
          email:teamUsername,
          password:teamPassword,
          company:teamCompany
        }
      getdetails(user);
      try{
          const newpromise=await fetch('http://localhost:3000/api/v1/admin/register',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        })
        if (!newpromise.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await newpromise.json();
        console.log(data);
        alert('Sign Up Successful');
        let m=' ';
    localStorage.setItem('token','Bearer'+m+ data['token']);
      window.location.href='http://localhost:3001/admin'
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
      alert('Sign Up Not Successful');
    }
  }
  const signing=async()=>{
        const user={
          name:individualname,
          email:username,
          password:password
        }
        getdetails(user);
        try{
          const newpromise=await fetch('http://localhost:3000/api/v1/user/register',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        })
        if (!newpromise.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await newpromise.json();
        console.log(data);
        alert('Sign Up Successful');
        let m=' ';
    localStorage.setItem('token','Bearer'+m+data['token'])
      window.location.href='http://localhost:3001/user'
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
      alert('Sign Up Not Successful');
    }
        
  }
  return (
    <Container maxWidth="sm" style={{ padding: '2%', marginTop: '10%' }}>
      <Typography variant="h4" align="center" gutterBottom>Sign Up</Typography>
      <Box display="flex" justifyContent="space-evenly" marginTop="16px">
        <Typography variant="subtitle1" onClick={handleIndividualClick} style={{ cursor: 'pointer' }}>
          For Job Seekers
        </Typography>
        <Typography variant="subtitle1" onClick={handleTeamClick} style={{ cursor: 'pointer' }}>
          For Recruiters
        </Typography>
      </Box>

      {showTeamForm ? (
        <Box marginTop="16px">    
         
          <TextField
            label="Name of the Recruiter"
            variant="outlined"
            fullWidth
            margin="dense"
            value={teamMemberName}
            onChange={handleTeamMemberNameChange}
          />
          <TextField
            label="Email Address of the Recruiter"
            variant="outlined"
            fullWidth
            margin="dense"
            value={teamUsername}
            onChange={handleTeamUsernameChange}
          />
          <TextField
            id="teamPassword"
            label="Password of the Recruiter"
            variant="outlined"
            fullWidth
            type={showTeamPassword ? "text" : "password"}
            value={teamPassword}
            onChange={handleTeamPasswordChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleTeamPasswordVisibility}>
                    {showTeamPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            
          />
           <TextField
            label="Company of the Recruiter"
            variant="outlined"
            fullWidth
            margin="dense"
            value={teamCompany}
            onChange={handleTeamCompany}
          />
          <Box display="flex" justifyContent="center" marginTop="16px">
            <Button
              variant="contained"
              color="primary"
              onClick={signing2}
              style={{ width: '50%' }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      ) : (
        <Box marginTop="16px">
          <TextField
            label="Name of the Individual"
            variant="outlined"
            fullWidth
            margin="dense"
            value={individualname}
            onChange={handleChange('individualname')}
          />
          <TextField
            label="Email Address"
            variant="outlined"
            fullWidth
            margin="dense"
            value={username}
            onChange={handleChange('username')}
          />
          <TextField
            id="inputPassword5"
            label="Password"
            variant="outlined"
            fullWidth
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handleChange('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box display="flex" justifyContent="center" marginTop="16px">
            <Button
              variant="contained"
              color="primary"
              onClick={signing}
              style={{ width: '50%' }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
}
