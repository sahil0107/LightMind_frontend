import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import ChallengeForm from "../components/ChallengeForm";
import TreeGullak from "../components/TreeGullak";
import Forest from "../components/Forest";
import { getChallenges, createChallenge, updateChallenge, deleteChallenge } from "../utils/api";

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
        Your Financial Forest
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <ChallengeForm onSubmit={handleCreateChallenge} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Forest challenges={challenges} />
        </Grid>
      </Grid>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Individual Challenges
        </Typography>
        <Grid container spacing={3}>
          {challenges.map((challenge) => (
            <Grid item xs={12} sm={6} md={4} key={challenge._id}>
              <TreeGullak
                challenge={challenge}
                onRoundOff={() => handleOpenRoundOff(challenge)}
                onDelete={() => handleDeleteChallenge(challenge._id)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
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
          Invest
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Challenges;
