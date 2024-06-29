
import React from "react";
import { Typography, Box } from "@mui/material";

const QuoteDisplay = ({ quote }) => {
  return (
    <Box sx={{ textAlign: "center", my: 4 }}>
      <Typography variant="h5" gutterBottom>
        "{quote.text}"
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        - {quote.author || "Unknown"}
      </Typography>
    </Box>
  );
};

export default QuoteDisplay;