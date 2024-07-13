import React from 'react';
import Sidebar from '../components/Sidebar';
import { Box, Typography, Card, CardContent, Grid, Paper } from '@mui/material';

const Dashboard = () => {
  const data = [
    { title: 'Funding Bal.', value: '12345678', subtitle: 'Total balance - $10000.00' },
    { title: 'Spot Bal.', value: '12345678', subtitle: 'Total balance - $10000.00' },
    { title: 'Pending req.', value: '200', subtitle: 'Total withdraws - $10000.00' },
    { title: 'Completed req.', value: '34678', subtitle: 'Total Users - 10000' },
    { title: 'Active Users', value: '200', subtitle: 'Total Users - 10000' },
    { title: 'Inactive Users', value: '34678', subtitle: 'Total Trades count - 10000' },
  ];

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