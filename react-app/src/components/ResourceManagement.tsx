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
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Checkbox,
    FormControlLabel,
    Hidden
} from '@mui/material';
import axios from 'axios';
import { createAuthenticatedAxios } from '../utils/api';

interface Employee {
    employeeId: number;
    employeeName: string;
    technology: string;
    // projectID: number;
    isActive: boolean;
    salary: number;
    ProjectAllocations: [];

};

const ResourceManagement = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [newEmployee, setNewEmployee] = useState<Partial<Employee>>({
        employeeName: '',
        technology: '',
        // projectID: 0,
        isActive: true,
        salary: 0,
        ProjectAllocations: []
    });
    const [editEmployee, setEditEmployee] = useState<Partial<Employee>>({
        employeeName: '',
        technology: '',
        // projectID: 0,
        isActive: true,
        salary: 0,
        ProjectAllocations: []
    });
    
    // const httpClient = axios.create(
    //     {
    //         baseURL: 'http://localhost:8080',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Access-Control-Allow-Origin':  '*',
    //             'Authorization': `Bearer ${localStorage.getItem('token')}`
    //         }
    //     }
    // );
    const httpClient = createAuthenticatedAxios();
    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await httpClient.get('/api/technicalresource');
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const handleAddEmployee = async () => {
        try {
             console.log(newEmployee);
            await httpClient.post('/api/technicalresource', newEmployee);
            fetchEmployees();
            setOpenDialog(false);
            setNewEmployee({});
        } catch (error) {
            console.error('Error adding employee:', error);
        }
    };
    const handleEditEmployee = async () => {
        try {
            await httpClient.put(`/api/technicalresource/${editEmployee.employeeId}`, editEmployee);
            fetchEmployees();
            setOpenEditDialog(false);
            setEditEmployee({});
        } catch (error) {
            console.error('Error editing employee:', error);
        }
    };

    const handleDeleteEmployee = async (employeeId: number) => {
        try {
            await httpClient.delete(`/api/technicalresource/${employeeId}`);
            fetchEmployees();
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };
    return (
        <Box>
            <Paper sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4">Resource Management</Typography>
                <Button variant="contained" onClick={() => setOpenDialog(true)}>
                    Add New Resource
                </Button>
            </Paper>

            <Paper sx={{ p: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Technology</TableCell>
                            {/* <TableCell>Project ID</TableCell> */}
                            <TableCell>Salary</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map((employee) => (
                            <TableRow key={employee.employeeId}>
                                <TableCell>{employee.employeeId}</TableCell>
                                <TableCell>{employee.employeeName}</TableCell>
                                <TableCell>{employee.technology}</TableCell>
                                {/* <TableCell>{employee.projectID}</TableCell> */}
                                <TableCell>${employee.salary}</TableCell>
                                <TableCell>
                                    <Button
                                     color="primary"
                                     onClick = {() => {
                                        setEditEmployee(employee);
                                        setOpenEditDialog(true);
                                        console.log('Edit clicked for employee ID:', employee.employeeId);
                                    }}
                                    >Edit</Button>
                                    <Button
                                     color="error"
                                     onClick = {() => {
                                      handleDeleteEmployee(employee.employeeId);
                                    }}
                                     >Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Add New Resource</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Employee Name"
                        margin="normal"
                        onChange={(e) => setNewEmployee({...newEmployee, employeeName: e.target.value})}
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Technology</InputLabel>
                        <Select
                            value={newEmployee.technology || ''}
                            onChange={(e) => setNewEmployee({...newEmployee, technology: e.target.value})}
                        >
                            <MenuItem value="React">React</MenuItem>
                            <MenuItem value="React">React</MenuItem>
                            <MenuItem value="Node.js">Node.js</MenuItem>
                            <MenuItem value="Python">Python</MenuItem>
                            <MenuItem value="Java">Java</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        fullWidth
                        label="Salary"
                        type="number"
                        margin="normal"
                        onChange={(e) => setNewEmployee({...newEmployee, salary: Number(e.target.value)})}
                    />
                    
                <FormControlLabel control={<Checkbox checked={newEmployee.isActive || false} onChange={(e) => setNewEmployee({...newEmployee, isActive: e.target.checked})} />} label="isActive" />                        
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={handleAddEmployee} variant="contained">Add</Button>
                </DialogActions>
            </Dialog>
            {/*This is the edit dialog */}
            <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
                <DialogTitle>Edit Resource</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Employee Name"
                        margin="normal"
                        value={editEmployee.employeeName}
                        onChange={(e) => setEditEmployee({...editEmployee, employeeName: e.target.value})}
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Technology</InputLabel>
                        <Select
                            value={editEmployee.technology || ''}
                            onChange={(e) => setEditEmployee({...editEmployee, technology: e.target.value})}
                        >
                            <MenuItem value={editEmployee.technology}>{editEmployee.technology}</MenuItem>
                            <MenuItem value="React">React</MenuItem>
                            <MenuItem value="Node.js">Node.js</MenuItem>
                            <MenuItem value="Python">Python</MenuItem>
                            <MenuItem value="Java">Java</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        fullWidth
                        label="Salary"
                        type="number"
                        margin="normal"
                        value={editEmployee.salary}
                        onChange={(e) => setEditEmployee({...editEmployee, salary: Number(e.target.value)})}
                    />
                    
                <FormControlLabel 
                control={<Checkbox checked={editEmployee.isActive || false} 
                onChange={(e) => setEditEmployee({...editEmployee, isActive: e.target.checked})} />} 
                label="isActive" />                        
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
                    <Button onClick={handleEditEmployee} variant="contained">Edit</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ResourceManagement;
