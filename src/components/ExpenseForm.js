// import React, { useState } from "react";
// import {
//   TextField,
//   Button,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Box,
// } from "@mui/material";

// const ExpenseForm = ({ onSubmit }) => {
//   const [formData, setFormData] = useState({
//     amount: "",
//     type: "expense",
//     description: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//     setFormData({ amount: "", type: "expense", description: "" });
//   };

//   return (
//     <Box
//       component="form"
//       onSubmit={handleSubmit}
//       sx={{ "& > :not(style)": { m: 1 } }}
//     >
//       <TextField
//         fullWidth
//         label="Amount"
//         name="amount"
//         type="number"
//         value={formData.amount}
//         onChange={handleChange}
//         required
//       />
//       <FormControl fullWidth>
//         <InputLabel>Type</InputLabel>
//         <Select name="type" value={formData.type} onChange={handleChange}>
//           <MenuItem value="expense">Expense</MenuItem>
//           <MenuItem value="income">Income</MenuItem>
//         </Select>
//       </FormControl>
//       <TextField
//         fullWidth
//         label="Description"
//         name="description"
//         value={formData.description}
//         onChange={handleChange}
//       />
//       <Button type="submit" variant="contained" color="primary">
//         Add {formData.type}
//       </Button>
//     </Box>
//   );
// };

// export default ExpenseForm;

import React, { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Grid,
} from "@mui/material";

const ExpenseForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    amount: "",
    type: "expense",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ amount: "", type: "expense", description: "" });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Amount"
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="type-label">Type</InputLabel>
              <Select
                labelId="type-label"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <MenuItem value="expense">Expense</MenuItem>
                <MenuItem value="income">Income</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add {formData.type}
            </Button>
          </Grid>
        </Grid>
      </Box>
    );
  };
  
  export default ExpenseForm;