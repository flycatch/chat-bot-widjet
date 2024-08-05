import axios from "axios";

export const get = async function (url) {
  try {
    const resp = await axios.get(url);
    return resp.data;
  } catch (err) {}
};

export const post = async function (url, body) {
  try {
    const resp = await axios.post(url, body);
    return resp.data;
  } catch (err) {}
};

export const put = async function (url, body) {
  try {
    const resp = await axios.put(url, body);
    return resp.data.data;
  } catch (err) {}
};
