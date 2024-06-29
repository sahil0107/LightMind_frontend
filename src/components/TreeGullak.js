import React from "react";
import { Card, CardContent, Typography, Box, Button, LinearProgress } from "@mui/material";
import { Park, LocalFlorist } from "@mui/icons-material";

const TreeGullak = ({ challenge, onRoundOff, onDelete }) => {
  const completionPercentage = (challenge.currentAmount / challenge.targetAmount) * 100;

  const getTreeColor = (percentage) => {
    const baseColor = [200, 230, 201]; // Very light green
    const targetColor = [27, 94, 32]; // Very deep green
    const r = Math.round(baseColor[0] + (targetColor[0] - baseColor[0]) * (percentage / 100));
    const g = Math.round(baseColor[1] + (targetColor[1] - baseColor[1]) * (percentage / 100));
    const b = Math.round(baseColor[2] + (targetColor[2] - baseColor[2]) * (percentage / 100));
    return `rgb(${r}, ${g}, ${b})`;
  };

  const Icon = completionPercentage >= 20 ? Park : LocalFlorist;

  return (
    <Card>
      <CardContent>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Icon style={{ fontSize: 60, color: getTreeColor(completionPercentage), transition: "color 0.5s ease" }} />
          <Typography variant="h6" gutterBottom>
            {challenge.title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Target: ${challenge.targetAmount.toFixed(2)}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Current: ${challenge.currentAmount.toFixed(2)}
          </Typography>
          <Box width="100%" mt={2}>
            <LinearProgress
              variant="determinate"
              value={completionPercentage}
              sx={{ height: 10, borderRadius: 5, backgroundColor: getTreeColor(0), "& .MuiLinearProgress-bar": { backgroundColor: getTreeColor(100) } }}
            />
          </Box>
          <Typography variant="body2" color="textSecondary" mt={1}>
            {completionPercentage.toFixed(0)}% Complete
          </Typography>
          <Box mt={2}>
            <Button variant="outlined" color="primary" onClick={onRoundOff} sx={{ mr: 1 }}>
            Enter Your Purchase Amount
            </Button>
            <Button variant="outlined" color="secondary" onClick={onDelete}>
              Delete
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TreeGullak;