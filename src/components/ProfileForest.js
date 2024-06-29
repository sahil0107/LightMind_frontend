import React from "react";
import { Box, Typography } from "@mui/material";
import { Park, LocalFlorist } from "@mui/icons-material";

const ProfileForest = ({ challenges }) => {
  const totalTargetAmount = challenges.reduce((sum, challenge) => sum + challenge.targetAmount, 0);
  const totalCurrentAmount = challenges.reduce((sum, challenge) => sum + challenge.currentAmount, 0);
  const forestHealth = (totalCurrentAmount / totalTargetAmount) * 100;

  const getForestColor = (health) => {
    const baseColor = [197, 225, 165]; // Light green
    const targetColor = [56, 142, 60]; // Deep green
    const r = Math.round(baseColor[0] + (targetColor[0] - baseColor[0]) * (health / 100));
    const g = Math.round(baseColor[1] + (targetColor[1] - baseColor[1]) * (health / 100));
    const b = Math.round(baseColor[2] + (targetColor[2] - baseColor[2]) * (health / 100));
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <Box
      sx={{
        bgcolor: getForestColor(forestHealth),
        p: 3,
        borderRadius: 2,
        minHeight: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "background-color 0.5s ease",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Your Financial Forest
      </Typography>
      <Box display="flex" justifyContent="center" flexWrap="wrap">
        {challenges.map((challenge) => {
          const completionPercentage = (challenge.currentAmount / challenge.targetAmount) * 100;
          const Icon = completionPercentage >= 20 ? Park : LocalFlorist;
          return (
            <Icon
              key={challenge._id}
              sx={{
                fontSize: 30,
                m: 0.5,
                color: completionPercentage >= 100 ? "#004d40" : "#4caf50",
              }}
            />
          );
        })}
      </Box>
      <Typography variant="body2" mt={1}>
        Forest Health: {forestHealth.toFixed(1)}%
      </Typography>
    </Box>
  );
};

export default ProfileForest;