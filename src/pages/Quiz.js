// // import React, { useState, useEffect } from "react";
// // import {
// //   Container,
// //   Typography,
// //   Button,
// //   Radio,
// //   RadioGroup,
// //   FormControlLabel,
// //   FormControl,
// //   Box,
// // } from "@mui/material";
// // import { getQuiz, submitQuiz } from "../utils/api";

// // const Quiz = () => {
// //   const [quiz, setQuiz] = useState(null);
// //   const [answers, setAnswers] = useState([]);
// //   const [result, setResult] = useState(null);

// //   useEffect(() => {
// //     fetchQuiz();
// //   }, []);

// //   const fetchQuiz = async () => {
// //     const quizData = await getQuiz();
// //     setQuiz(quizData);
// //     setAnswers(new Array(quizData.questions.length).fill(null));
// //   };

// //   const handleAnswerChange = (index, value) => {
// //     const newAnswers = [...answers];
// //     newAnswers[index] = parseInt(value);
// //     setAnswers(newAnswers);
// //   };

// //   const handleSubmit = async () => {
// //     const resultData = await submitQuiz(quiz._id, answers);
// //     setResult(resultData);
// //   };

// //   if (!quiz) return <Typography>Loading quiz...</Typography>;

// //   return (
// //     <Container>
// //       <Typography variant="h4">Financial Quiz</Typography>
// //       {!result ? (
// //         <Box>
// //           {quiz.questions.map((question, index) => (
// //             <FormControl component="fieldset" key={index} sx={{ mb: 2 }}>
// //               <Typography variant="h6">{question.question}</Typography>
// //               <RadioGroup
// //                 value={answers[index]}
// //                 onChange={(e) => handleAnswerChange(index, e.target.value)}
// //               >
// //                 {question.options.map((option, optionIndex) => (
// //                   <FormControlLabel
// //                     key={optionIndex}
// //                     value={optionIndex}
// //                     control={<Radio />}
// //                     label={option}
// //                   />
// //                 ))}
// //               </RadioGroup>
// //             </FormControl>
// //           ))}
// //           <Button variant="contained" color="primary" onClick={handleSubmit}>
// //             Submit Quiz
// //           </Button>
// //         </Box>
// //       ) : (
// //         <Box>
// //           <Typography variant="h5">Quiz Results</Typography>
// //           <Typography>Score: {result.score}%</Typography>
// //           <Typography>Coins Earned: {result.coinsEarned}</Typography>
// //           <Typography>Total Coins: {result.totalCoins}</Typography>
// //           <Typography>Daily Streak: {result.dailyStreak}</Typography>
// //           <Button
// //             variant="contained"
// //             color="primary"
// //             onClick={fetchQuiz}
// //             sx={{ mt: 2 }}
// //           >
// //             Take Another Quiz
// //           </Button>
// //         </Box>
// //       )}
// //     </Container>
// //   );
// // };

// // export default Quiz;
// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Typography,
//   Button,
//   Radio,
//   RadioGroup,
//   FormControlLabel,
//   FormControl,
//   Box,
// } from "@mui/material";
// import { getQuiz, submitQuiz } from "../utils/api";

// const Quiz = () => {
//   const [quiz, setQuiz] = useState(null);
//   const [answers, setAnswers] = useState([]);
//   const [result, setResult] = useState(null);

//   useEffect(() => {
//     fetchQuiz();
//   }, []);

//   const fetchQuiz = async () => {
//     try {
//       const response = await getQuiz();
//       const quizData = response.data; // Extract data from the response

//       console.log("quizData", quizData);

//       if (quizData && quizData.questions) {
//         setQuiz(quizData);
//         setAnswers(new Array(quizData.questions.length).fill(null));
//       } else {
//         console.error("Quiz data or questions are undefined:", quizData);
//       }
//     } catch (error) {
//       console.error("Error fetching quiz:", error);
//     }
//   };

//   const handleAnswerChange = (index, value) => {
//     const newAnswers = [...answers];
//     newAnswers[index] = parseInt(value);
//     setAnswers(newAnswers);
//   };

//   const handleSubmit = async () => {
//     try {
//       const resultData = await submitQuiz(quiz._id, answers);
//       console.log("resultData", resultData);
//       setResult(resultData.data);
//       console.log("resuklt", result);
//     } catch (error) {
//       console.error("Error submitting quiz:", error);
//     }
//   };

//   if (!quiz) return <Typography>Loading quiz...</Typography>;

//   return (
//     <Container>
//       <Typography variant="h4">Financial Quiz</Typography>
//       {!result ? (
//         <Box>
//           {quiz.questions.map((question, index) => (
//             <FormControl component="fieldset" key={question._id} sx={{ mb: 2 }}>
//               <Typography variant="h6">{question.question}</Typography>
//               <RadioGroup
//                 value={answers[index]}
//                 onChange={(e) => handleAnswerChange(index, e.target.value)}
//               >
//                 {question.options.map((option, optionIndex) => (
//                   <FormControlLabel
//                     key={optionIndex}
//                     value={optionIndex.toString()} // Ensure value is string for RadioGroup compatibility
//                     control={<Radio />}
//                     label={option}
//                   />
//                 ))}
//               </RadioGroup>
//             </FormControl>
//           ))}
//           <Button variant="contained" color="primary" onClick={handleSubmit}>
//             Submit Quiz
//           </Button>
//         </Box>
//       ) : (
//         <Box>
//           <Typography variant="h5">Quiz Results</Typography>
//           <Typography>Score: {result.score}%</Typography>
//           <Typography>Coins Earned: {result.coinsEarned}</Typography>
//           <Typography>Total Coins: {result.totalCoins}</Typography>
//           <Typography>Daily Streak: {result.dailyStreak}</Typography>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={fetchQuiz}
//             sx={{ mt: 2 }}
//           >
//             Take Another Quiz
//           </Button>
//         </Box>
//       )}
//     </Container>
//   );
// };

// export default Quiz;


// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Typography,
//   Button,
//   Radio,
//   RadioGroup,
//   FormControlLabel,
//   FormControl,
//   Box,
//   Paper,
//   CircularProgress,
// } from "@mui/material";
// import { getQuiz, submitQuiz } from "../utils/api";

// const Quiz = () => {
//   const [quiz, setQuiz] = useState(null);
//   const [answers, setAnswers] = useState([]);
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchQuiz();
//   }, []);

//   const fetchQuiz = async () => {
//     try {
//       setLoading(true);
//       const quizData = await getQuiz();
//       setQuiz(quizData.data);
//       setAnswers(new Array(quizData.data.questions.length).fill(null));
//       setResult(null);
//     } catch (error) {
//       console.error("Error fetching quiz:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAnswerChange = (index, value) => {
//     const newAnswers = [...answers];
//     newAnswers[index] = parseInt(value);
//     setAnswers(newAnswers);
//   };

//   const handleSubmit = async () => {
//     try {
//       setLoading(true);
//       const resultData = await submitQuiz(quiz._id, answers);
//       setResult(resultData.data);
//     } catch (error) {
//       console.error("Error submitting quiz:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <Container maxWidth="sm" sx={{ mt: 4, textAlign: "center" }}>
//         <CircularProgress />
//       </Container>
//     );
//   }

//   return (
//     <Container maxWidth="md" sx={{ mt: 4 }}>
//       <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
//         <Typography variant="h4" gutterBottom>
//           Financial Quiz
//         </Typography>
//         {!result ? (
//           <Box>
//             {quiz.questions.map((question, index) => (
//               <FormControl component="fieldset" key={question._id} sx={{ mb: 3, width: "100%" }}>
//                 <Typography variant="h6" gutterBottom>
//                   {question.question}
//                 </Typography>
//                 <RadioGroup
//                   value={answers[index]}
//                   onChange={(e) => handleAnswerChange(index, e.target.value)}
//                 >
//                   {question.options.map((option, optionIndex) => (
//                     <FormControlLabel
//                       key={optionIndex}
//                       value={optionIndex.toString()}
//                       control={<Radio />}
//                       label={option}
//                     />
//                   ))}
//                 </RadioGroup>
//               </FormControl>
//             ))}
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleSubmit}
//               disabled={answers.includes(null)}
//             >
//               Submit Quiz
//             </Button>
//           </Box>
//         ) : (
//           <Box>
//             <Typography variant="h5" gutterBottom>
//               Quiz Results
//             </Typography>
//             <Typography variant="h3" color="primary" gutterBottom>
//               Score: {result.score}%
//             </Typography>
//             <Typography variant="h6" gutterBottom>
//               Coins Earned: {result.coinsEarned}
//             </Typography>
//             <Typography variant="h6" gutterBottom>
//               Total Coins: {result.totalCoins}
//             </Typography>
//             <Typography variant="h6" gutterBottom>
//               Daily Streak: {result.dailyStreak}
//             </Typography>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={fetchQuiz}
//               sx={{ mt: 2 }}
//             >
//               Take Another Quiz
//             </Button>
//           </Box>
//         )}
//       </Paper>
//     </Container>
//   );
// };

// export default Quiz;

import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Box,
  Paper,
  CircularProgress,
} from "@mui/material";
import { getQuiz, submitQuiz } from "../utils/api";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const [quiz, setQuiz] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    try {
      setLoading(true);
      const response = await getQuiz();
      if (response.data.quizAvailable) {
        setQuiz(response.data.quiz);
      } else {
        setError({
          type: 'info',
          message: response.data.message,
          details: {
            nextQuizTime: response.data.nextQuizTime,
            hoursUntilNextQuiz: response.data.hoursUntilNextQuiz,
            dailyStreak: response.data.dailyStreak,
            encouragement: response.data.encouragement,
            tip: response.data.tip,
          },
        });
      }
    } catch (error) {
      console.error("Error fetching quiz:", error);
      setError({
        type: 'error',
        message: "An error occurred while fetching the quiz. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (event) => {
    setAnswer(parseInt(event.target.value));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const resultData = await submitQuiz(quiz._id, [answer]);
      setResult(resultData.data);
    } catch (error) {
      console.error("Error submitting quiz:", error);
      setError("An error occurred while submitting the quiz. Please try again.");
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

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4, textAlign: "center" }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
          <Typography variant="h5" color={error.type === 'info' ? 'primary' : 'error'} gutterBottom>
            {error.message}
          </Typography>
          {error.type === 'info' && (
            <>
              <Typography variant="body1" gutterBottom>
                Next quiz available in: {error.details.hoursUntilNextQuiz} hours
              </Typography>
              <Typography variant="body1" gutterBottom>
                Your current daily streak: {error.details.dailyStreak} days
              </Typography>
              <Typography variant="body1" gutterBottom>
                {error.details.encouragement}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                Tip: {error.details.tip}
              </Typography>
            </>
          )}
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
        <Typography variant="h4" gutterBottom>
          Daily Financial Quiz
        </Typography>
        {!result ? (
          <Box>
            {quiz && (
              <FormControl component="fieldset" sx={{ mb: 3, width: "100%" }}>
                <Typography variant="h6" gutterBottom>
                  {quiz.questions[0].question}
                </Typography>
                <RadioGroup value={answer} onChange={handleAnswerChange}>
                  {quiz.questions[0].options.map((option, optionIndex) => (
                    <FormControlLabel
                      key={optionIndex}
                      value={optionIndex.toString()}
                      control={<Radio />}
                      label={option}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={answer === null}
            >
              Submit Answer
            </Button>
          </Box>
        ) : (
          <Box>
            <Typography variant="h5" gutterBottom>
              Quiz Results
            </Typography>
            <Typography variant="h3" color="primary" gutterBottom>
              Score: {result.score}%
            </Typography>
            <Typography variant="body1" paragraph>
              Great job! You've completed today's quiz. Come back tomorrow for a new question.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/profile")}
              sx={{ mt: 2 }}
            >
              View Profile
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Quiz;