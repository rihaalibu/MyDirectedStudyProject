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
    CircularProgress
} from '@mui/material';
import axios from 'axios';
import { createAuthenticatedAxios } from '../utils/api';
interface TechStats {
    technology: string;
    count: number;
    employees: {
        Id: number;
        name: string;
        projectName: string;
    }[];
};

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
const TechnologyReport = () => {
    const [techStats, setTechStats] = useState<TechStats[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTechnologyStats();
    }, []);

    const fetchTechnologyStats = async () => {
        try {
            const response = await httpClient.get('/api/report/resources-by-technology');
            setTechStats(response.data);
            console.log(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching technology stats:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Box>
            <Typography variant="h4" gutterBottom>Technology Distribution</Typography>
            
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {techStats.map((tech) => (
                    <Grid item xs={12} md={3} key={tech.technology}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{tech.technology}</Typography>
                                <Typography variant="h3" color="primary">
                                    {tech.count}
                                </Typography>
                                <Typography color="textSecondary">
                                    Resources
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {techStats.map((tech) => (
                <Paper sx={{ p: 2, mb: 2 }} key={tech.technology}>
                    <Typography variant="h6" gutterBottom>
                        {tech.technology} Resources
                    </Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Current Project</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tech.employees.map((employee) => (
                                <TableRow key={employee.Id}>
                                    <TableCell>{employee.Id}</TableCell>
                                    <TableCell>{employee.name}</TableCell>
                                    <TableCell>{employee.projectName}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            ))}
        </Box>
    );
};

export default TechnologyReport;
