import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import translations from "../translations/translations";
import "./Navbar.css";

function Navbar() {

    const navigate = useNavigate();

    const { language, changeLanguage } = useLanguage();
    const t = translations[language];

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">

                <Link to="/" className="navbar-logo">
                    FarmSync
                </Link>

                <div className="navbar-links">

                    {token ? (
                        <>
                            <Link to="/">{t.dashboard}</Link>

                            <Link to="/crops">{t.crops}</Link>

                            <Link to="/expenses">{t.expenses}</Link>

                            <span>
                                {t.welcome}, {user?.name}
                            </span>

                            {/* Language Toggle */}
                            <select
                                value={language}
                                onChange={(e) =>
                                    changeLanguage(e.target.value)
                                }
                                className="language-select"
                            >
                                <option value="en">English</option>
                                <option value="mr">मराठी</option>
                            </select>

                            <button onClick={handleLogout}>
                                {t.logout}
                            </button>
                        </>
                    ) : (
                        <>
                            <select
                                value={language}
                                onChange={(e) =>
                                    changeLanguage(e.target.value)
                                }
                                className="language-select"
                            >
                                <option value="en">English</option>
                                <option value="mr">मराठी</option>
                            </select>

                            <Link to="/login">
                                {t.login}
                            </Link>
                        </>
                    )}

                </div>

            </div>
        </nav>
    );
}

export default Navbar;