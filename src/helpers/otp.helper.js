const otp = 12345;

const sendOtp = async (phoneNumber) => {
  //logic and implementation of otp

  return true;
};

const verifyOtp = async (userEnteredOtp) => {
  if (otp !== userEnteredOtp) return false;

  return true;
};

module.exports = {
  verifyOtp,
  sendOtp,
};
