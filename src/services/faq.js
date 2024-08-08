import api from "./api";

const getFaqs = async () => {
  try {
    const response = await api.get("api/v2/public/faqs");
    return response.data;
  } catch (error) {
    console.error("Error Fetching FAQs", error);
    throw error;
  }
};

export { getFaqs };
