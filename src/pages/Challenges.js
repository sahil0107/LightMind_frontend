// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Typography,
//   List,
//   ListItem,
//   ListItemText,
//   Button,
//   TextField,
//   Box,
// } from "@mui/material";
// import ChallengeForm from "../components/ChallengeForm";
// import {
//   getChallenges,
//   createChallenge,
//   updateChallenge,
//   deleteChallenge,
// } from "../utils/api";

// const Challenges = () => {
//   const [challenges, setChallenges] = useState([]);
//   const [roundOffAmounts, setRoundOffAmounts] = useState({});

//   useEffect(() => {
//     fetchChallenges();
//   }, []);

//   useEffect(() => {
//     console.log("Challenges state updated:", challenges);
//   }, [challenges]);

//   const fetchChallenges = async () => {
//     try {
//       const response = await getChallenges();
//       const challengesData = response.data;
//       console.log("fetchChallenges - challengesData:", challengesData);
//       if (Array.isArray(challengesData)) {
//         setChallenges(challengesData);
//         // Initialize roundOffAmounts for each challenge
//         const initialRoundOffAmounts = {};
//         challengesData.forEach(challenge => {
//           initialRoundOffAmounts[challenge._id] = "";
//         });
//         setRoundOffAmounts(initialRoundOffAmounts);
//       } else {
//         console.error("Challenges data is not an array:", challengesData);
//       }
//     } catch (error) {
//       console.error("Error fetching challenges:", error);
//     }
//   };

//   const handleCreateChallenge = async (challengeData) => {
//     try {
//       await createChallenge(challengeData);
//       await fetchChallenges();
//     } catch (error) {
//       console.error("Error creating challenge:", error);
//     }
//   };

//   const handleUpdateChallenge = async (id, amount) => {
//     try {
//       await updateChallenge(id, amount);
//       await fetchChallenges();
//     } catch (error) {
//       console.error("Error updating challenge:", error);
//     }
//   };

//   const handleDeleteChallenge = async (id) => {
//     try {
//       console.log("Deleting challenge with id:", id);
//       await deleteChallenge(id);
//       await fetchChallenges();
//     } catch (error) {
//       console.error("Error deleting challenge:", error);
//     }
//   };

//   const handleRoundOff = async (challengeId) => {
//     try {
//       const amount = parseFloat(roundOffAmounts[challengeId]);
//       console.log("Input amount:", amount);
//       if (isNaN(amount)) {
//         console.error("Invalid amount entered");
//         return;
//       }

//       const roundedAmount = Math.ceil(amount / 100) * 100;
//       const difference = roundedAmount - amount;
//       console.log("Rounded amount:", roundedAmount);
//       console.log("Difference:", difference);

//       if (difference === 0) {
//         console.log("No rounding needed, amount is already a multiple of 100");
//         return;
//       }

//       console.log("Updating challenge - ID:", challengeId, "Amount to add:", difference);
//       const response = await updateChallenge(challengeId, difference);
//       console.log("Update response:", response);

//       if (response && response.data) {
//         console.log("Updated challenge data:", response.data);
//         // Update the specific challenge in the state
//         setChallenges(prevChallenges => 
//           prevChallenges.map(challenge => 
//             challenge._id === challengeId ? response.data : challenge
//           )
//         );
//       } else {
//         console.error("Invalid response from updateChallenge");
//       }

//       setRoundOffAmounts(prev => ({ ...prev, [challengeId]: "" }));
//     } catch (error) {
//       console.error("Error rounding off challenge amount:", error);
//     }
//   };

//   const handleRoundOffAmountChange = (challengeId, value) => {
//     setRoundOffAmounts(prev => ({ ...prev, [challengeId]: value }));
//   };

//   return (
//     <Container>
//       <Typography variant="h4">Challenges</Typography>
//       <ChallengeForm onSubmit={handleCreateChallenge} />
//       <List>
//         {challenges.map((challenge) => (
//           <ListItem key={challenge._id}>
//             <ListItemText
//               primary={challenge.title}
//               secondary={
//                 <>
//                   <Typography component="span" variant="body2">
//                     Target: ${challenge.targetAmount.toFixed(2)} | Current: ${challenge.currentAmount.toFixed(2)}
//                   </Typography>
//                   <br />
//                   <Typography component="span" variant="body2">
//                     Challenge ID: {challenge._id}
//                   </Typography>
//                 </>
//               }
//             />
//             <Box sx={{ display: "flex", alignItems: "center" }}>
//               <TextField
//                 label="Round off amount"
//                 type="number"
//                 value={roundOffAmounts[challenge._id]}
//                 onChange={(e) => handleRoundOffAmountChange(challenge._id, e.target.value)}
//                 sx={{ mr: 1 }}
//               />
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={() => handleRoundOff(challenge._id)}
//                 sx={{ mr: 1 }}
//               >
//                 Round Off
//               </Button>
//               <Button
//                 variant="contained"
//                 color="secondary"
//                 onClick={() => handleDeleteChallenge(challenge._id)}
//               >
//                 Delete
//               </Button>
//             </Box>
//           </ListItem>
//         ))}
//       </List>
//     </Container>
//   );
// };

// export default Challenges;

import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import ChallengeForm from "../components/ChallengeForm";
import {
  getChallenges,
  createChallenge,
  updateChallenge,
  deleteChallenge,
} from "../utils/api";

const Challenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [openRoundOff, setOpenRoundOff] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [roundOffAmount, setRoundOffAmount] = useState("");

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    try {
      const response = await getChallenges();
      setChallenges(response.data);
    } catch (error) {
      console.error("Error fetching challenges:", error);
    }
  };

  const handleCreateChallenge = async (challengeData) => {
    try {
      await createChallenge(challengeData);
      await fetchChallenges();
    } catch (error) {
      console.error("Error creating challenge:", error);
    }
  };

  const handleOpenRoundOff = (challenge) => {
    setSelectedChallenge(challenge);
    setOpenRoundOff(true);
  };

  const handleCloseRoundOff = () => {
    setOpenRoundOff(false);
    setSelectedChallenge(null);
    setRoundOffAmount("");
  };

  const handleRoundOff = async () => {
    try {
      const amount = parseFloat(roundOffAmount);
      if (isNaN(amount)) return;

      const roundedAmount = Math.ceil(amount / 100) * 100;
      const difference = roundedAmount - amount;

      await updateChallenge(selectedChallenge._id, difference);
      await fetchChallenges();
      handleCloseRoundOff();
    } catch (error) {
      console.error("Error rounding off challenge amount:", error);
    }
  };

  const handleDeleteChallenge = async (id) => {
    try {
      await deleteChallenge(id);
      await fetchChallenges();
    } catch (error) {
      console.error("Error deleting challenge:", error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Challenges
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Create New Challenge
              </Typography>
              <ChallengeForm onSubmit={handleCreateChallenge} />
            </CardContent>
          </Card>
        </Grid>
        {challenges.map((challenge) => (
          <Grid item xs={12} md={4} key={challenge._id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {challenge.title}
                </Typography>
                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                  <CircularProgress
                    variant="determinate"
                    value={(challenge.currentAmount / challenge.targetAmount) * 100}
                    size={100}
                  />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: 'absolute',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="caption" component="div" color="text.secondary">
                      {((challenge.currentAmount / challenge.targetAmount) * 100).toFixed(0)}%
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  Target: ${challenge.targetAmount.toFixed(2)}
                </Typography>
                <Typography variant="body2">
                  Current: ${challenge.currentAmount.toFixed(2)}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenRoundOff(challenge)}
                    sx={{ mr: 1 }}
                  >
                    Round Off
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDeleteChallenge(challenge._id)}
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={openRoundOff} onClose={handleCloseRoundOff}>
        <DialogTitle>Round Off Amount</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Amount"
            type="number"
            fullWidth
            variant="outlined"
            value={roundOffAmount}
            onChange={(e) => setRoundOffAmount(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseRoundOff}>Cancel</Button>
            <Button onClick={handleRoundOff} variant="contained" color="primary">
              Round Off
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    );
  };
  
  export default Challenges;