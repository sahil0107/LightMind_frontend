import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Paper, Grid, Button } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import QuoteDisplay from "../components/QuoteDisplay";
import { getRandomQuote } from "../utils/api";
import { isAuthenticated } from "../utils/auth";

const Home = () => {
  const [quote, setQuote] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuote = async () => {
      const quoteData = await getRandomQuote();
      setQuote(quoteData.data);
    };
    fetchQuote();
  }, []);

  const handleAuthenticatedClick = (path) => {
    if (isAuthenticated()) {
      navigate(path);
    } else {
      navigate("/login", { state: { from: path } });
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 4, textAlign: "center" }}>
            <Typography variant="h2" gutterBottom>
              Welcome to LightMind
            </Typography>
            <Typography variant="h5" gutterBottom>
              Gamify Your Financial Journey
            </Typography>
            <Typography variant="body1" paragraph>
              Learn, earn, and grow with our interactive financial education platform.
            </Typography>
            <Button
              component={RouterLink}
              to="/register"
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 2 }}
            >
              Start Your Journey
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <Box>
              <Typography variant="h5" gutterBottom>
                Daily Challenges
              </Typography>
              <Typography variant="body1">
                Complete daily financial tasks to earn coins and level up your knowledge.
              </Typography>
            </Box>
            <Button onClick={() => handleAuthenticatedClick("/challenges")} variant="outlined" color="primary" sx={{ mt: 2 }}>
              View Challenges
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <Box>
              <Typography variant="h5" gutterBottom>
                Financial Quizzes
              </Typography>
              <Typography variant="body1">
                Test your knowledge, compete with others, and climb the leaderboard.
              </Typography>
            </Box>
            <Button onClick={() => handleAuthenticatedClick("/quiz")} variant="outlined" color="primary" sx={{ mt: 2 }}>
              Take a Quiz
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <Box>
              <Typography variant="h5" gutterBottom>
                Achievement Badges
              </Typography>
              <Typography variant="body1">
                Unlock badges as you master financial concepts and reach milestones.
              </Typography>
            </Box>
            <Button onClick={() => handleAuthenticatedClick("/dashboard")} variant="outlined" color="primary" sx={{ mt: 2 }}>
              View Achievements
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 4 }}>
            {quote && <QuoteDisplay quote={quote} />}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
