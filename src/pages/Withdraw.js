import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, CardContent, MenuItem, Select } from '@mui/material';
import Server from "../constants/server";
import axios from 'axios';

const API_URL = Server.API_URL;
const createData = (id, UserID, UserName, withdrawalWalletAddress, Amount, dnt, status) => {
  return { id, UserID, UserName, withdrawalWalletAddress, Amount, dnt, status };
};
const Withdraw = () => {
  const [rows, setRows] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  // const rows = [
  //   { id: '123', userId: '049858', email: 'email@emails.com', address: '2345678987654334yhgfsrer5678722', dnt: '2334/44/44:23:44', status: 'Pending' },
  //   { id: '123', userId: '049858', email: 'email@emails.com', address: '2345678987654334yhgfsrer5678722', dnt: '2334/44/44:23:44', status: 'Completed' },
  //   { id: '123', userId: '049858', email: 'email@emails.com', address: '2345678987654334yhgfsrer5678722', dnt: '2334/44/44:23:44', status: 'Processing' },
  // ];
  useEffect(() => {
    fetchData();
  }, []);



  const fetchData = async () => {
    const allWithdrawRes = await axios.get(`${API_URL}/get_all_withdrawals`);
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    console.log(allWithdrawRes.data);
    const data = [];
    for (let index = 0; index < allWithdrawRes.data.length; index++) {

      const rowData = createData(allWithdrawRes.data[index].withdrawalID, allWithdrawRes.data[index].userID, allWithdrawRes.data[index].username
        , allWithdrawRes.data[index].withdrawalWalletAddress, allWithdrawRes.data[index].amount, allWithdrawRes.data[index].dateTime, allWithdrawRes.data[index].status)
      data.push(rowData);
    }
    setRows(data);

  }
  const changeStatues = async (WithdrawelID, e) => {
    const formData = new FormData();
    formData.append('WithdrawalID', WithdrawelID);
    formData.append('status', e.target.value);
    if (e.target.value === "Approved") {
      const allDepositsRes = await axios.put(`${API_URL}/update_withdrawal_status`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq");
      console.log(allDepositsRes.data);
      if (allDepositsRes.data.code === "WITHDRAWAL_STATUS_UPDATED") {
        fetchData();
      }
    }


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
          {/* <Button variant="contained" color="info" onClick={() => setStatusFilter('Processing')}>Processing</Button> */}
          <Button variant="contained" color="success" onClick={() => setStatusFilter('Approved')}>Approved</Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#ID</TableCell>
                <TableCell>UserID</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>DnT</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.UserID}</TableCell>
                  <TableCell>{row.UserName}</TableCell>
                  <TableCell>{row.withdrawalWalletAddress}</TableCell>
                  <TableCell>{row.Amount}</TableCell>
                  <TableCell>{row.dnt}</TableCell>
                  <TableCell>
                    <Select
                      value={row.status}
                      onChange={(e) => {
                        changeStatues(row.id, e);
                        console.log(e.target.value)
                      }}
                    >
                      <MenuItem value="Pending">Pending</MenuItem>

                      <MenuItem value="Approved">Approved</MenuItem>
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