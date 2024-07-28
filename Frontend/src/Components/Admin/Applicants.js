import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Button,
    Container,
   
} from '@mui/material';
import { domain, server } from '../../constants/config';
import axios from 'axios';


const Applicants = () => {
    const [applicants, setApplicants] = useState([]);
    const [queryId, setQueryId] = useState(null);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const id = searchParams.get('id');
        setQueryId(id);
        const getApplicant= async()=>{
            if (id) {
                try {
                    const response = await axios.get(`${server}/api/v1/work/workapplicants`, {
                        params: { id },
                        headers: {
                            'authorization': `bearer ${localStorage.getItem('token')}` 
                        }
                    });
                    console.log(response.data.applicants);
                    setApplicants(response.data.applicants);
                } catch (error) {
                    console.error('Error fetching applicants', error);
                }
            }
        }
        getApplicant();
    }, []);

    const handleDownload = (path) => {
        console.log(path);
        fetch(`${server}/api/v1/work/download?path=${path}`, {
            method: 'GET',
            headers: {
                'authorization': localStorage.getItem('token')}
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob(); // Important
        })
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', path.split('/').pop());
            document.body.appendChild(link);
            link.click();
            link.remove();
        })
        .catch(error => console.error('Error downloading file', error));
    };
    return (
        <Container style={{
            maxWidth: '800px', 
            margin: 'auto', 
            marginTop: '8rem', 
            padding: '20px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', 
            borderRadius: '8px', 
        }}>
            <Typography variant="h2" align="center" gutterBottom>
                Applicants
            </Typography>
            {queryId ? (
                applicants.length > 0 ? (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Skills</TableCell>
                                    <TableCell>Why Join</TableCell>
                                    <TableCell>Resume Download</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {applicants.map((applicant) => (
                                    <TableRow key={applicant._id}>
                                        <TableCell>{applicant.name}</TableCell>
                                        <TableCell>{applicant.skills}</TableCell>
                                        <TableCell>{applicant.whyJoin}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleDownload(applicant.path)}
                                            >
                                                Download Resume
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <Typography variant="body1" align="center">
                        No applicants found.
                    </Typography>
                )
            ) : (
                <Typography variant="body1" align="center">
                    No ID parameter found in the URL
                </Typography>
            )}
        </Container>
    );
};

export default Applicants;
