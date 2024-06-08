  import * as React from 'react';
  import { alpha } from '@mui/material';
  import Box from '@mui/material/Box';
  import Button from '@mui/material/Button';
  import Container from '@mui/material/Container';
  import Stack from '@mui/material/Stack';
  import Typography from '@mui/material/Typography';

  export default function Hero() {
    return (
      <Box
        id="hero"
        sx={(theme) => ({
          width: '100%',
          backgroundImage:
            theme.palette.mode === 'light'
              ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
              : `linear-gradient(#02294F, ${alpha('#090E10', 0.0)})`,
          backgroundSize: '100% 20%',
          backgroundRepeat: 'no-repeat',
        })}
      >
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pt: { xs: 10, sm: 15 },
            // pb: { xs: 4, sm: 8 },
          }}
        >
          <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
            <Typography
              variant="h1"
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignSelf: 'center',
                textAlign: 'center',
                fontSize: 'clamp(3.5rem, 10vw, 4rem)',
              }}
            >
              Hire&nbsp;
              <Typography
                component="span"
                variant="h1"
                sx={{
                  fontSize: 'clamp(3rem, 10vw, 4rem)',
                  color: (theme) =>
                    theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
                }}
              >
                / Get Hired
              </Typography>
            </Typography>
            <Typography
              textAlign="center"
              color="text.secondary"
              sx={{ alignSelf: 'center', width: { sm: '100%', md: '80%' } }}
            >
              Explore various job-ooportunities from various recruiters suiting your experience, qualification and skillset.
              One stop for all job Searchers and Recruiters
            </Typography>
            <Stack>
            <Typography
              direction={{ xs: 'column', sm: 'column' }}
              alignSelf="center"
              spacing={1}
              useFlexGap
              sx={{ pt: 2, width: { xs: '40%', sm: 'auto' } }}
            >
           <center> <h1>One Stop for Both &nbsp; 
           <Typography
                component="span"
                variant="h1"
                sx={{
                  fontSize: '120%',
                  color: (theme) =>
                    theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
                }}
              >
                Recruiters and Job Seekers
              </Typography>
            </h1></center>
            </Typography>
            </Stack>
              <Stack
              direction={{ sm: 'row', xs:'row'}}
              alignSelf="center"
              spacing={4}
             >
              <Button variant="contained" color="primary" href='/signup'>
                Get Started Here 
              </Button>
              
              </Stack>
            
                </Stack>
          
        </Container>
      </Box>
    );
  }