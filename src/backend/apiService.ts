import { AxiosResponse } from "axios";
import api from "./axiosInstance";

export interface RecipeResponse {
    id: string;
    name: string;
    steps: string[];
    ingredients: IngredientResponse[];
}

export interface IngredientResponse {
    id: string;
    name: string;
    allergens: AllergenResponse[];
}

export interface AllergenResponse {
    id: string;
    name: string;
}

export const fetchRecipe = async (recipeId: string): Promise<RecipeResponse> => {
    try {
        const response: AxiosResponse<RecipeResponse> = await api.get(`/v1/recipes/${recipeId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching Recipe: ${recipeId}`);
    }
};