import api from "configs/api"


const sendRegister = async (username, password) => {
  try {
    const response = await api.post("auth/register", {username, password});
    return { response };
  } catch (error) {
    return { error };
  }
};

const sendLogin = async (username, password) => {
  try {
    const response = await api.post("auth/login", {username, password});
    return { response }
  } catch (error) {
    return { error }
  }
};

export  { sendRegister, sendLogin };