import axios, { AxiosResponse } from "axios";
import api from "./axiosInstance";
import {getTokenData} from "./storage";

export interface AuthCredentials {
  token: string;
  refreshToken: string;
  expiresIn: number;
  error?: string;
}

export const userHasToken = (): boolean => {
  return getTokenData() !== undefined;
}

export const createAccount = async (): Promise<AuthCredentials> => {
  try {
    const response: AxiosResponse<AuthCredentials> = await api.post(`/v1/auth/create-account`);
    return response.data;
  } catch (error) {
    throw new Error('Error creating Guest Account.');
  }
}

export const refreshToken = async (refreshToken: string): Promise<AuthCredentials> => {
  try {
    const json = {
      token: refreshToken
    }
    const response: AxiosResponse<AuthCredentials> = await api.post(`v1/auth/refresh`, json);
    return response.data;
  }
  catch {
    throw new Error('Error fetching new refreshToken');
  }
}
