import axios, { AxiosResponse } from "axios";
import api from "./axiosInstance";
import {getTokenData} from "./storage";
import * as Store from "../backend/storage";

/*export interface AuthCredentials {
  token: string;
  refreshToken: string;
  expiresIn: number;
  error?: string;
}*/

export interface PublicUser {
  id: number;
  email: string;
  savedRecipeIds: number[];
}

export interface TokenResponse {
  tokenType: string;
  accessToken: string;
  refreshToken: string;
}

export const register = async (email: string, password: string): Promise<PublicUser> => {
  try {
    const response: AxiosResponse<PublicUser> = await api.post(`/users/register`, {
      email: email,
      password: password
    });
    return response.data;
  } catch (error) {
    throw new Error('Error registering user: ' + error);
  }
}

export const logIn = async (email: string, password: string): Promise<TokenResponse> => {
  try {
    const response: AxiosResponse<TokenResponse> = await api.post(`/users/login`, {
      email: email,
      password: password
    });
    await Store.storeTokenData(response.data);
    return response.data;
  } catch (error) {
    throw new Error('Error logging user in: ' + error);
  }
}

/*export const userHasToken = (): boolean => {
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
*/

export const refreshToken = async (refreshToken: string): Promise<TokenResponse> => {
  try {
    const json = {
      token: refreshToken
    }
    const response: AxiosResponse<TokenResponse> = await api.post(`users/refresh`, json);
    return response.data;
  }
  catch {
    throw new Error('Error fetching new refreshToken');
  }
}
