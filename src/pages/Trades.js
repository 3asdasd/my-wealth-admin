
import React, { useState, useEffect } from 'react';
import Switch, { SwitchProps } from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import { FormControlLabel, Box, Typography, Card, CardContent, Grid } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Server from "../constants/server";
import axios from 'axios';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, TextField, FormControl, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


export default function Trades() {
  const API_URL = Server.API_URL;
  const [nowTrade, setNowTrade] = useState([]);
  const [rows, setRows] = useState([]);
  const [tradeBalance, setTradeBalance] = useState(0);
  const [tradeUsers, setTradeUsers] = useState(0);
  const [packages, setPackage] = useState([""]);
  const [checked, setChecked] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [profitLoss, setProfitLoss] = React.useState('Profit');
  const [shareType, setShareType] = React.useState('Custom');
  const [amounts, setAmounts] = useState(Array((packages.length) - 1).fill(''));
  const [shareAmounts, setShareAmounts] = useState([]);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const allPackagesRes = await axios.get(`${API_URL}/get_packages`);
    const tradeUsers = await axios.get(`${API_URL}/rt_users_trade_balance`);
    const allTrades = await axios.get(`${API_URL}/getAll_trade`);
    const data = [];
    for (let index = 0; index < allTrades.data.length; index++) {
      const rowData = { id: allTrades.data[index].tradeID, tradeDateTime: allTrades.data[index].datetime, amount: allTrades.data[index].amount, status: (allTrades.data[index].trade_on_off) ? 'Active' : 'Complete' };
      if (allTrades.data[index].trade_on_off) {
        setNowTrade(allTrades.data[index]);
        setChecked(true);
      }
      data.push(rowData);
    }
    setRows(data);
    setTradeBalance(tradeUsers.data.total_trade_balance);
    setTradeUsers(tradeUsers.data.trade_users.length);
    setPackage(allPackagesRes.data);
  }

  const handleOnOff = (event) => {
    if (event.target.checked === false) {
      handleOpen();
    } else {
      addTrade();
    }
  };

  const addTrade = async () => {
    const formData = new FormData();
    formData.append('Amount', tradeBalance);
    await axios.post(`${API_URL}/create_trade`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((r) => {
        if (r.data.code === 201) {
          setChecked(true);
          fetchData();
        }
      })
      .catch(() => {
        console.log('error');
      });
  }

  const handleProfitLossChange = (event) => {
    setProfitLoss(event.target.value);
    if (event.target.value === 'Loss') {
      setShareType("Custom");
    }
  };
  const handleShareTypeChange = (event) => {
    setShareType(event.target.value);
  };
  const handleAmountChange = (event, index, packageID) => {
    let thisJson = {
      'packageID': packageID,
      'amount': event.target.value
    }
    const newAmounts = [...amounts];
    newAmounts[index] = event.target.value;
    const newShareAmounts = [...shareAmounts];
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    console.log(newShareAmounts);
    newShareAmounts[index] = thisJson;
    console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
    console.log(newShareAmounts);
    setAmounts(newAmounts);
    setShareAmounts(newShareAmounts);
  };

  const handleSubmit = () => {
    console.log(profitLoss, shareType, amounts);
    console.log('Amounts:', amounts);
    setIsValid(true);
    let testIsValid = true;
    if (shareType === 'Custom') {
      const doubleRegex = /^[+-]?(?:\d+\.?\d*|\.\d+)$/;
      if (amounts.length === 0) {
        setIsValid(false);
        testIsValid = false;
      }

      for (let index = 0; index < amounts.length - 1; index++) {
        if (doubleRegex.test(amounts[index])) {
          setIsValid(true);
          testIsValid = true;
        } else {
          console.log('kkkkkkkkkkkkkkkkkkk:', amounts[index]);
          setIsValid(false);
          testIsValid = false;

          break;
        }

      }
    }

    if (testIsValid) {
      addProfit();
      setAmounts(Array((packages.length) - 1).fill(''))
      setChecked(false);
      setOpen(false);
    }
  };

  const addProfit = async () => {
    const formData = new FormData();
    formData.append('TradeID', nowTrade.tradeID);
    formData.append('shareAmount', JSON.stringify(shareAmounts));
    // formData.append('shareAmount', shareAmounts);
    formData.append('profitType', profitLoss);
    formData.append('shareType', shareType);
    await axios.post(`${API_URL}/add_profit`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((r) => {
        console.log("1111111111111111111111111111111111111");
        console.log(r.data);
        if (r.data.code === 200) {
          console.log(r.data);
          fetchData();
        }
      })
      .catch(() => {
        console.log('error');
      });
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);




  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Trades
        </Typography>
        <Grid container spacing={3}>
          <Grid item sm={6} >
            <Card sx={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', color: 'white', backdropFilter: 'blur(10px)' }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {tradeBalance}
                </Typography>
                <Typography variant="body2">
                  Total Trade Balance
                </Typography>
                <Typography variant="caption">
                  Trade Users :- {tradeUsers}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item sm={6}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography>Off</Typography>
              <Switch
                checked={checked}
                onChange={handleOnOff}
                inputProps={{ 'aria-label': 'controlled' }}
              />
              <Typography>On</Typography>
            </Stack>
          </Grid>

        </Grid>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#ID</TableCell>
                <TableCell>Trade Date&Time</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.tradeDateTime}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Modal
          open={open}
          // scroll={true}
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
              overflowY: 'auto',
              maxHeight: '80vh',
              p: 4,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography id="modal-title" variant="h6" component="h2">
                Add Profit/Loss
              </Typography>

              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>

            <FormControl fullWidth variant="outlined" sx={{ mt: 2, mb: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormLabel id="demo-radio-buttons-group-label">Profit or loss?</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="Profit"
                    name="radio-buttons-group"
                    value={profitLoss}
                    onChange={handleProfitLossChange}
                  >
                    <FormControlLabel value="Profit" control={<Radio />} label="Profit" />
                    <FormControlLabel value="Loss" control={<Radio />} label="Loss" />

                  </RadioGroup>
                </Grid>
                <Grid item xs={6}>
                  <FormLabel id="demo-radio-buttons-group-label">Share Type</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"

                    name="radio-buttons-group"
                    value={shareType}
                    onChange={handleShareTypeChange}
                  >
                    {profitLoss === 'Profit' ? (
                      <>
                        <FormControlLabel value="Default" control={<Radio />} label="Default" />
                      </>
                    ) : null}

                    <FormControlLabel value="Custom" control={<Radio />} label="Custom" />

                  </RadioGroup>
                </Grid>

              </Grid>
              {shareType === 'Custom' ? (

                <>

                  {packages.map((pack, index) => {
                    return pack.personalMaxFund > 50 ? (
                      <TextField
                        key={index}
                        fullWidth
                        size="small"
                        variant="outlined"
                        label={`Input Trade Amount for ${pack.packageName}`}
                        value={amounts[index - 1]}
                        onChange={(event) => handleAmountChange(event, index - 1, pack.packageID)}
                        sx={{ mb: 2 }}
                      />
                    ) : null

                  }
                  )}
                </>
              ) : null}

            </FormControl>
            {isValid ? null : (<Typography sx={{ color: 'red' }}>invalid input</Typography>)}
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              fullWidth
            >
              Add
            </Button>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
}