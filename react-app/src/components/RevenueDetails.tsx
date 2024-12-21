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
    CircularProgress,
    LinearProgress
} from '@mui/material';
import axios from 'axios';
import { createAuthenticatedAxios } from '../utils/api';
interface RevenueData {
    clientName: string;
    revenue: number;
    costs: number;
    profit: number;
    projects: {
        projectName: string;
        revenue: number;
        resourceCost: number;
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
const RevenueDetails = () => {
    const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalStats, setTotalStats] = useState({
        totalRevenue: 0,
        totalCosts: 0,
        totalProfit: 0
    });

    useEffect(() => {
        fetchRevenueData();
    }, []);

    const fetchRevenueData = async () => {
        try {
            const response = await httpClient.get('/api/report/revenue-by-client');
            setRevenueData(response.data);
            calculateTotalStats(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching revenue data:', error);
            setLoading(false);
        }
    };

    const calculateTotalStats = (data: RevenueData[]) => {
        const stats = data.reduce((acc, curr) => ({
            totalRevenue: acc.totalRevenue + curr.revenue,
            totalCosts: acc.totalCosts + curr.costs,
            totalProfit: acc.totalProfit + curr.profit
        }), { totalRevenue: 0, totalCosts: 0, totalProfit: 0 });
        setTotalStats(stats);
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Box>
            <Typography variant="h4" gutterBottom>Revenue Analysis</Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary">Total Revenue</Typography>
                            <Typography variant="h4">
                                ${totalStats.totalRevenue.toLocaleString()}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary">Total Costs</Typography>
                            <Typography variant="h4" color="error">
                                ${totalStats.totalCosts.toLocaleString()}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary">Net Profit</Typography>
                            <Typography variant="h4" color="success.main">
                                ${totalStats.totalProfit.toLocaleString()}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {revenueData.map((client) => (
                <Paper key={client.clientName} sx={{ p: 2, mb: 3 }}>
                    <Typography variant="h6" gutterBottom>{client.clientName}</Typography>
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item xs={12}>
                            <Typography variant="body2" color="textSecondary">
                                Profit Margin: {((client.profit / client.revenue) * 100).toFixed(1)}%
                            </Typography>
                            <LinearProgress 
                                variant="determinate" 
                                value={(client.profit / client.revenue) * 100}
                                sx={{ mt: 1 }}
                            />
                        </Grid>
                    </Grid>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Project</TableCell>
                                <TableCell align="right">Revenue</TableCell>
                                <TableCell align="right">Resource Cost</TableCell>
                                <TableCell align="right">Profit</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {client.projects.map((project) => (
                                <TableRow key={project.projectName}>
                                    <TableCell>{project.projectName}</TableCell>
                                    <TableCell align="right">
                                        ${project.revenue.toLocaleString()}
                                    </TableCell>
                                    <TableCell align="right">
                                        ${project.resourceCost.toLocaleString()}
                                    </TableCell>
                                    <TableCell align="right">
                                        ${(project.revenue - project.resourceCost).toLocaleString()}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            ))}
        </Box>
    );
};

export default RevenueDetails;
