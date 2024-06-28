import React, { useState, useEffect } from "react";
import { Typography, Grid, Paper } from "@mui/material";
import { getAchievements } from "../utils/api";

const AchievementList = () => {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const fetchAchievements = async () => {
      const response = await getAchievements();
      setAchievements(response.data);
    };
    fetchAchievements();
  }, []);

  return (
    <Grid container spacing={2}>
      {achievements.map((achievement) => (
        <Grid item xs={12} sm={6} md={4} key={achievement._id}>
          <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
            <img src={achievement.icon} alt={achievement.name} style={{ width: 50, height: 50 }} />
            <Typography variant="h6">{achievement.name}</Typography>
            <Typography variant="body2">{achievement.description}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default AchievementList;