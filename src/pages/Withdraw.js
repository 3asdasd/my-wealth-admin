import React, { useState,useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, CardContent, MenuItem, Select } from '@mui/material';
import Server from "../constants/server";
import axios from 'axios';

const API_URL = Server.API_URL;
const Withdraw = () => {
  const [statusFilter, setStatusFilter] = useState('All');
  const rows = [
    { id: '123', userId: '049858', email: 'email@emails.com', address: '2345678987654334yhgfsrer5678722', dnt: '2334/44/44:23:44', status: 'Pending' },
    { id: '123', userId: '049858', email: 'email@emails.com', address: '2345678987654334yhgfsrer5678722', dnt: '2334/44/44:23:44', status: 'Completed' },
    { id: '123', userId: '049858', email: 'email@emails.com', address: '2345678987654334yhgfsrer5678722', dnt: '2334/44/44:23:44', status: 'Processing' },
  ];
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const allWithdrawRes = await axios.get(`${API_URL}/get_all_withdrawals`);

    const data = [];
    for (let index = 0; index < allPackagesRes.data.length; index++) {
      const rowData= createData(allPackagesRes.data[index].packageID, allPackagesRes.data[index].packageName, allPackagesRes.data[index].personalMinFund, allPackagesRes.data[index].personalMaxFund, allPackagesRes.data[index].rebateFee,  'Active')
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
          Withdraw
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Button variant="contained" onClick={() => setStatusFilter('All')}>All</Button>
          <Button variant="contained" color="warning" onClick={() => setStatusFilter('Pending')}>Pending</Button>
          <Button variant="contained" color="info" onClick={() => setStatusFilter('Processing')}>Processing</Button>
          <Button variant="contained" color="success" onClick={() => setStatusFilter('Completed')}>Completed</Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#ID</TableCell>
                <TableCell>UserID</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>DnT</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.userId}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>{row.dnt}</TableCell>
                  <TableCell>
                    <Select
                      value={row.status}
                      onChange={(e) => console.log(e.target.value)}
                    >
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Processing">Processing</MenuItem>
                      <MenuItem value="Completed">Completed</MenuItem>
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

export default Withdraw;