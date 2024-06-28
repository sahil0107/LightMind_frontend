// import React, { useEffect, useState } from "react";
// import { Container, Typography } from "@mui/material";
// import QuoteDisplay from "../components/QuoteDisplay";
// import { getRandomQuote } from "../utils/api";

// const Home = () => {
//   const [quote, setQuote] = useState(null);

//   useEffect(() => {
//     const fetchQuote = async () => {
//       const quoteData = await getRandomQuote();
//       setQuote(quoteData.data);
//     };
//     fetchQuote();
//   }, []);

//   return (
//     <Container>
//       <Typography variant="h2">Welcome to MindLight</Typography>
//       <Typography variant="body1">
//         Learn financial skills and grow your wealth with our interactive
//         platform.
//       </Typography>
//       {quote && <QuoteDisplay quote={quote} />}
//     </Container>
//   );
// };

// export default Home;

import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Paper } from "@mui/material";
import QuoteDisplay from "../components/QuoteDisplay";
import { getRandomQuote } from "../utils/api";

const Home = () => {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    const fetchQuote = async () => {
      const quoteData = await getRandomQuote();
      setQuote(quoteData.data);
    };
    fetchQuote();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
        <Typography variant="h2" gutterBottom>
          Welcome to MindLight
        </Typography>
        <Typography variant="h5" gutterBottom>
          Learn financial skills and grow your wealth with our interactive platform.
        </Typography>
        <Box sx={{ mt: 4 }}>
          {quote && <QuoteDisplay quote={quote} />}
        </Box>
      </Paper>
    </Container>
  );
};

export default Home;