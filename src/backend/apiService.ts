import { AxiosResponse } from "axios";
import api from "./axiosInstance";

export interface RecipeResponse {
    id: number;
    name: string;
    steps: string[];
    ingredients: string[];
    allergens: string[];
    image: string;
}

export const fetchRecipe = async (recipeId: string): Promise<RecipeResponse> => {
    try {
        const response: AxiosResponse<RecipeResponse> = await api.get(`/v1/recipes/${recipeId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching recipe: ${recipeId}`);
    }
};

export const searchRecipes = async (query: string): Promise<RecipeResponse[]> => {
    try {
        const response: AxiosResponse<RecipeResponse[]> = await api.get(`/v1/recipes/search?q=${query}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error searching recipes: ${error}`);
    }
};