// // import React, { useState, useEffect } from "react";
// // import { Container, Typography, Grid, Paper } from "@mui/material";
// // import ExpenseForm from "../components/ExpenseForm";
// // import { getExpenses, addExpense, getNetWorth } from "../utils/api";

// // const Dashboard = () => {
// //   const [expenses, setExpenses] = useState([]);
// //   const [netWorth, setNetWorth] = useState(0);

// //   useEffect(() => {
// //     fetchExpenses();
// //     fetchNetWorth();
// //   }, []);

// //   const fetchExpenses = async () => {
// //     const expensesData = await getExpenses();
// //     setExpenses(expensesData);
// //   };

// //   const fetchNetWorth = async () => {
// //     const netWorthData = await getNetWorth();
// //     setNetWorth(netWorthData.netWorth);
// //   };

// //   const handleAddExpense = async (expenseData) => {
// //     await addExpense(expenseData);
// //     fetchExpenses();
// //     fetchNetWorth();
// //   };

// //   return (
// //     <Container>
// //       <Typography variant="h4">Dashboard</Typography>
// //       <Grid container spacing={3}>
// //         <Grid item xs={12} md={6}>
// //           <Paper sx={{ p: 2 }}>
// //             <Typography variant="h6">Add Expense/Income</Typography>
// //             <ExpenseForm onSubmit={handleAddExpense} />
// //           </Paper>
// //         </Grid>
// //         <Grid item xs={12} md={6}>
// //           <Paper sx={{ p: 2 }}>
// //             <Typography variant="h6">Net Worth</Typography>
// //             <Typography variant="h4">${netWorth.toFixed(2)}</Typography>
// //           </Paper>
// //         </Grid>
// //         <Grid item xs={12}>
// //           <Paper sx={{ p: 2 }}>
// //             <Typography variant="h6">Recent Transactions</Typography>
// //             {expenses.map((expense) => (
// //               <Typography key={expense._id}>
// //                 {expense.description}: ${expense.amount} ({expense.type})
// //               </Typography>
// //             ))}
// //           </Paper>
// //         </Grid>
// //       </Grid>
// //     </Container>
// //   );
// // };

// // export default Dashboard;

// import React, { useState, useEffect } from "react";
// import { Container, Typography, Grid, Paper } from "@mui/material";
// import ExpenseForm from "../components/ExpenseForm";
// import { getExpenses, addExpense, getNetWorth } from "../utils/api";

// const Dashboard = () => {
//   const [expenses, setExpenses] = useState([]);
//   const [netWorth, setNetWorth] = useState(0);

//   useEffect(() => {
//     fetchExpenses();
//     fetchNetWorth();
//   }, []);

//   const fetchExpenses = async () => {
//     try {
//       const response = await getExpenses();
//       // Ensure response.data is an array if expecting an array
//       setExpenses(response.data || []);
//     } catch (error) {
//       console.error("Error fetching expenses:", error);
//       setExpenses([]); // Set to empty array or handle error state
//     }
//   };

//   const fetchNetWorth = async () => {
//     try {
//       const response = await getNetWorth();
//       // Assuming response.data.netWorth is the correct property to set
//       setNetWorth(parseFloat(response.data.netWorth || 0));
//     } catch (error) {
//       console.error("Error fetching net worth:", error);
//       setNetWorth(0); // Set to default value or handle error state
//     }
//   };

//   const handleAddExpense = async (expenseData) => {
//     try {
//       await addExpense(expenseData);
//       fetchExpenses();
//       fetchNetWorth();
//     } catch (error) {
//       console.error("Error adding expense:", error);
//       // Handle error state or message accordingly
//     }
//   };

//   return (
//     <Container>
//       <Typography variant="h4">Dashboard</Typography>
//       <Grid container spacing={3}>
//         <Grid item xs={12} md={6}>
//           <Paper sx={{ p: 2 }}>
//             <Typography variant="h6">Add Expense/Income</Typography>
//             <ExpenseForm onSubmit={handleAddExpense} />
//           </Paper>
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <Paper sx={{ p: 2 }}>
//             <Typography variant="h6">Net Worth</Typography>
//             <Typography variant="h4">${netWorth.toFixed(2)}</Typography>
//           </Paper>
//         </Grid>
//         <Grid item xs={12}>
//           <Paper sx={{ p: 2 }}>
//             <Typography variant="h6">Recent Transactions</Typography>
//             {expenses.length > 0 ? (
//               expenses.map((expense) => (
//                 <Typography key={expense._id}>
//                   {expense.description}: ${expense.amount} ({expense.type})
//                 </Typography>
//               ))
//             ) : (
//               <Typography>No transactions yet.</Typography>
//             )}
//           </Paper>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Paper, Box } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import ExpenseForm from "../components/ExpenseForm";
import { getExpenses, addExpense, getNetWorth } from "../utils/api";

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
      </Grid>
    </Container>
  );
};

export default Dashboard;