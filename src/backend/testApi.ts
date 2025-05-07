import * as api from "../backend/apiService";
import * as loginApi from "../backend/loginApi";
import {RecipeResponse, UserResponse} from "../backend/apiService";

const testFetchRecipe = async () => {
    const recipe: RecipeResponse = await api.fetchRecipe(24);
    if (!recipe.name) throw new Error('Recipe name is empty');
    if (!recipe.ingredients || recipe.ingredients.length === 0) throw new Error('Recipe ingredients missing');
    if (!recipe.steps || recipe.steps.length === 0) throw new Error('Recipe ingredients missing');
    if (recipe.name !== "Pasta Carbonara") throw new Error('Recipe name does not match');

    await api.fetchRecipe(10000)
        .catch(error => {
            if (!error.toString().includes('Error fetching recipe')) {
                throw new Error(`Expected recipe error`);
            }
        });

    console.log("testFetchRecipe passed");
}

const testSearchRecipes = async () => {

    const byName = await api.searchRecipes('Carbonara', 'name');
    if (!Array.isArray(byName) || byName.length === 0) {
        throw new Error(`Incorrect name search result length ${byName.length}`);
    }

    const sample = byName[0];
    if (!sample.id || !sample.name || !Array.isArray(sample.ingredients) || !Array.isArray(sample.steps)) {
        throw new Error(`Bad recipe returned by searchRecipes`);
    }

    const byIngredient = await api.searchRecipes('Eggs', 'ingredient');
    if (!Array.isArray(byIngredient) || byIngredient.length === 0) {
        throw new Error(`Incorrect ingredient search result length ${byIngredient.length}`);
    }

    const nameBad = await api.searchRecipes('UFGEWOIUWGFOIUWERGOWEUIWE', 'name');
    if (!Array.isArray(nameBad) || nameBad.length !== 0) {
        throw new Error(`Incorrect name search result length ${nameBad.length}`);
    }

    console.log('testSearchRecipes passed');
};

const testFetchUser = async () => {
    const user: UserResponse = await api.fetchUser();
    if (!user.email) throw new Error('User email is empty');
    if (!user.savedRecipeIds) throw new Error('Saved recipes missing');

    console.log("testFetchUser passed");
};

const testSaveRecipe = async () => {
    await api.removeSavedRecipe(24).catch(() => {});

    await api.saveRecipe(24);
    const userAfterSave = await api.fetchUser();
    if (!userAfterSave.savedRecipeIds.includes(24)) {
        throw new Error(`Recipe 24 was not added to savedRecipeIds`);
    }

    await api.removeSavedRecipe(24);

    await api.saveRecipe(10000).catch(error => {
        if (!error.toString().includes('saving recipe')) {
            throw new Error('Expected saving recipe error');
        }
    });

    console.log('testSaveRecipe passed');
};

const testFetchRecipesBatch = async () => {
    const batch = await api.fetchRecipesBatch([24, 25]);
    if (!Array.isArray(batch) || batch.length !== 2) {
        throw new Error(`Expected 2 recipes, got ${batch.length}`);
    }
    const ids = batch.map(r => r.id);
    if (!ids.includes(24) || !ids.includes(25)) {
        throw new Error(`Batch missing expected IDs. Got [${ids.join(', ')}]`);
    }

    await api.fetchRecipesBatch([999999])
        .catch(error => {
        if (!error.toString().includes('recipes')) {
            throw new Error(`Expected recipe error`);
        }
    });

    console.log('testFetchRecipesBatch passed');
};

const testLogin = async () => {
    loginApi.logIn('bademail@gmail.com', 'password')
        .catch(error => {
            if (!error.toString().includes('Error logging user in')) {
                throw new Error(`Unexpected error in login test`);
            }
        });
    loginApi.logIn('gaglianopa@gmail.com', 'password').then();
    console.log("testLogin passed");
}


export const runTests = () => {
    console.log("Running tests...");
    testLogin().then(() => {
        testFetchRecipesBatch().then();
        testSaveRecipe().then();
        testFetchUser().then();
        testSearchRecipes().then();
        testFetchRecipe().then();
    });
}
