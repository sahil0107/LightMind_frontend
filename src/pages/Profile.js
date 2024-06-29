import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  CircularProgress,
  Avatar,
} from "@mui/material";
import { getProfile } from "../utils/api";
import ProfileForest from "../components/ProfileForest";
import { getChallenges } from "../utils/api";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
    fetchChallenges();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const profileData = await getProfile();
      setProfile(profileData.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchChallenges = async () => {
    try {
      const challengesData = await getChallenges();
      setChallenges(challengesData.data);
    } catch (error) {
      console.error("Error fetching challenges:", error);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
        <Typography variant="h4" gutterBottom>
          Your Profile
        </Typography>
        {profile && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Avatar
                  src={`/avatars/${profile.avatar}?${new Date().getTime()}`}
                  alt={profile.name}
                  sx={{ width: 100, height: 100, mb: 2 }}
                />
                <Typography variant="h5">{profile.name}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <ProfileForest challenges={challenges} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Total Coins
                </Typography>
                <Typography variant="h3" color="primary">
                  {profile.coins}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Daily Streak
                </Typography>
                <Typography variant="h3" color="secondary">
                  {profile.dailyStreak} days
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Achievements
                </Typography>
                {profile.achievements.map((achievement, index) => (
                  <Typography key={index} variant="body1">
                    {achievement}
                  </Typography>
                ))}
              </Box>
            </Grid>
          </Grid>
        )}
      </Paper>
    </Container>
  );
};

export default Profile;