// import React, { useState } from "react";
// import { Container, Typography, TextField, Button, Box } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { login } from "../utils/api";
// import { setAuthToken } from "../utils/auth";

// const Login = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const data = await login(formData);
//       console.log("Login response:", data); // Add this line
//       console.log("token response:", data.data.token); // Add this line
//       setAuthToken(data.data.token);
//       navigate("/dashboard");
//     } catch (err) {
//       console.error(err);
//       // Handle login error (e.g., display error message)
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Typography variant="h4">Login</Typography>
//       <Box
//         component="form"
//         onSubmit={handleSubmit}
//         sx={{ "& > :not(style)": { m: 1 } }}
//       >
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
//         <Button type="submit" variant="contained" color="primary">
//           Login
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, TextField, Button, Box, Paper } from "@mui/material";
import { login } from "../utils/api";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("formData", formData);
      const response = await login(formData);
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
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
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;