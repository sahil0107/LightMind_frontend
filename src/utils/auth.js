export const setAuthToken = (token) => {
  localStorage.setItem("authToken", token);
};

export const getAuthToken = () => {
  const token = localStorage.getItem("authToken");
  console.log("Retrieved token:", token); // Add this line
  return token;
};

export const removeAuthToken = () => {
  localStorage.removeItem("authToken");
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};

export const logout = () => {
  removeAuthToken();
};
