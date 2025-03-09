
import axios from "axios";
import { useUserStore } from '../stores/UserEditstore'


const api = axios.create({
  baseURL: "https://dummyjson.com",
});


api.interceptors.request.use((config) => {
  const { auth } = useUserStore.getState();
  if (auth.token) {
    config.headers.Authorization = `Bearer ${auth.token}`;
  }
  return config;
});


export const loginUser = async (
    username: string,
    password: string
  ): Promise<string> => {
    const response = await api.post("/auth/login", { username, password });
    console.log("Login API response:", response.data); 
    const token = response.data.accessToken;
    return token;
  };
  


export const getAllUsers = async () => {
  const response = await api.get("/users");
  return response.data.users;
};



export const getUserById = async (id: number) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};



export const searchUserById = async (id: number) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};


export const filterUsersByGender = async (gender: string) => {
  const response = await api.get(`/users/filter?key=gender&value=${gender}`);
  return response.data.users;
};



export const updateUser = async (id: number, userData: any) => {
  const response = await api.put(`/users/${id}`, userData);
  return response.data;
};
