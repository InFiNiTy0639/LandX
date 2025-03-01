import axios from "axios";

const API_URL = "http://127.0.0.1:8000/auth";

export const api = axios.create({
  baseURL: API_URL,
});

// Owner Login API
export const ownerlogin = async (email, password) => {
  const formData = new FormData();
  formData.append("username", email);
  formData.append("password", password);
  return api.post("/Ownerlogin", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Tenant Login API
export const tenantlogin = async (email, password) => {
  const formData = new FormData();
  formData.append("username", email);
  formData.append("password", password);
  return api.post("/Tenantlogin", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Owner Signup API
export const ownersignup = async (firstname, lastname, email, password, countryCode, phoneNumber) => {
  return api.post("/OwnerSignup", {
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
  return api.post("/TenantSignup", {
    firstname,
    lastname,
    email,
    password,
    phoneCode: countryCode,
    phonenum: phoneNumber,
  });
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

export const refreshToken = async () => {
  return api.post("/refresh-token");
};

export const forgotPassword = async (email) => {
  return api.post("/forgot-password", { email });
};

export const resetPassword = async (token, newPassword) => {
  return api.post("/reset-password", { token, new_password: newPassword });
};

export const verifyEmail = async (token) => {
  return api.post("/verify-email", { token });
};