import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Server from "../constants/server";
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const createData = (id, name, minFund, maxFund, rebate) => {
  return { id, name, minFund, maxFund, rebate };
};

const initialRows = [
  createData('1', 'Intro', '50', '8.0', '2334/44/44:23:44', 'Active'),
  createData('2', 'Level1', '199', '12.0', '2334/44/44:23:44', 'Inactive'),
];
const API_URL = Server.API_URL;
const Packages = () => {
  const [rows, setRows] = useState(initialRows);
  const [deletePackageId, setDeletePackageId] = useState('');
  const [open, setOpen] = useState(false);
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [editAlertOpen, setEditAlertOpen] = useState(false);
  const [newPackage, setNewPackage] = useState({
    id: '',
    name: '',
    minFund: '',
    maxFund: '',
    rebate: '',
  });
  const [editPackage, setEditPackage] = useState({
    id: '',
    name: '',
    minFund: '',
    maxFund: '',
    rebate: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    const allPackagesRes = await axios.get(`${API_URL}/get_packages`);

    const data = [];
    for (let index = 0; index < allPackagesRes.data.length; index++) {
      const rowData = createData(allPackagesRes.data[index].packageID, allPackagesRes.data[index].packageName, allPackagesRes.data[index].personalMinFund, allPackagesRes.data[index].personalMaxFund, allPackagesRes.data[index].rebateFee)
      data.push(rowData);
    }
    setRows(data);
  }


  const handleDelete = async () => {
    setDeleteAlertOpen(false);
    try {
      let id = deletePackageId;
      if (!id) {
        console.error("Package ID is undefined or null");
        return;
      }

      console.log("Deleting package with ID:", id);

      const deleteRes = await axios.delete(`${API_URL}/package_delete/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log("Package deleted successfully:", deleteRes.data);

      if (deleteRes.status === 200) {
        fetchData();
      } else {
        console.error("Deletion failed:", deleteRes.statusText);
      }
    } catch (error) {
      console.error("An error occurred while deleting the package:", error.response ? error.response.data : error.message);
    }
  };



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteAlertOpen = () => {
    setDeleteAlertOpen(true);
  };

  const handleDeleteAlertClose = () => {
    setDeleteAlertOpen(false);
  };

  const handleEditAlertOpen = () => {
    setEditAlertOpen(true);
  };

  const handleEditAlertClose = () => {
    setEditAlertOpen(false);
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
    setNewPackage({
      id: '',
      name: '',
      minFund: '',
      maxFund: '',
      rebate: '',
    });
    // setRows([...rows, { ...newPackage, id: rows.length + 1 }]);
    handleClose();
  };

  const handleEdit = async () => {
    const formData = new FormData();
    formData.append('packageID', editPackage.id);
    formData.append('packageName', editPackage.name);
    formData.append('personalMinFund', editPackage.minFund);
    formData.append('personalMaxFund', editPackage.maxFund);
    formData.append('rebateFee', editPackage.rebate);
    await axios.put(`${API_URL}/update_package`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    fetchData();
    setEditPackage({
      id: '',
      name: '',
      minFund: '',
      maxFund: '',
      rebate: '',
    });
    handleEditAlertClose();
  };



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
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.minFund}</TableCell>
                  <TableCell>{row.maxFund}</TableCell>
                  <TableCell>{row.rebate}</TableCell>
                  <TableCell>
                    <IconButton aria-label="delete" color="error" onClick={() => {
                      setDeletePackageId(row.id);
                      handleDeleteAlertOpen();
                    }}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="edit" onClick={() => {
                      setEditPackage({
                        id: row.id,
                        name: row.name,
                        minFund: row.minFund,
                        maxFund: row.maxFund,
                        rebate: row.rebate,
                      })
                      handleEditAlertOpen();
                    }}>
                      <EditIcon />
                    </IconButton>


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
        <Dialog
          open={deleteAlertOpen}
          onClose={handleDeleteAlertClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are You sure you want to delete this package?"}
          </DialogTitle>

          <DialogActions>
            <Button onClick={handleDeleteAlertClose}>Cancel</Button>
            <Button onClick={handleDelete} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={editAlertOpen} onClose={handleEditAlertClose}>
          <DialogTitle>Edit Package</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Package Name"
              type="text"
              fullWidth
              value={editPackage.name}
              onChange={(e) => setEditPackage({ ...editPackage, name: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Personal Min Fund"
              type="number"
              fullWidth
              value={editPackage.minFund}
              onChange={(e) => setEditPackage({ ...editPackage, minFund: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Personal Max Fund"
              type="number"
              fullWidth
              value={editPackage.maxFund}
              onChange={(e) => setEditPackage({ ...editPackage, maxFund: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Rebate Fee"
              type="number"
              fullWidth
              value={editPackage.rebate}
              onChange={(e) => setEditPackage({ ...editPackage, rebate: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditAlertClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleEdit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Packages;