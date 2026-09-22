import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import translations from "../translations/translations";
import "./Login.css";

function Login() {

    const navigate = useNavigate();

    const { language } = useLanguage();
    const t = translations[language];

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(
                "http://localhost:55681/api/auth/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );


            const data = await response.json();


            if (!response.ok) {

                alert(data);
                return;

            }


            console.log("Login successful:", data);


            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data));


            navigate("/");


        } catch (error) {

            console.error("Login error:", error);

            alert(
                language === "en"
                    ? "Something went wrong"
                    : "काहीतरी चूक झाली."
            );

        }

    };


    return (

        <div className="login-page">

            <div className="login-container">

                <h2>
                    FarmSync {t.login}
                </h2>


                <p className="login-subtitle">

                    {language === "en"
                        ? "Login to manage your crops and expenses"
                        : "तुमची पिके आणि खर्च व्यवस्थापित करण्यासाठी लॉगिन करा"}

                </p>


                <form onSubmit={handleLogin}>


                    {/* Email */}

                    <div className="login-form-group">

                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            placeholder={
                                language === "en"
                                    ? "Enter email"
                                    : "ईमेल टाका"
                            }
                            required
                        />

                    </div>


                    {/* Password */}

                    <div className="login-form-group">

                        <label>
                            {language === "en"
                                ? "Password"
                                : "पासवर्ड"}
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder={
                                language === "en"
                                    ? "Enter password"
                                    : "पासवर्ड टाका"
                            }
                            required
                        />

                    </div>


                    {/* Login Button */}

                    <button
                        type="submit"
                        className="login-btn"
                    >
                        {t.login}
                    </button>


                </form>


                {/* Register */}

                <p className="register-link">

                    {language === "en"
                        ? "Don't have an account?"
                        : "तुमचे खाते नाही का?"}{" "}


                    <button
                        type="button"
                        onClick={() => navigate("/register")}
                    >
                        {t.register}
                    </button>

                </p>


            </div>

        </div>

    );

}

export default Login;

