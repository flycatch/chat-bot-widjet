import axios from "axios";

export const post = async function (url, body) {
  try {
    const resp = await axios.post(url, body);
    return resp.data.data;
  } catch (err) {}
};

export const put = async function (url, body) {
  try {
    const resp = await axios.put(url, body);
    return resp.data.data;
  } catch (err) {}
};
