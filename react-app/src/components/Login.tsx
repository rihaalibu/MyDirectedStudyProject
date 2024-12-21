import React, { useState } from 'react';
import { replace, useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import axios from 'axios';
import { createAuthenticatedAxios } from '../utils/api';

// const axiosI = axios.create({
//   baseURL: 'http://localhost:8080/',
//   timeout: 1000,
//   headers: {
//     'Content-Type': 'application/json',
//     'Access-Control-Allow-Origin':  '*',
//     'Authorization': `Bearer ${localStorage.getItem('token')}`
//   }
// });
const httpClient = createAuthenticatedAxios();

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        
        try {
            const response = await httpClient.post('/api/auth/login', credentials);
            if (response.data.token) {
                
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('token', response.data.token);
                //localStorage.setItem('user', JSON.stringify(response.data.user));
                navigate('/dashboard', {replace : true});   
            }
        } catch (err) {
            setError(`Invalid credentials. Please try again.${err}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box sx={{ 
            height: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            bgcolor: '#f5f5f5'
        }}>
            <Paper sx={{ p: 4, width: 300, boxShadow: 3 }}>
                <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
                    HR Management System
                </Typography>
                <form onSubmit={handleLogin}>
                    {error && (
                        <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
                            {error}
                        </Typography>
                    )}
                    <TextField
                        fullWidth
                        label="Username"
                        margin="normal"
                        value={credentials.username}
                        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                        required
                        autoFocus
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        margin="normal"
                        value={credentials.password}
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                        required
                    />
                    <Button 
                        fullWidth 
                        variant="contained" 
                        sx={{ mt: 3 }}
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default Login;