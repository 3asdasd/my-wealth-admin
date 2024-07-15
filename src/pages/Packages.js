import React, { useState ,useEffect} from 'react';
import Sidebar from '../components/Sidebar';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Server from "../constants/server";
import axios from 'axios';

const createData = (id, name, amount, rebate, dnt, status) => {
  return { id, name, amount, rebate, dnt, status };
};

const initialRows = [
  createData('1', 'Intro', '50', '8.0', '2334/44/44:23:44', 'Active'),
  createData('2', 'Level1', '199', '12.0', '2334/44/44:23:44', 'Inactive'),
];
const API_URL = Server.API_URL;
const Packages = () => {
  const [rows, setRows] = useState(initialRows);
  const [filter, setFilter] = useState('All');
  const [open, setOpen] = useState(false);
  const [newPackage, setNewPackage] = useState({
    id: '',
    name: '',
    minFund:'',
    maxFund:'',
    rebate: '',
    status: 'Active',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    
    const allPackagesRes = await axios.get(`${API_URL}/get_packages`);

    const data = [];
    for (let index = 0; index < allPackagesRes.data.length; index++) {
      const rowData= createData(allPackagesRes.data[index].packageID, allPackagesRes.data[index].packageName, allPackagesRes.data[index].personalMinFund, allPackagesRes.data[index].personalMaxFund, allPackagesRes.data[index].rebateFee,  'Active')
      data.push(rowData);
    }
    setRows(data);
  }
  const handleStatusChange = (id, newStatus) => {
    setRows(rows.map(row => row.id === id ? { ...row, status: newStatus } : row));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('packageName', newPackage.name);
    formData.append('personalMinFund', newPackage.minFund);
    formData.append('personalMaxFund', newPackage.maxFund);
    formData.append('rebateFee', newPackage.rebate);
    await axios.post(`${API_URL}/create_package`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    fetchData();
    // setRows([...rows, { ...newPackage, id: rows.length + 1 }]);
    handleClose();
  };

  const filteredRows = filter === 'All' ? rows : rows.filter(row => row.status === filter);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <Typography variant="h4" className="mb-6">Packages</Typography>
        <div className="flex justify-start mb-6">
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Add new Package
          </Button>
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#ID</TableCell>
                <TableCell>Package Name</TableCell>
                <TableCell>personalMinFund</TableCell>
                <TableCell>personalMaxFund</TableCell>
                <TableCell>Rebate Fee</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>{row.rebate}</TableCell>
                  <TableCell>{row.dnt}</TableCell>
                  <TableCell>
                    <Select
                      value={row.status}
                      onChange={(e) => handleStatusChange(row.id, e.target.value)}
                    >
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Inactive">Inactive</MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add New Package</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Package Name"
              type="text"
              fullWidth
              value={newPackage.name}
              onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
            />
             <TextField
              margin="dense"
              label="Personal Min Fund"
              type="number"
              fullWidth
              value={newPackage.minFund}
              onChange={(e) => setNewPackage({ ...newPackage, minFund: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Personal Max Fund"
              type="number"
              fullWidth
              value={newPackage.maxFund}
              onChange={(e) => setNewPackage({ ...newPackage, maxFund: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Rebate Fee"
              type="number"
              fullWidth
              value={newPackage.rebate}
              onChange={(e) => setNewPackage({ ...newPackage, rebate: e.target.value })}
            />
            <Select
              fullWidth
              value={newPackage.status}
              onChange={(e) => setNewPackage({ ...newPackage, status: e.target.value })}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Packages;