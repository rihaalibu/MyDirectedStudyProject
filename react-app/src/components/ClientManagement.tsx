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
    FormControlLabel,
    Checkbox,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';

import axios from 'axios';

import { createAuthenticatedAxios } from '../utils/api';

interface Client {
    clientId : number;
    clientName: string;
    totalAmountPaid: number;
    isActive: boolean;
}

interface Project {
    projectId: number;
    projectName: string;
    isMaintenanceProject: boolean;
    projectValue: number;
    clientId: number;
}

interface TechnicalResource {
    employeeId: number;
    employeeName: string;
    salary: number;
    technology: string;
    isActive: boolean;
}

interface ProjectAllocation {
    projectId: number;
    resourceId: number;
    startDate: string;
    endDate: string;
}


interface ResourceAllocationView {
    projectId: number;
    employeeId: number;
    employeeName: string;
    technology: string;
    salary: number;
    isActive: boolean;
    startDate: string;
    endDate: string;
}

const ClientManagement = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [newClient, setNewClient] = useState<Partial<Client>>({});
    const [projectDialog, setProjectDialog] = useState(false);
    const [newProject, setNewProject] = useState<Partial<Project>>({});
    const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [technicalResources, setTechnicalResources] = useState<TechnicalResource[]>([]);
    const [allocationDialog, setAllocationDialog] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
    const [newAllocation, setNewAllocation] = useState<Partial<ProjectAllocation>>({});
    const [editClient, setEditClient] = useState<Partial<Client>>({});
    const [editProject, setEditProject] = useState<Partial<Project>>({});
    const [editAllocation, setEditAllocation] = useState<Partial<ProjectAllocation>>({});
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [resourceAllocationsDialog, setResourceAllocationsDialog] = useState(false);
    const [resourceAllocations, setResourceAllocations] = useState<ResourceAllocationView[]>([]);


        // const httpClient = axios.create({
        //     baseURL: 'http://localhost:8080',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Access-Control-Allow-Origin': '*',
        //         'Authorization': `Bearer ${localStorage.getItem('token')}`
        //     }
        // });
    const httpClient = createAuthenticatedAxios();
    useEffect(() => {
        fetchClients();
        fetchProjects();
        fetchTechnicalResources();
    }, []);

    const fetchClients = async () => {
        try {
            const response = await httpClient.get('/api/client');
            setClients(response.data);
        } catch (error) {
            console.error('Error fetching clients:', error);
        }
    };

    const fetchProjects = async () => {
        try {
            const response = await httpClient.get('/api/project');
            setProjects(response.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const fetchTechnicalResources = async () => {
        try {
            const response = await httpClient.get('/api/technicalresource');
            setTechnicalResources(response.data);
        } catch (error) {
            console.error('Error fetching resources:', error);
        }
    };

    const handleAddClient = async () => {
        try {
            await httpClient.post('/api/client', newClient);
            fetchClients();
            setOpenDialog(false);
            setNewClient({});
        } catch (error) {
            console.error('Error adding client:', error);
        }
    };

    const handleEditClient = async () => {
        try {
            await httpClient.put(`/api/client/updateclient/${editClient.clientId}`, editClient);
            fetchClients();
            setOpenEditDialog(false);
            setEditClient({});
        } catch (error) {
            console.error('Error editing client:', error);
        }
    };

    const handleAddProject = async () => {
        try {
            await httpClient.post('/api/project', {
                ...newProject,
                clientId: selectedClientId
            });
            setProjectDialog(false);
            setNewProject({});
            setSelectedClientId(null);
            fetchProjects();
        } catch (error) {
            console.error('Error adding project:', error);
        }
    };

    const handleAddAllocation = async () => {
        try {
            await httpClient.post('/api/resourceallocation/allocate', {
                ...newAllocation,
                projectId: selectedProjectId
            });
            setAllocationDialog(false);
            setNewAllocation({});
            setSelectedProjectId(null);
            fetchProjects();
        } catch (error) {
            console.error('Error adding allocation:', error);
        }
    };

    const fetchResourceAllocations = async (projectId: number) => {
        try {
            const response = await httpClient.get(`/api/resourceallocation/project/${projectId}`);
            setResourceAllocations(response.data);
            //return response.data;
        } catch (error) {
            console.error('Error fetching resource allocations:', error);
            return [];
        }
    };

    return (
        <Box>
            <Paper sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4">Client Management</Typography>
                <Button variant="contained" onClick={() => setOpenDialog(true)}>
                    Add New Client
                </Button>
            </Paper>

            <Paper sx={{ p: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Total Amount Paid</TableCell>
                            <TableCell>isActive</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {clients.map((client) => (
                            <TableRow key={client.clientId}>
                                <TableCell>{client.clientId}</TableCell>
                                <TableCell>{client.clientName}</TableCell>
                                <TableCell>{client.totalAmountPaid}</TableCell> 
                                <TableCell>
                                      <FormControlLabel control={<Checkbox checked={client.isActive || false} onChange={(e) => setEditClient({...editClient, isActive: e.target.checked})} />} label="isActive" />
                                    
                                    </TableCell>
                                
                                <TableCell>
                                    <Button
                                     color="primary"
                                     onClick={() => {
                                        setEditClient(client);
                                        setOpenEditDialog(true);
                                    }}
                                    >Edit</Button>
                                    <Button color="error">Delete</Button>
                                    <Button 
                                        color="success" 
                                        onClick={() => {
                                            setSelectedClientId(client.clientId);
                                            setProjectDialog(true);
                                        }}
                                    >
                                        Add Project
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>

            <Paper sx={{ p: 2, mt: 2 }}>
                <Typography variant="h5" sx={{ mb: 2 }}>Projects</Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Project Name</TableCell>
                            <TableCell>Client</TableCell>
                            <TableCell>Maintenance Project</TableCell>
                            <TableCell>Project Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projects.map((project) => (
                            <TableRow key={project.projectId}>
                                <TableCell>{project.projectName}</TableCell>
                                <TableCell>{clients.find(c => c.clientId === project.clientId)?.clientName}</TableCell>
                                <TableCell>{project.isMaintenanceProject ? 'Yes' : 'No'}</TableCell>
                                <TableCell>${project.projectValue}</TableCell>
                                <TableCell>
                                    <Button 
                                        color="primary"
                                        onClick={() => {
                                            setSelectedProjectId(project.projectId);
                                            setAllocationDialog(true);
                                        }}
                                    >
                                        Allocate Resource
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button 
                                        color="primary"
                                        onClick={() => {
                                            setSelectedProjectId(project.projectId);
                                            fetchResourceAllocations(project.projectId);
                                            setResourceAllocationsDialog(true);
                                        }}
                                    >
                                        Resources On Project
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>

            <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
                <DialogTitle>Edit New Client </DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Client Name"
                        margin="normal"
                        value={editClient.clientName}
                        onChange={(e) => setEditClient({...editClient, clientName: e.target.value})}
                    />
                    <TextField
                        fullWidth
                        label="Total Amount Paid"
                        margin="normal"
                        value = {editClient.totalAmountPaid}
                        onChange={(e) => setEditClient({...editClient, totalAmountPaid: Number(e.target.value)})}
                    />
               <FormControlLabel label="IsActive" control={ <Checkbox checked={editClient.isActive || false}    onChange={(e) => setEditClient({...editClient, isActive: e.target.checked})}/> } />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
                    <Button onClick={handleEditClient} variant="contained">Add</Button>
                </DialogActions>
            </Dialog>


            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Add New Client </DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Client Name"
                        margin="normal"
                        onChange={(e) => setNewClient({...newClient, clientName: e.target.value})}
                    />
                    <TextField
                        fullWidth
                        label="Total Amount Paid"
                        margin="normal"
                        onChange={(e) => setNewClient({...newClient, totalAmountPaid: Number(e.target.value)})}
                    />
               <FormControlLabel label="IsActive" control={ <Checkbox checked={newClient.isActive || false}    onChange={(e) => setNewClient({...newClient, isActive: e.target.checked})}/> } />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={handleAddClient} variant="contained">Add</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={projectDialog} onClose={() => setProjectDialog(false)}>
                <DialogTitle>Add New Project</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Project Name"
                        margin="normal"
                        required
                        onChange={(e) => setNewProject({...newProject, projectName: e.target.value})}
                    />
                    <TextField
                        fullWidth
                        label="Project Value"
                        type="number"
                        margin="normal"
                        onChange={(e) => setNewProject({...newProject, projectValue: Number(e.target.value)})}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={newProject.isMaintenanceProject || false}
                                onChange={(e) => setNewProject({...newProject, isMaintenanceProject: e.target.checked})}
                            />
                        }
                        label="Maintenance Project"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setProjectDialog(false)}>Cancel</Button>
                    <Button onClick={handleAddProject} variant="contained">Add Project</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={allocationDialog} onClose={() => setAllocationDialog(false)}>
                <DialogTitle>Allocate Resource to Project</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Technical Resource</InputLabel>
                        <Select
                            value={newAllocation.resourceId || ''}
                            onChange={(e) => setNewAllocation({...newAllocation, resourceId: Number(e.target.value)})}
                        >
                            {technicalResources.map((resource) => (
                                <MenuItem key={resource.employeeId} value={resource.employeeId}>
                                    {resource.employeeName} - {resource.technology}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        fullWidth
                        label="Start Date"
                        type="date"
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => setNewAllocation({...newAllocation, startDate: e.target.value})}
                    />
                    <TextField
                        fullWidth
                        label="End Date"
                        type="date"
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => setNewAllocation({...newAllocation, endDate: e.target.value})}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAllocationDialog(false)}>Cancel</Button>
                    <Button onClick={handleAddAllocation} variant="contained">Allocate</Button>
                </DialogActions>
            </Dialog>

        <Dialog 
        open={resourceAllocationsDialog} 
        onClose={() => setResourceAllocationsDialog(false)}
        maxWidth="md"
        fullWidth
        >
        <DialogTitle>Project Resource Allocations</DialogTitle>
        <DialogContent>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Project ID</TableCell>
                        <TableCell>Employee ID</TableCell>
                        <TableCell>Employee Name</TableCell>
                        <TableCell>Technology</TableCell>
                        <TableCell>Salary</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Start Date</TableCell>
                        <TableCell>End Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {resourceAllocations.map((allocation) => (
                        <TableRow key={`${allocation.projectId}-${allocation.employeeId}`}>
                            <TableCell>{allocation.projectId}</TableCell>
                            <TableCell>{allocation.employeeId}</TableCell>
                            <TableCell>{allocation.employeeName}</TableCell>
                            <TableCell>{allocation.technology}</TableCell>
                            <TableCell>${allocation.salary}</TableCell>
                            <TableCell>{allocation.isActive ? 'Active' : 'Inactive'}</TableCell>
                            <TableCell>{new Date(allocation.startDate).toLocaleDateString()}</TableCell>
                            <TableCell>{new Date(allocation.endDate).toLocaleDateString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setResourceAllocationsDialog(false)}>Close</Button>
        </DialogActions>
    </Dialog>

        </Box>
    );
};

export default ClientManagement;