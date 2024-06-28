// import React from "react";
// import { Typography, Paper } from "@mui/material";

// const QuoteDisplay = ({ quote }) => {
//   return (
//     <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
//       <Typography variant="body1">"{quote.text}"</Typography>
//       <Typography variant="subtitle2" align="right">
//         - {quote.author}
//       </Typography>
//     </Paper>
//   );
// };

// export default QuoteDisplay;


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