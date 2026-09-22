import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../services/api";
import { useLanguage } from "../context/LanguageContext";
import translations from "../translations/translations";
import "./Expenses.css";

function Expenses() {

    const [expenses, setExpenses] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const { language } = useLanguage();
    const t = translations[language];

    const totalExpenses = expenses.reduce(
        (total, expense) => total + Number(expense.amount),
        0
    );

    useEffect(() => {

        apiFetch("/expenses")
            .then(response => {

                if (!response.ok) {
                    throw new Error("Failed to fetch expenses");
                }

                return response.json();
            })
            .then(data => {

                setExpenses(data);
                setLoading(false);

            })
            .catch(error => {

                console.error("Error fetching expenses:", error);

                setError(
                    language === "en"
                        ? "Unable to load expenses. Please try again."
                        : "खर्चाच्या नोंदी लोड करता आल्या नाहीत. कृपया पुन्हा प्रयत्न करा."
                );

                setLoading(false);

            });

    }, [language]);


    const handleDelete = (id) => {

        const confirmDelete = window.confirm(
            language === "en"
                ? "Are you sure you want to delete this expense?"
                : "तुम्हाला हा खर्च हटवायचा आहे का?"
        );

        if (!confirmDelete) {
            return;
        }

        apiFetch(`/expenses/${id}`, {
            method: "DELETE"
        })
            .then(response => {

                if (!response.ok) {
                    throw new Error("Failed to delete expense");
                }

                setExpenses(
                    expenses.filter(expense => expense.id !== id)
                );

            })
            .catch(error => {

                console.error("Error deleting expense:", error);

                alert(
                    language === "en"
                        ? "Failed to delete expense"
                        : "खर्च हटवता आला नाही."
                );

            });
    };


    return (
        <div className="expenses-page">

            <div className="expenses-container">

                {/* Header */}

                <div className="expenses-header">

                    <div>

                        <h1>
                            {t.expenseRecords}
                        </h1>

                        <p>
                            {t.manageTrackExpenses}
                        </p>

                    </div>

                    <button
                        className="add-expense-btn"
                        onClick={() => navigate("/add-expense")}
                    >
                        + {t.addExpense}
                    </button>

                </div>


                {/* Total Expenses */}

                <div className="total-expense-card">

                    <div>

                        <p>
                            {t.totalExpenses}
                        </p>

                        <h2>
                            ₹{totalExpenses.toFixed(2)}
                        </h2>

                    </div>

                </div>


                {/* Loading */}

                {loading && (

                    <div className="no-expenses">

                        <h3>
                            {t.loadingExpenses}
                        </h3>

                    </div>

                )}


                {/* Error */}

                {!loading && error && (

                    <div className="no-expenses">

                        <h3>
                            ⚠️ {error}
                        </h3>

                    </div>

                )}


                {/* No Expenses */}

                {!loading && !error && expenses.length === 0 && (

                    <div className="no-expenses">

                        <h3>
                            {t.noExpenses}
                        </h3>

                        <p>
                            {language === "en"
                                ? "Start adding expenses to track your crop costs."
                                : "तुमच्या पिकांचा खर्च ट्रॅक करण्यासाठी खर्चाच्या नोंदी जोडण्यास सुरुवात करा."}
                        </p>

                    </div>

                )}


                {/* Expenses Table */}

                {!loading && !error && expenses.length > 0 && (

                    <div className="table-container">

                        <table className="expenses-table">

                            <thead>

                                <tr>

                                    <th>ID</th>

                                    <th>
                                        {t.expenseType}
                                    </th>

                                    <th>
                                        {t.amount}
                                    </th>

                                    <th>
                                        {t.expenseDate}
                                    </th>

                                    <th>
                                        {t.description}
                                    </th>

                                    <th>
                                        {t.crop}
                                    </th>

                                    <th>
                                        {t.actions}
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {expenses.map((expense, index) => (

                                    <tr key={expense.id}>

                                        <td>
                                            {index + 1}
                                        </td>

                                        <td>

                                            <span className="expense-type">
                                                {expense.expenseType}
                                            </span>

                                        </td>

                                        <td className="amount">
                                            ₹{expense.amount}
                                        </td>

                                        <td>
                                            {expense.expenseDate}
                                        </td>

                                        <td>
                                            {expense.description || "-"}
                                        </td>

                                        <td>
                                            {expense.crop?.cropName || "N/A"}
                                        </td>

                                        <td>

                                            <button
                                                className="edit-btn"
                                                onClick={() =>
                                                    navigate(
                                                        `/edit-expense/${expense.id}`
                                                    )
                                                }
                                            >
                                                {t.edit}
                                            </button>

                                            <button
                                                className="delete-btn"
                                                onClick={() =>
                                                    handleDelete(expense.id)
                                                }
                                            >
                                                {t.delete}
                                            </button>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>
    );
}

export default Expenses;
