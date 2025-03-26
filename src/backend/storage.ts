import secureLocalStorage from "react-secure-storage";
import { AuthCredentials } from "./loginApi";

export const storeTokenData = async (authToken: AuthCredentials) => {
    try {
        console.log(JSON.stringify(authToken));
        secureLocalStorage.setItem('tokenData', JSON.stringify(authToken));
    } catch (error) {
        console.log('Error storing token data:', error);
    }
};

export const getTokenData = () => {
    try {
        const authCredentials = secureLocalStorage.getItem('tokenData');
        if (authCredentials)
            return JSON.parse(<string>authCredentials);
        else
            throw new Error("Token data undefined")
    } catch (error) {
        console.log('Error retrieving token:', error);
    }
};

export const clearAuthToken = () => {
    try {
        secureLocalStorage.removeItem('tokenData');
    } catch (error) {
    }
};
