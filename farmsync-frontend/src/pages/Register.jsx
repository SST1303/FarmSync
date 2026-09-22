import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import translations from "../translations/translations";
import "./Register.css";

function Register() {

    const navigate = useNavigate();

    const { language } = useLanguage();
    const t = translations[language];

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleRegister = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(
                "http://localhost:55681/api/auth/register",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name: name,
                        email: email,
                        password: password
                    })
                }
            );


            const data = await response.text();


            if (!response.ok) {
                alert(data);
                return;
            }


            navigate("/login");


        } catch (error) {

            console.error("Registration error:", error);

            alert(t.somethingWentWrong);

        }
    };


    return (

        <div className="register-page">

            <div className="register-container">

                <h2>
                    FarmSync {t.register}
                </h2>


                <p className="register-subtitle">
                    {t.createAccount}
                </p>


                <form onSubmit={handleRegister}>


                    {/* Name */}

                    <div className="register-form-group">

                        <label>
                            {t.name}
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            placeholder={t.enterName}
                            required
                        />

                    </div>


                    {/* Email */}

                    <div className="register-form-group">

                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            placeholder={t.enterEmail}
                            required
                        />

                    </div>


                    {/* Password */}

                    <div className="register-form-group">

                        <label>
                            {t.password}
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder={t.enterPassword}
                            required
                        />

                    </div>


                    {/* Register Button */}

                    <button
                        type="submit"
                        className="register-btn"
                    >
                        {t.register}
                    </button>


                </form>


                {/* Login */}

                <p className="login-link">

                    {t.alreadyHaveAccount}{" "}

                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                    >
                        {t.login}
                    </button>

                </p>


            </div>

        </div>

    );
}

export default Register;