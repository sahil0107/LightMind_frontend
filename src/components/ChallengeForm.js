// import React, { useState } from "react";
// import { TextField, Button, Box } from "@mui/material";

// const ChallengeForm = ({ onSubmit }) => {
//   const [formData, setFormData] = useState({
//     title: "",
//     targetAmount: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//     setFormData({ title: "", targetAmount: "" });
//   };

//   return (
//     <Box
//       component="form"
//       onSubmit={handleSubmit}
//       sx={{ "& > :not(style)": { m: 1 } }}
//     >
//       <TextField
//         fullWidth
//         label="Challenge Title"
//         name="title"
//         value={formData.title}
//         onChange={handleChange}
//         required
//       />
//       <TextField
//         fullWidth
//         label="Target Amount"
//         name="targetAmount"
//         type="number"
//         value={formData.targetAmount}
//         onChange={handleChange}
//         required
//       />
//       <Button type="submit" variant="contained" color="primary">
//         Create Challenge
//       </Button>
//     </Box>
//   );
// };

// export default ChallengeForm;

import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

const ChallengeForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    targetAmount: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ title: "", targetAmount: "" });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="Challenge Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Target Amount"
        name="targetAmount"
        type="number"
        value={formData.targetAmount}
        onChange={handleChange}
        required
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Create Challenge
      </Button>
    </Box>
  );
};

export default ChallengeForm;