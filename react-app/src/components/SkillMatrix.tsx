import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Rating,
    Chip,
    Grid,
    Card,
    CardContent
} from '@mui/material';
import axios from 'axios';

interface SkillData {
    technology: string;
    employees: {
        id: number;
        name: string;
        level: number;
        experience: number;
        certifications: string[];
    }[];
    totalExperts: number;
    averageLevel: number;
}

const SkillMatrix = () => {
    const [skillData, setSkillData] = useState<SkillData[]>([]);

    useEffect(() => {
        fetchSkillData();
    }, []);

    const fetchSkillData = async () => {
        try {
            const response = await axios.get('/api/skills/matrix');
            setSkillData(response.data);
        } catch (error) {
            console.error('Error fetching skill data:', error);
        }
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>Skill Matrix</Typography>

            <Grid container spacing={2} sx={{ mb: 3 }}>
                {skillData.map((tech) => (
                    <Grid item xs={12} md={4} key={tech.technology}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{tech.technology}</Typography>
                                <Typography color="textSecondary">
                                    Expert Resources: {tech.totalExperts}
                                </Typography>
                                <Box sx={{ mt: 1 }}>
                                    <Typography component="legend">Average Skill Level</Typography>
                                    <Rating 
                                        value={tech.averageLevel} 
                                        readOnly 
                                        precision={0.5}
                                    />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {skillData.map((tech) => (
                <Paper key={tech.technology} sx={{ p: 2, mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        {tech.technology} Team
                    </Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Employee</TableCell>
                                <TableCell>Skill Level</TableCell>
                                <TableCell>Experience (Years)</TableCell>
                                <TableCell>Certifications</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tech.employees.map((employee) => (
                                <TableRow key={employee.id}>
                                    <TableCell>{employee.name}</TableCell>
                                    <TableCell>
                                        <Rating 
                                            value={employee.level} 
                                            readOnly 
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>{employee.experience}</TableCell>
                                    <TableCell>
                                        {employee.certifications.map((cert) => (
                                            <Chip 
                                                key={cert}
                                                label={cert}
                                                size="small"
                                                sx={{ mr: 0.5 }}
                                            />
                                        ))}
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

export default SkillMatrix;
