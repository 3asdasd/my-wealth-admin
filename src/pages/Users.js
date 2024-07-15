import React, { useState,useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Server from "../constants/server";
import axios from 'axios';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem } from '@mui/material';
import { RowingOutlined } from '@mui/icons-material';

const Users = () => {
  const [statusFilter, setStatusFilter] = useState('All');
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const API_URL = Server.API_URL;
    const allUsersRes = await axios.get(`${API_URL}/get_all_users`);

    const data = [];
    for (let index = 0; index < allUsersRes.data.users.length; index++) {
      const user = allUsersRes.data.users[index];
      const rowData = {
        id: user.userID,
        name: user.name,
        email: user.email,
        role: 'User',
        status: 'Active'
      };
      data.push(rowData);
    }
    setRows(data);
  }
  
 

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