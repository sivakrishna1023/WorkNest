import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { domain, server } from '../constants/config';
import { Toaster,toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { userExists } from '../redux/reducers/auth';

export default function LoginTeam() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [isLoading,setIsLoading]=useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (prop) => (event) => {
    if (prop === 'email') setEmail(event.target.value);
    else if (prop === 'password') setPassword(event.target.value);
  };

const signInRecruiter=async()=>{
    const user={
      email:email,
      password:password
    }
    setIsLoading(true);
    const toastId=toast.loading("Signing In...");
    try{
      const newpromise=await fetch(`${server}/api/v1/admin/login`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    if (!newpromise.ok) {
      toast.error("Failed to sign In",{id:toastId});
      throw new Error('Network response was not ok');
    }
    const data = await newpromise.json();
    if(data.success){
      toast.success("Successfully signed In..",{id:toastId});
      const user=data.user;
      localStorage.setItem('token',data?.token);
      localStorage.setItem('token-type',"Recruiter");
      dispatch(userExists({...data.user,role:"Recruiter"}))
      navigate('/')
    }else{
      toast.error("Failed to sign In",{id:toastId});
    }
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
      toast.error('Try again later..',{id:toastId});
    }finally{
      setIsLoading(false);
    } 
}
const signInCadidate=async()=>{
        const user={
          email:email,
          password:password
        }
      const toastId=toast.loading("Please wait..")
      setIsLoading(false);
      try{
        const newpromise=await fetch(`${server}/api/v1/user/login`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      if (!newpromise.ok) {
        toast.error("Failed to sign In",{id:toastId});
        throw new Error('Network response was not ok');
      }
      const data = await newpromise.json();
        if(data.success){
          toast.success('Succefully logged In..',{id:toastId});
          localStorage.setItem('token',data?.token);
          localStorage.setItem('token-type',"Candidate");
          dispatch(userExists({...data.user,role:"Candidate"}))
          navigate('/');
        }else{
          toast.error(data?.message || 'Try again Later',{id:toastId});
        }
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        toast.error("Try again Later...",{id:toastId});
      }finally{
        setIsLoading(false);
      }
}
  return (
    <>
    <Toaster
    position="top-center"
    reverseOrder={false}
    />
    <Container maxWidth="sm" style={{ padding: '2%', marginTop: '10%' }}>
      <Typography variant="h4" align="center" gutterBottom>Sign In</Typography>
        <Box marginTop="16px">
          <TextField
            label="Email Address"
            variant="outlined"
            fullWidth
            margin="dense"
            value={email}
            onChange={handleChange('email')}
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
              variant="outlined"
              color="primary"
              onClick={signInCadidate}
              style={{ width: '45%' }}
              disabled={isLoading}
            >
              Sign In
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={signInRecruiter}
              style={{ width: '45%' }}
              disabled={isLoading}
            >
              Sign In Recruiter
            </Button>
          </Box>
        </Box>
    </Container>
    </>
  );
}
