import React, {useState} from 'react';
import '../style/pages/LoginPage.scss';
import * as loginApi from "../backend/loginApi";
import {useNavigate} from "react-router-dom";


const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [emailText, setEmailText] = useState<string>("");
    const [passwordText, setPasswordText] = useState<string>("");

    const emailLogin = () => {
        loginApi.logIn(emailText, passwordText).then(r => {
            navigate("/recipes");
        });
    }

    const emailCreateAccount = () => {
        loginApi.register(emailText, passwordText).then(r => {
            loginApi.logIn(emailText, passwordText).then(r => {
                navigate("/recipes");
            });
        });
    }

    return (
        <div className="login-page">
            <div className="login-options-box">
                <h1>Sign In</h1>
                <h4>- or create an account -</h4>
                <div className="divider-line" />
                <input
                    className="email-input"
                    placeholder="Email Address"
                    value={emailText}
                    onChange={(event) => setEmailText(event.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter")
                            emailLogin();
                    }}
                />
                <input
                    className="email-input"
                    placeholder="Password"
                    value={passwordText}
                    onChange={(event) => setPasswordText(event.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter")
                            emailLogin();
                    }}
                />
                <button
                    onClick={emailLogin}
                    className="login-option">
                    Login
                </button>
                <button
                    onClick={emailCreateAccount}
                    className="create-account-option">
                    Create Account
                </button>
            </div>
        </div>
    )
};

export default LoginPage;