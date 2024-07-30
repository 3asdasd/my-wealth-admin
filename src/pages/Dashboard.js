import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Box, Typography, Card, CardContent, Grid, Paper } from '@mui/material';
import axios from 'axios';

import Server from "../constants/server";

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const API_URL = Server.API_URL;
    const allFunding = await axios.get(`${API_URL}/all_funding_balance`);
    const allSpot = await axios.get(`${API_URL}/users_spot_balance`);
    const allTotal = await axios.get(`${API_URL}/users_total_balance`);
    const rtFunding = await axios.get(`${API_URL}/rt_funding_balance`);
    const rtSpot = await axios.get(`${API_URL}/rt_users_spot_balance`);
    const rtTotal = await axios.get(`${API_URL}/all_rt_users_balance`);
    const allUsers = await axios.get(`${API_URL}/get_all_users`);

    const resdata = [
      { title: 'Funding Bal.', value: allFunding.data["Total Funding Balance"], subtitle: 'Total balance - $' + allTotal.data["total_balance"] },
      { title: 'Spot Bal.', value: allSpot.data["total_spot_balance"], subtitle: 'Total balance - $' + allTotal.data["total_balance"] },
      // { title: 'Pending req.', value: '200', subtitle: 'Total withdraws - $10000.00' },
      // { title: 'Completed req.', value: '34678', subtitle: 'Total Users - '+allUsers.data.users.length },
      // { title: 'Active Users', value: '200', subtitle: 'Total Users - '+allUsers.data.users.length },
      // { title: 'Inactive Users', value: '34678', subtitle: 'Total Trades count - 10000' },
    ];
    setData(resdata);
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Grid container spacing={3}>
          {data.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', color: 'white', backdropFilter: 'blur(10px)' }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {item.value}
                  </Typography>
                  <Typography variant="body2">
                    {item.title}
                  </Typography>
                  <Typography variant="caption">
                    {item.subtitle}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Paper sx={{ mt: 5, p: 3, textAlign: 'center' }}>
          <Typography variant="h6">
            Welcome to the Dashboard
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Here you can find an overview of all the important metrics and activities.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;