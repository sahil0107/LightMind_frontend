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

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const profileData = await getProfile();
      console.log("Profile data received:", profileData.data);
      setProfile(profileData.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
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