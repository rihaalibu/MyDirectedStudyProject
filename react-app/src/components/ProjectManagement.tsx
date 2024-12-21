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
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    Grid,
    SelectChangeEvent
} from '@mui/material';
import axios from 'axios';
import  { createAuthenticatedAxios } from '../utils/api';
interface Client {
    clientId: number;
    clientName: string;
}

interface Project {
    projectId: number;
    projectName: string;
    clientId: number;
    clientName: string;
    startDate: string;
    endDate: string;
    status: string;
    technology: string[];
    assignedEmployees: number;
}
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
const ProjectManagement = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [clients, setClients] = useState<Client[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Partial<Project>>({});
    const [editProject, setEditProject] = useState<Partial<Project>>({});
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchProjects();
        fetchClients();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await axios.get('/api/projects');
            setProjects(response.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const fetchClients = async () => {
        try {
            const response = await axios.get('/api/clients');
            setClients(response.data);
        } catch (error) {
            console.error('Error fetching clients:', error);
        }
    };

    const handleAddProject = async () => {
        try {
            await httpClient.post('/api/projects', newProject);
            fetchProjects();
            setOpenDialog(false);
            
        } catch (error) {
            console.error('Error adding project:', error);
        }
    };

    const handleEditProject = async (project: Project) => {
        try {
            await httpClient.put(`/api/projects/${project.projectId}`, editProject);
            fetchProjects();
            setIsEditing(false);
            setEditProject({});
            setOpenDialog(false);
        } catch (error) {
            console.error('Error updating project:', error);
        }
    };

    const handleDeleteProject = async (projectId: number) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await httpClient.delete(`/api/projects/${projectId}`);
                fetchProjects();
            } catch (error) {
                console.error('Error deleting project:', error);
            }
        }
    };

   

    return (
        <Box>
            <Paper sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4">Project Management</Typography>
                <Button 
                    variant="contained" 
                    onClick={() => setOpenDialog(true)}
                >
                    Create New Project
                </Button>
            </Paper>

            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h6">Total Projects</Typography>
                        <Typography variant="h4">{projects.length}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h6">Active Projects</Typography>
                        <Typography variant="h4">
                            {projects.filter(p => p.status === 'Active').length}
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h6">Total Resources</Typography>
                        <Typography variant="h4">
                            {projects.reduce((acc, curr) => acc + curr.assignedEmployees, 0)}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            <Paper sx={{ p: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Project Name</TableCell>
                            <TableCell>Client</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>End Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Technologies</TableCell>
                            <TableCell>Resources</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projects.map((project) => (
                            <TableRow key={project.projectId}>
                                <TableCell>{project.projectName}</TableCell>
                                <TableCell>{project.clientName}</TableCell>
                                <TableCell>{new Date(project.startDate).toLocaleDateString()}</TableCell>
                                <TableCell>{new Date(project.endDate).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <Chip 
                                        label={project.status}
                                        color={project.status === 'Active' ? 'success' : 'default'}
                                    />
                                </TableCell>
                                <TableCell>
                                    {project.technology.map((tech) => (
                                        <Chip key={tech} label={tech} size="small" sx={{ mr: 0.5 }} />
                                    ))}
                                </TableCell>
                                <TableCell>{project.assignedEmployees}</TableCell>
                                <TableCell>
                                    <Button color="primary">Edit</Button>
                                    <Button color="error">Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Project Name"
                                margin="normal"
                                value={selectedProject.projectName || ''}
                                onChange={(e) => setSelectedProject({...selectedProject, projectName: e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Client</InputLabel>
                                <Select
                                    value={selectedProject.clientId || ''}
                                    onChange={handleClientChange}
                                >
                                    {clients.map((client) => (
                                        <MenuItem key={client.clientId} value={client.clientId}>
                                            {client.clientName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Start Date"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                value={selectedProject.startDate || ''}
                                onChange={(e) => setSelectedProject({...selectedProject, startDate: e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="End Date"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                value={selectedProject.endDate || ''}
                                onChange={(e) => setSelectedProject({...selectedProject, endDate: e.target.value})}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={handleSave} variant="contained">Create Project</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ProjectManagement;
