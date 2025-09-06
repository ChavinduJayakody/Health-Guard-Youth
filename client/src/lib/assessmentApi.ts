import api from "./api";

export const submitAssessment = async (data: any) => {
  try {
    const response = await api.post("/predict/both", data);
    return response.data;
  } catch (error: any) {
    console.error("Error submitting assessment:", error.response || error.message);
    throw error;
  }
};
