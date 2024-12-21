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
    Rating,
    LinearProgress,
    Chip
} from '@mui/material';
import axios from 'axios';

interface Performance {
    employeeId: number;
    employeeName: string;
    technology: string;
    projectContributions: {
        projectName: string;
        rating: number;
        tasks: number;
        completedTasks: number;
    }[];
    overallRating: number;
    skillLevel: number;
}

const EmployeePerformance = () => {
    const [performances, setPerformances] = useState<Performance[]>([]);

    useEffect(() => {
        fetchPerformanceData();
    }, []);

    const fetchPerformanceData = async () => {
        try {
            const response = await axios.get('/api/employee/performance');
            setPerformances(response.data);
        } catch (error) {
            console.error('Error fetching performance data:', error);
        }
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>Employee Performance</Typography>

            {performances.map((employee) => (
                <Paper key={employee.employeeId} sx={{ p: 2, mb: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">{employee.employeeName}</Typography>
                                    <Chip label={employee.technology} sx={{ mt: 1 }} />
                                    <Box sx={{ mt: 2 }}>
                                        <Typography component="legend">Overall Rating</Typography>
                                        <Rating value={employee.overallRating} readOnly precision={0.5} />
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Typography variant="h6" gutterBottom>Skill Level</Typography>
                            <LinearProgress 
                                variant="determinate" 
                                value={employee.skillLevel} 
                                sx={{ height: 10, mb: 3 }}
                            />
                            
                            <Typography variant="h6" gutterBottom>Project Contributions</Typography>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Project</TableCell>
                                        <TableCell>Rating</TableCell>
                                        <TableCell>Tasks Completion</TableCell>
                                        <TableCell>Progress</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {employee.projectContributions.map((project) => (
                                        <TableRow key={project.projectName}>
                                            <TableCell>{project.projectName}</TableCell>
                                            <TableCell>
                                                <Rating value={project.rating} readOnly size="small" />
                                            </TableCell>
                                            <TableCell>
                                                {project.completedTasks}/{project.tasks}
                                            </TableCell>
                                            <TableCell>
                                                <LinearProgress 
                                                    variant="determinate" 
                                                    value={(project.completedTasks/project.tasks) * 100}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>
                </Paper>
            ))}
        </Box>
    );
};

export default EmployeePerformance;
