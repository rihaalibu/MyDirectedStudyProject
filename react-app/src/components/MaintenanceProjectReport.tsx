import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Paper,
    Grid,
    Card,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    CircularProgress
} from '@mui/material';
import axios from 'axios';
import { createAuthenticatedAxios } from '../utils/api';

// const httpClient = axios.create({
//   baseURL: 'http://localhost:8080/',
//   headers: {
//     'Content-Type': 'application/json',
//     'Access-Control-Allow-Origin':  '*',
//     'Authorization': `Bearer ${localStorage.getItem('token')}`
//   },
//   timeout: 1000,
// });
const httpClient = createAuthenticatedAxios();
interface MaintenanceProject {
    projectId: number;
    projectName: string;
    clientName: string;
    startDate: string;
    status: string;
    resources: {
        employeeId: number;
        employeeName: string;
        technology: string;
        startDate: string;
        
    }[];
}

const MaintenanceProjectReport = () => {
    const [projects, setProjects] = useState<MaintenanceProject[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMaintenanceProjects();
    }, []);

    const fetchMaintenanceProjects = async () => {
        try {
            const response = await httpClient.get('/api/report/maintenance-projects');
            setProjects(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching maintenance projects:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Box>
            <Typography variant="h4" gutterBottom>Maintenance Projects</Typography>

            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary">Total Projects</Typography>
                            <Typography variant="h4">{projects.length}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary">Active Projects</Typography>
                            <Typography variant="h4">
                                {projects.filter(p => p.status === 'Active').length}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary">Total Resources</Typography>
                            <Typography variant="h4">
                                {projects.reduce((acc, curr) => acc + curr.resources.length, 0)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {projects.map((project) => (
                <Paper key={project.projectId} sx={{ p: 2, mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="h6">{project.projectName}</Typography>
                        <Chip 
                            label={project.status}
                            color={project.status === 'Active' ? 'success' : 'default'}
                        />
                    </Box>
                    <Typography color="textSecondary" gutterBottom>
                        Client: {project.clientName}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                        Start Date: {new Date(project.startDate).toLocaleDateString()}
                    </Typography>
                    
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Resource ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Technology</TableCell>
                                
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {project.resources.map((resource) => (
                                <TableRow key={resource.employeeId}>
                                    <TableCell>{resource.employeeId}</TableCell>
                                    <TableCell>{resource.employeeName}</TableCell>
                                    <TableCell>{resource.technology}</TableCell>
                                
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            ))}        </Box>
    );
};

export default MaintenanceProjectReport;
