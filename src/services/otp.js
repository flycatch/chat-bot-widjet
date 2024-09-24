import api from "./api";

const sendOTPInMail = async (email) => {
  try {
    const response = await api.post(`api/v2/public-email/otp`, {email});
    return response.data;
  } catch (error) {
    console.error("Error Sending OTP", error);
    throw error;
  }
};

const verifyEmail = async (email, otp) => {
    try {
      const response = await api.post(`api/v2/public-email/verify`, {email, otp});
      return response.data;
    } catch (error) {
      console.error("Error Verifying", error);
      throw error;
    }
  };


export { sendOTPInMail, verifyEmail };
