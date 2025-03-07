import type { Question } from '../models/Question.js';

const API_BASE_URL = "https://quiz-app-ci-cd.onrender.com/api"; // ✅ Ensure this is correct

export const getQuestions = async (): Promise<Question[]> => {
  try {
    console.log(`🔄 Fetching questions from: ${API_BASE_URL}/questions/random`); // ✅ Debugging log

    const response = await fetch(`${API_BASE_URL}/questions/random`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok. Status: ${response.status}`);
    }

    const data: Question[] = await response.json();
    console.log("✅ API Response:", data); // ✅ Log response

    return data;
  } catch (error) {
    console.error("❌ Failed to fetch questions:", error);
    throw error;
  }
};