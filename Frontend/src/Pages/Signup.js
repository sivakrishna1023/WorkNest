import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch,  } from 'react-redux';
import { bindActionCreators } from 'redux';
import { server,domain } from '../constants/config';
import {Toaster,toast} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import { userExists,userNotExists } from '../redux/reducers/auth';
export default function LoginTeam(props) {
  const navigate=useNavigate();
  const [isLoading,setIsLoading]=useState(false);
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName,setCompanyName]=useState('');

  const [showPassword,setShowPassword]=useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (prop) => (event) => {
    if (prop === 'Name') setName(event.target.value);
    else if (prop === 'password') setPassword(event.target.value);
    else if (prop === 'Email') setEmail(event.target.value);
    else if(prop=='companyName')  setCompanyName(event.target.value);
  };
  
  const dispatch=useDispatch();

  const signUpRecruiter=async()=>{
      const toastId=toast.loading('Signing Up....')
      const user={
          name:name,
          email:email,
          password:password,
          company:companyName
        }
      try{
         setIsLoading(true);
          const newpromise=await fetch(`${server}/api/v1/admin/register`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        })
        if (!newpromise.ok) {
          toast.error('Faild to SignUp try again later..',{id:toastId})
          throw new Error('Network response was not ok');
        }
        const data = await newpromise.json();
        if(data.success){
          toast.success('Sign Up successFull..!',{id:toastId});
          dispatch(userExists({...data.user,role:"Recruiter"}))
          localStorage.setItem('token',data?.token);
        }else{
          toast.error('Faild to SignUp try again later..',{id:toastId})
        }
    }catch (error) {
         toast.error('Try again after some time',{id:toastId});
    }finally{
      setIsLoading(false);
    }
  }
  const signUpCandidate=async()=>{
        const user={
          name:name,
          email:email,
          password:password
        }
        setIsLoading(true);
        const toastId=toast.loading("SignUp In...");
        try{
          const newpromise=await fetch(`${server}/api/v1/user/register`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        })
        if (!newpromise.ok) {
          toast.error('Faild to SignUp try again later..',{id:toastId})
          throw new Error('Network response was not ok');
        }
        const data = await newpromise.json();
        if(data.success){
          toast.success("SignUp successfull..!!",{id:toastId});
          dispatch(userExists({...data.user,role:"Recruiter"}))
          localStorage.setItem('token',data?.token);
        }else{
          toast.error("signUp failed...",{id:toastId});
        }
    } catch (error) {
      toast.error("Try agaUp later...",{id:toastId});
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
      <Typography variant="h4" align="center" gutterBottom>Sign Up</Typography>
        <Box marginTop="16px">
          <TextField
            required
            label="Name"
            variant="outlined"
            fullWidth
            margin="dense"
            value={name}
            onChange={handleChange('Name')}
          />
          <TextField
            required
            label="Email Address"
            variant="outlined"
            fullWidth
            margin="dense"
            value={email}
            onChange={handleChange('Email')}
          />
          <TextField
            required
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
           <TextField
            label="Company"
            variant="outlined"
            fullWidth
            margin="dense"
            placeholder="Required for HR's"
            value={companyName}
            onChange={handleChange('companyName')}
          />
          <Box display="flex" justifyContent="center" marginTop="16px">
            <Button
              variant="outlined"
              color="primary"
              onClick={signUpCandidate}
              style={{ width: '45%',marginRight:5 }}
              disabled={isLoading}
            >
              Sign Up
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={signUpRecruiter}
              style={{ width: '45%' }}
              disabled={isLoading}
            >
              Sign Up as Recruiter
            </Button>
          </Box>
        </Box>
    
    </Container>
    </>
  );
}
