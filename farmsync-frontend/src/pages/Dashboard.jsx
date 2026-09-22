import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";
import { useLanguage } from "../context/LanguageContext";
import translations from "../translations/translations";
import "./Dashboard.css";

function Dashboard() {

    const navigate = useNavigate();

    const { language } = useLanguage();
    const t = translations[language];

    const [crops, setCrops] = useState([]);
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {

        apiFetch("/crops")
            .then(response => response.json())
            .then(data => {
                setCrops(data);
            })
            .catch(error => {
                console.error("Error fetching crops:", error);
            });

        apiFetch("/expenses")
            .then(response => response.json())
            .then(data => {
                setExpenses(data);
            })
            .catch(error => {
                console.error("Error fetching expenses:", error);
            });

    }, []);

    const totalExpenses = expenses.reduce(
        (total, expense) => total + Number(expense.amount),
        0
    );

    // Crop status counts
    const growingCrops = crops.filter(
        crop => crop.status === "Growing"
    ).length;

    const readyCrops = crops.filter(
        crop => crop.status === "Ready"
    ).length;

    const harvestedCrops = crops.filter(
        crop => crop.status === "Harvested"
    ).length;

    return (
        <div className="dashboard-page">

            <div className="dashboard-container">

                {/* Dashboard Header */}
                <div className="dashboard-header">

                    <h1>
                        FarmSync {t.dashboard}
                    </h1>

                    <p>
                        {language === "en"
                            ? "Manage your crops and track your farming expenses"
                            : "तुमची पिके व्यवस्थापित करा आणि शेतीच्या खर्चाचा मागोवा घ्या"}
                    </p>

                </div>


                {/* Main Dashboard Cards */}
                <div className="dashboard-cards">

                    <div className="dashboard-card">

                        <div className="card-icon">🌱</div>

                        <div>
                            <p>{t.totalCrops}</p>
                            <h2>{crops.length}</h2>
                        </div>

                    </div>


                    <div className="dashboard-card">

                        <div className="card-icon">💰</div>

                        <div>
                            <p>{t.totalExpenses}</p>

                            <h2>
                                ₹{totalExpenses.toFixed(2)}
                            </h2>
                        </div>

                    </div>


                    <div className="dashboard-card">

                        <div className="card-icon">📋</div>

                        <div>
                            <p>{t.totalExpenseRecords}</p>
                            <h2>{expenses.length}</h2>
                        </div>

                    </div>

                </div>


                {/* Quick Actions */}
                <div className="dashboard-section">

                    <h2>{t.quickActions}</h2>

                    <div className="quick-actions">

                        <button
                            onClick={() => navigate("/add-crop")}
                        >
                            + {t.addCrop}
                        </button>

                        <button
                            onClick={() => navigate("/add-expense")}
                        >
                            + {t.addExpense}
                        </button>

                        <button
                            onClick={() => navigate("/crops")}
                        >
                            {t.viewCrops}
                        </button>

                        <button
                            onClick={() => navigate("/expenses")}
                        >
                            {t.viewExpenses}
                        </button>

                    </div>

                </div>


                {/* Crop Status Summary */}
                <div className="dashboard-section">

                    <h2>{t.cropStatusSummary}</h2>

                    <div className="dashboard-cards">

                        <div className="dashboard-card">

                            <div className="card-icon">🌱</div>

                            <div>
                                <p>{t.growing}</p>
                                <h2>{growingCrops}</h2>
                            </div>

                        </div>


                        <div className="dashboard-card">

                            <div className="card-icon">🌾</div>

                            <div>
                                <p>{t.ready}</p>
                                <h2>{readyCrops}</h2>
                            </div>

                        </div>


                        <div className="dashboard-card">

                            <div className="card-icon">✅</div>

                            <div>
                                <p>{t.harvested}</p>
                                <h2>{harvestedCrops}</h2>
                            </div>

                        </div>

                    </div>

                </div>


                {/* My Crops */}
                <div className="dashboard-section">

                    <h2>{t.myCrops}</h2>

                    {crops.length === 0 ? (

                        <p>{t.noCropsFound}</p>

                    ) : (

                        <div className="crop-cards">

                            {crops.map(crop => (

                                <div
                                    className="crop-card"
                                    key={crop.id}
                                >

                                    <h3>{crop.cropName}</h3>

                                    <p>
                                        {t.area}: {crop.area} {t.acres}
                                    </p>

                                    <p>
                                        {t.startDate}: {crop.startDate}
                                    </p>

                                    <p>
                                        {t.expectedHarvest}:{" "}
                                        {crop.expectedHarvestDate}
                                    </p>

                                    <span className="crop-status">

                                        {crop.status === "Growing"
                                            ? t.growing
                                            : crop.status === "Ready"
                                                ? t.ready
                                                : crop.status === "Harvested"
                                                    ? t.harvested
                                                    : crop.status}

                                    </span>

                                </div>

                            ))}

                        </div>

                    )}

                </div>


                {/* Recent Expenses */}
                <div className="dashboard-section">

                    <h2>{t.recentExpenses}</h2>

                    {expenses.length === 0 ? (

                        <p>{t.noExpensesFound}</p>

                    ) : (

                        <div className="recent-expenses">

                            {expenses
                                .slice(-5)
                                .reverse()
                                .map(expense => (

                                    <div
                                        className="recent-expense"
                                        key={expense.id}
                                    >

                                        <div>

                                            <h4>
                                                {expense.expenseType === "Seeds"
                                                    ? t.seeds
                                                    : expense.expenseType === "Fertilizer"
                                                        ? t.fertilizer
                                                        : expense.expenseType === "Pesticide"
                                                            ? t.pesticide
                                                            : expense.expenseType === "Labor"
                                                                ? t.labor
                                                                : expense.expenseType === "Equipment"
                                                                    ? t.equipment
                                                                    : expense.expenseType === "Other"
                                                                        ? t.other
                                                                        : expense.expenseType}
                                            </h4>

                                            <p>
                                                {expense.crop?.cropName || "N/A"}
                                            </p>

                                        </div>


                                        <div className="recent-expense-right">

                                            <strong>
                                                ₹{expense.amount}
                                            </strong>

                                            <span>
                                                {expense.expenseDate}
                                            </span>

                                        </div>

                                    </div>

                                ))}

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
}

export default Dashboard;