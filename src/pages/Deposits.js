import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem } from '@mui/material';
import Server from "../constants/server";
import axios from 'axios';
const API_URL = Server.API_URL;

const createData = (id, UserID, UserName, Amount, dnt, status) => {
  return { id, UserID, UserName, Amount, dnt, status };
};
const Deposits = () => {
  const [rows, setRows] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');

  // const rows = [
  //   { id: '123', userId: '049858', email: 'email@emails.com', address: '2345678987654334yhgfsrer5678722', dnt: '2334/44/44:23:44', status: 'Pending' },
  //   { id: '124', userId: '049859', email: 'email2@emails.com', address: '2345678987654334yhgfsrer5678722', dnt: '2334/44/44:23:44', status: 'Completed' },
  //   { id: '125', userId: '049860', email: 'email3@emails.com', address: '2345678987654334yhgfsrer5678722', dnt: '2334/44/44:23:44', status: 'Processing' },
  // ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    const allDepositsRes = await axios.get(`${API_URL}/get_all_deposits`);

    const data = [];
    for (let index = 0; index < allDepositsRes.data.length; index++) {

      const rowData = createData(allDepositsRes.data[index].DepositID, allDepositsRes.data[index].UserID, allDepositsRes.data[index].UserName
        , allDepositsRes.data[index].Amount, allDepositsRes.data[index].dateTime, allDepositsRes.data[index].Status)
      data.push(rowData);
    }
    setRows(data);
  }
  const changeStatues = async (DepositID, e) => {
    const formData = new FormData();
    formData.append('DepositID', DepositID);
    formData.append('status', e.target.value);
    if (e.target.value === "Approved") {
      const allDepositsRes = await axios.put(`${API_URL}/update_deposit_status`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (allDepositsRes.data.code === "DEPOSIT_STATUS_UPDATED") {
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
          Deposits
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
                <TableCell>Username</TableCell>
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

export default Deposits;