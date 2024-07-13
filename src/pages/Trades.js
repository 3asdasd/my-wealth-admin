import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, TextField, MenuItem, Select, FormControl, InputLabel, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

const Trades = () => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('Active');
  const [amount, setAmount] = useState('');
  const rows = [
    { id: '0002', tradeDateTime: '2024/05/23-23:23', amount: '$1234555', tStatus: '-', tsAmount: '-', status: 'Active' },
    { id: '0001', tradeDateTime: '2024/05/23-23:23', amount: '$1234555', tStatus: 'Profit', tsAmount: '$22344', status: 'Complete' },
  ];

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSubmit = () => {
    // Add logic to handle trade creation
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Trades
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpen}
          sx={{ mb: 3 }}
        >
          Create New Trade
        </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#ID</TableCell>
                <TableCell>Trade Date&Time</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>T.Status</TableCell>
                <TableCell>T.S.Amount</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.tradeDateTime}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>{row.tStatus}</TableCell>
                  <TableCell>{row.tsAmount}</TableCell>
                  <TableCell>{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography id="modal-title" variant="h6" component="h2">
                Create New Trade
              </Typography>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            <FormControl fullWidth variant="outlined" sx={{ mt: 2, mb: 2 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                onChange={handleStatusChange}
                label="Status"
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              variant="outlined"
              label="Input Trade Entering Amount"
              value={amount}
              onChange={handleAmountChange}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              fullWidth
            >
              Create
            </Button>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default Trades;