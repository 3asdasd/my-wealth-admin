import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem } from '@mui/material';

const Users = () => {
  const [statusFilter, setStatusFilter] = useState('All');
  
  const rows = [
    { id: '001', name: 'John Doe', email: 'john.doe@example.com', role: 'Admin', status: 'Active' },
    { id: '002', name: 'Jane Smith', email: 'jane.smith@example.com', role: 'User', status: 'Inactive' },
    { id: '003', name: 'Sam Johnson', email: 'sam.johnson@example.com', role: 'User', status: 'Pending' },
  ];

  const filteredRows = statusFilter === 'All' ? rows : rows.filter(row => row.status === statusFilter);

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Users
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Button variant="contained" onClick={() => setStatusFilter('All')}>All</Button>
          <Button variant="contained" color="success" onClick={() => setStatusFilter('Active')}>Active</Button>
          <Button variant="contained" color="error" onClick={() => setStatusFilter('Inactive')}>Inactive</Button>
          <Button variant="contained" color="warning" onClick={() => setStatusFilter('Pending')}>Pending</Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell>
                    <Select
                      value={row.status}
                      onChange={(e) => console.log(e.target.value)}
                    >
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Inactive">Inactive</MenuItem>
                      <MenuItem value="Pending">Pending</MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Users;