export const saveAuthToken = (authToken: string) => {
  return localStorage.setItem('authToken', authToken);
};

export const getAuthToken = () => {
  return localStorage.getItem('authToken') ? localStorage.getItem('auToken') : undefined;
};