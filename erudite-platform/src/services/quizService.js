import api from "./axiosInstance";

export const getQuizzesByCourse = (courseCode) => api.get(`/quiz/course/${courseCode}`);
export const getQuiz = (quizNo, setNo) => api.get(`/quiz/${quizNo}/${setNo}`);
export const createQuiz = (data) => api.post("/quiz", data);
export const addQuestions = (data) => api.post("/quiz/questions", data);
export const solveQuiz = (data) => api.post("/quiz/solve", data);
export const addMark = (data) => api.post("/quiz/marks", data);
export const getStudentQuizMarks = (studentId) => api.get(`/quiz/student/${studentId}`);

// delete quiz - expects DELETE /quiz/:quizNo/:setNo
export const deleteQuiz = (quizNo, setNo) => api.delete(`/quiz/${quizNo}/${setNo}`);
