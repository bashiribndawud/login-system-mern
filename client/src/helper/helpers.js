import axios from "axios";
import * as dotenv from "dotenv";
import jwtDecode from "jwt-decode";
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

export async function authenticate(username) {
  try {
    return await axios.post("api/v1/auth/authenticate", { username });
  } catch (error) {
    return { error: "Username doesnt exist" };
  }
}

export async function getUser({ username }) {
  try {
    const { data } = await axios.get(`api/v1/user/${username}`);
    return [data];
  } catch (error) {
    return { error: "Username doesnt exist" };
  }
}

// get user by token
export async function getUsername(){
  const token = localStorage.getItem('token');
  if(!token) return Promise.reject("Could not find token");
  let decode = jwtDecode(token);
  return decode
}

export async function registerUser(credentials) {
  try {
    const {
      data: { msg },
      status,
    } = await axios.post(`api/v1/auth/register`, credentials);

    const { username, email } = credentials;

    if (status === 201) {
      const {
        data: { msg },
      } = await axios.post(`api/v1/user/registerMail`, {
        username,
        userEmail: email,
        text: msg,
      });
    }
    return Promise.resolve(msg);
  } catch (error) {
    return Promise.reject({ error });
  }
}

export async function verifyPassword(crendentials) {
  try {
    const { username, password } = crendentials;
    const { data } = await axios.post(`api/v1/auth/login`, {
      username,
      password,
    });
    if (data) {
      return Promise.resolve({ data });
    }
  } catch (error) {
    return Promise.reject({ error });
  }
}

export async function updateUser(response) {
  try {
    const token = await localStorage.getItem("token");
    const data = await axios.put(`api/v1/user/updateuser`, response, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject({ error });
  }
}

export async function generateOTP(username) {
  try {
    const {
      data: { code },
      status,
    } = await axios.post(`api/v1/user/generateOTP`, { params: { username } });
    // send mail with OTP
    if (status === 201) {
      let {
        data: { email },
      } = await getUser({ username });
      const text = `Your password recovery code is ${code}`;
      const { data } = await axios.post(`api/v1/user/registerMail`, {
        username,
        userEmail: email,
        text,
        subject: "Password Recovery OTP",
      });
    }

    return Promise.resolve(code);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function verifyOTP({ username, code }) {
  try {
    const { data, status } = await axios.get(`api/v1/user/verifyOTP`, {
      params: { username, code },
    });
    return { data, status };
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function resetPassword({ username, password }) {
  try {
    const { data, status } = await axios.put(`api/v1/user/resetPassword`, {
      username,
      password,
    });
    return Promise.resolve({ data, status });
  } catch (error) {
    return Promise.reject({ error });
  }
}
