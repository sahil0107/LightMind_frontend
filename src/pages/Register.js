// import React, { useState } from "react";
// import { Container, Typography, TextField, Button, Box } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { register } from "../utils/api";

// const Register = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     age: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await register(formData);
//       navigate("/login");
//     } catch (err) {
//       console.error(err);
//       // Handle registration error (e.g., display error message)
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Typography variant="h4">Register</Typography>
//       <Box
//         component="form"
//         onSubmit={handleSubmit}
//         sx={{ "& > :not(style)": { m: 1 } }}
//       >
//         <TextField
//           fullWidth
//           label="Name"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />
//         <TextField
//           fullWidth
//           label="Email"
//           name="email"
//           type="email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />
//         <TextField
//           fullWidth
//           label="Password"
//           name="password"
//           type="password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//         />
//         <TextField
//           fullWidth
//           label="Age"
//           name="age"
//           type="number"
//           value={formData.age}
//           onChange={handleChange}
//           required
//         />
//         <Button type="submit" variant="contained" color="primary">
//           Register
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default Register;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, TextField, Button, Box, Paper } from "@mui/material";
import { register } from "../utils/api";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("formData", formData);
      await register(formData);
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Register
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;