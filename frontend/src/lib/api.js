import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const api = axios.create({
  baseURL: API_URL,
});

// Owner Login API
export const ownerlogin = async (email, password) => {
  const formData = new FormData();
  formData.append("username", email);
  formData.append("password", password);
  return api.post("/auth/Ownerlogin", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Tenant Login API
export const tenantlogin = async (email, password) => {
  const formData = new FormData();
  formData.append("username", email);
  formData.append("password", password);
  return api.post("/auth/Tenantlogin", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Owner Signup API
export const ownersignup = async (firstname, lastname, email, password, countryCode, phoneNumber) => {
  return api.post("/auth/OwnerSignup", {
    firstname,
    lastname,
    email,
    password,
    phoneCode: countryCode,
    phonenum: phoneNumber,
  });
};

// Tenant Signup API
export const tenantsignup = async (firstname, lastname, email, password, countryCode, phoneNumber) => {
  return api.post("/auth/TenantSignup", {
    firstname,
    lastname,
    email,
    password,
    phoneCode: countryCode,
    phonenum: phoneNumber,
  });
};

export const updateProfile = async (profileData) => {
  return api.put("/auth/update-profile", profileData, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const refreshToken = async () => {
  const response = await api.post("/auth/refresh-token", {
    refresh_token: localStorage.getItem("refresh_token"),
  });
  localStorage.setItem("token", response.data.access_token);
  return response.data.access_token;
};


export const googleSignIn = async (token) => {
  return api.post("/google-login", { token });
};

export const logout = async () => {
  return api.post("/logout");
};

export const getUserProfile = async () => {
  return api.get("/Tprofile");
};

// export const refreshToken = async () => {
//   return api.post("/refresh-token");
// };

export const forgotPassword = async (email) => {
  return api.post("/forgot-password", { email });
};

export const resetPassword = async (token, newPassword) => {
  return api.post("/reset-password", { token, new_password: newPassword });
};

export const verifyEmail = async (token) => {
  return api.post("/verify-email", { token });
};
