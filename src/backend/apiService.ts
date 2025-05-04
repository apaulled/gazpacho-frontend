import { AxiosResponse } from "axios";
import api from "./axiosInstance";

export interface RecipeResponse {
    id: number;
    name: string;
    steps: string[];
    ingredients: string[];
    allergens: string[];
    image: string;
    description: string;
}

export interface UserResponse {
    id: number;
    email: string;
    savedRecipeIds: number[];
}

export const fetchRecipe = async (recipeId: number): Promise<RecipeResponse> => {
    try {
        const response: AxiosResponse<RecipeResponse> = await api.get(`/recipes/${recipeId}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching recipe: ${recipeId}`);
    }
};

export const searchRecipes = async (query: string, searchType: 'name'|'ingredient'|'allergen' = 'name'): Promise<RecipeResponse[]> => {
    try {
        const response: AxiosResponse<RecipeResponse[]> = await api.get(`/recipes/search?q=${query}&type=${searchType}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error searching recipes: ${error}`);
    }
};

export const fetchUser = async (): Promise<UserResponse> => {
    try {
        const response: AxiosResponse<UserResponse> = await api.get(`/users`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching user data: ${error}`);
    }
}

export const saveRecipe = async (recipeId: number): Promise<void> => {
    try {
        const response: AxiosResponse<void> = await api.post(`/users/recipes/${recipeId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error saving recipe: ${error}`);
    }
}

export const removeSavedRecipe = async (recipeId: number): Promise<void> => {
    try {
        const response: AxiosResponse<void> = await api.delete(`/users/recipes/${recipeId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error saving recipe: ${error}`);
    }
}

export const fetchRecipesBatch = async (recipeIds: number[]): Promise<RecipeResponse[]> => {
    try {
        const response: AxiosResponse<RecipeResponse[]> = await api.get(`/recipes/batch?ids=${recipeIds.join(',')}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching recipes: ${error}`);
    }
}