import api from "./api";

const getSearchResults = async (query) => {
  try {
    const response = await api.get(`api/v2/public/search?query=${query}`);
    return response.data;
  } catch (error) {
    console.error("Error Fetching Search Results", error);
    throw error;
  }
};

export { getSearchResults };
