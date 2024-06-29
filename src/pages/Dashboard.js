

import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Paper, Box } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import ExpenseForm from "../components/ExpenseForm";
import { getExpenses, addExpense, getNetWorth } from "../utils/api";
import AchievementList from "../components/AchievementList";
import Leaderboard from "../components/Leaderboard";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [netWorth, setNetWorth] = useState(0);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchExpenses();
    fetchNetWorth();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await getExpenses();
      setExpenses(response.data || []);
      prepareChartData(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const fetchNetWorth = async () => {
    try {
      const response = await getNetWorth();
      setNetWorth(parseFloat(response.data.netWorth || 0));
    } catch (error) {
      console.error("Error fetching net worth:", error);
    }
  };

  const prepareChartData = (expensesData) => {
    const data = expensesData.slice(-7).map(expense => ({
      date: new Date(expense.date).toLocaleDateString(),
      amount: expense.type === 'income' ? expense.amount : -expense.amount
    }));
    setChartData(data);
  };

  const handleAddExpense = async (expenseData) => {
    try {
      await addExpense(expenseData);
      fetchExpenses();
      fetchNetWorth();
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Financial Overview
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Net Worth
            </Typography>
            <Typography component="p" variant="h4">
              ${parseFloat(netWorth).toFixed(2)}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Add Expense/Income
            </Typography>
            <ExpenseForm onSubmit={handleAddExpense} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Recent Transactions
            </Typography>
            {expenses.slice(-5).map((expense) => (
              <Box
                key={expense._id}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 1,
                  p: 1,
                  bgcolor: expense.type === 'income' ? 'success.light' : 'error.light',
                  borderRadius: 1,
                }}
              >
                <Typography>{expense.description}</Typography>
                <Typography>
                  {expense.type === 'income' ? '+' : '-'}${expense.amount.toFixed(2)}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Achievements
            </Typography>
            <AchievementList />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Leaderboard
            </Typography>
            <Leaderboard />
          </Paper>
        </Grid>
      </Grid>
      
    </Container>
  );
};

export default Dashboard;