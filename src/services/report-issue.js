import api from "./api";

const createTicket = async (issueData) => {
  try {
    const response = await api.post("api/v1/public/tickets/create", issueData);
    return response.data;
  } catch (error) {
    console.error("Error creating your ticket", error);
    throw error;
  }
};

export { createTicket };
