import React, { useState, useEffect } from "react";
import { questions } from "./Question/Question.jsx"; // Ensure the correct file extension

const WeeklyExam = () => {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmit();
    }
  }, [timeLeft, isSubmitted]);

  const handleChange = (qIndex, option) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [qIndex]: option,
    }));
    setError("");
  };

  const handleSubmit = () => {
    // Validate all questions are answered
    if (Object.keys(answers).length < questions.length) {
      setError("Please answer all questions before submitting.");
      return;
    }

    let totalScore = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        totalScore += 2;
      }
    });
    setScore(totalScore);
    setIsSubmitted(true);
  };

  // Format time remaining
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Calculate progress
  const progress = Math.round((Object.keys(answers).length / questions.length) * 100);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Weekly Exam</h1>
        <div className="text-lg font-semibold">
          Time Remaining: {formatTime(timeLeft)}
        </div>
      </div>

      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Progress: {progress}% ({Object.keys(answers).length}/{questions.length} questions answered)
        </p>
      </div>

      {error && (
        <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
          {error}
        </div>
      )}

      {questions.map((q, index) => (
        <div key={index} className="mb-4 p-4 border rounded-lg shadow-sm">
          <div className="p-4">
            <p className="font-medium">{index + 1}. {q.question}</p>
            <div className="mt-2">
              {q.options.map((option, i) => (
                <label key={i} className="block mt-1">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    onChange={() => handleChange(index, option)}
                    checked={answers[index] === option}
                    className="mr-2"
                    disabled={isSubmitted}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        </div>
      ))}

      <button 
        onClick={handleSubmit} 
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        disabled={isSubmitted}
      >
        {isSubmitted ? 'Submitted' : 'Submit'}
      </button>

      {score !== null && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold">Exam Results</h2>
          <p className="text-lg mt-2">
            Your Score: {score} out of {questions.length * 2}
          </p>
          <p className="text-md mt-1">
            Percentage: {Math.round((score / (questions.length * 2)) * 100)}%
          </p>
        </div>
      )}
    </div>
  );
};

export default WeeklyExam;
