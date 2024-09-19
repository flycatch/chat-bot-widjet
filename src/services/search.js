import api from "./api";

const getSearchResults = async (query, limit = 5) => {
  try {
    const response = await api.get(`api/v2/public/search?query=${query}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Error Fetching Search Results", error);
    throw error;
  }
};

export { getSearchResults };
