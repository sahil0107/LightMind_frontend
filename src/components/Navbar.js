// import React from "react";
// import { Link as RouterLink, useNavigate } from "react-router-dom";
// import { AppBar, Toolbar, Typography, Button } from "@mui/material";
// import { isAuthenticated, logout } from "../utils/auth";

// const Navbar = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   return (
//     <AppBar position="static">
//       <Toolbar>
//         <Typography variant="h6" sx={{ flexGrow: 1 }}>
//           MindLight
//         </Typography>
//         <Button color="inherit" component={RouterLink} to="/">
//           Home
//         </Button>
//         {isAuthenticated() ? (
//           <>
//             <Button color="inherit" component={RouterLink} to="/dashboard">
//               Dashboard
//             </Button>
//             <Button color="inherit" component={RouterLink} to="/quiz">
//               Quiz
//             </Button>
//             <Button color="inherit" component={RouterLink} to="/challenges">
//               Challenges
//             </Button>
//             <Button color="inherit" onClick={handleLogout}>
//               Logout
//             </Button>
//           </>
//         ) : (
//           <>
//             <Button color="inherit" component={RouterLink} to="/login">
//               Login
//             </Button>
//             <Button color="inherit" component={RouterLink} to="/register">
//               Register
//             </Button>
//           </>
//         )}
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navbar;

import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { isAuthenticated, logout } from "../utils/auth";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={RouterLink} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          MindLight
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/">
            Home
          </Button>
          {isAuthenticated() ? (
            <>
              <Button color="inherit" component={RouterLink} to="/dashboard">
                Dashboard
              </Button>
              <Button color="inherit" component={RouterLink} to="/quiz">
                Quiz
              </Button>
              <Button color="inherit" component={RouterLink} to="/challenges">
                Challenges
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to="/login">
                Login
              </Button>
              <Button color="inherit" component={RouterLink} to="/register">
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;