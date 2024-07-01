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
    // makeStyles
} from '@mui/material';
// import {makeStyles} from '@mui/styles'
import { domain, server } from '../../constants/config';
const containerStyle = {
    maxWidth: '800px', // Adjust as needed
    margin: 'auto', // Center align horizontally
    marginTop: '50px', // Provide top margin for spacing
    padding: '20px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', // Optional: Add shadow for box effect
    borderRadius: '8px', // Optional: Add rounded corners
};

const Applicants = () => {
    const [applicants, setApplicants] = useState([]);
    const [queryId, setQueryId] = useState(null);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const id = searchParams.get('id');
        setQueryId(id);

        // Fetch applicant data using the `id` query parameter
        if (id) {
            fetch(`${server}/api/v1/work/workapplicants?id=${id}`,{
                method: 'GET',
                headers: {
                  'authorization': localStorage.getItem('token')
        }})
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {console.log(data.applicants);setApplicants(data.applicants);})
                .catch(error => console.error('Error fetching applicants', error));
        }
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
        <div style={containerStyle}>
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
        </div>
    );
};

export default Applicants;
