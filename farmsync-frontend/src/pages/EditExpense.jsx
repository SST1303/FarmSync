import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiFetch } from "../services/api";
import { useLanguage } from "../context/LanguageContext";
import translations from "../translations/translations";
import "./AddExpense.css";

function EditExpense() {

    const { id } = useParams();
    const navigate = useNavigate();

    const { language } = useLanguage();
    const t = translations[language];

    const [crops, setCrops] = useState([]);

    const [expense, setExpense] = useState({
        expenseType: "",
        amount: "",
        expenseDate: "",
        description: "",
        cropId: ""
    });


    useEffect(() => {

        apiFetch(`/expenses/${id}`)
            .then(response => response.json())
            .then(data => {

                setExpense({
                    expenseType: data.expenseType,
                    amount: data.amount,
                    expenseDate: data.expenseDate,
                    description: data.description || "",
                    cropId: data.crop?.id || ""
                });

            })
            .catch(error => {

                console.error("Error fetching expense:", error);

            });


        apiFetch("/crops")
            .then(response => response.json())
            .then(data => {

                setCrops(data);

            })
            .catch(error => {

                console.error("Error fetching crops:", error);

            });

    }, [id]);


    const handleChange = (e) => {

        const { name, value } = e.target;

        setExpense({
            ...expense,
            [name]: value
        });

    };


    const handleSubmit = (e) => {

        e.preventDefault();


        // Amount validation

        if (Number(expense.amount) <= 0) {

            alert(
                language === "en"
                    ? "Amount must be greater than 0."
                    : "रक्कम 0 पेक्षा जास्त असणे आवश्यक आहे."
            );

            return;
        }


        // Crop validation

        if (!expense.cropId) {

            alert(
                language === "en"
                    ? "Please select a crop."
                    : "कृपया पीक निवडा."
            );

            return;
        }


        const expenseData = {
            expenseType: expense.expenseType,
            amount: Number(expense.amount),
            expenseDate: expense.expenseDate,
            description: expense.description,
            crop: {
                id: Number(expense.cropId)
            }
        };


        apiFetch(`/expenses/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(expenseData)

        })
            .then(response => {

                if (!response.ok) {
                    throw new Error("Failed to update expense");
                }

                return response.json();

            })
            .then(() => {

                alert(
                    language === "en"
                        ? "Expense updated successfully!"
                        : "खर्च यशस्वीरित्या अपडेट केला गेला!"
                );

                navigate("/expenses");

            })
            .catch(error => {

                console.error("Error updating expense:", error);

                alert(
                    language === "en"
                        ? "Failed to update expense"
                        : "खर्च अपडेट करता आला नाही."
                );

            });

    };


    return (

        <div className="add-expense-page">

            <div className="add-expense-container">

                <h1>
                    {t.editExpense}
                </h1>


                <p className="form-subtitle">

                    {language === "en"
                        ? "Update your crop expense"
                        : "तुमच्या पिकाच्या खर्चाची नोंद अपडेट करा"}

                </p>


                <form onSubmit={handleSubmit}>


                    {/* Expense Type */}

                    <div className="form-group">

                        <label>
                            {t.expenseType}
                        </label>

                        <select
                            name="expenseType"
                            value={expense.expenseType}
                            onChange={handleChange}
                            required
                        >

                            <option value="">
                                {language === "en"
                                    ? "Select Expense Type"
                                    : "खर्चाचा प्रकार निवडा"}
                            </option>

                            <option value="Seeds">
                                {language === "en"
                                    ? "Seeds"
                                    : "बियाणे"}
                            </option>

                            <option value="Fertilizer">
                                {language === "en"
                                    ? "Fertilizer"
                                    : "खत"}
                            </option>

                            <option value="Pesticide">
                                {language === "en"
                                    ? "Pesticide"
                                    : "कीटकनाशक"}
                            </option>

                            <option value="Labor">
                                {language === "en"
                                    ? "Labor"
                                    : "मजुरी"}
                            </option>

                            <option value="Equipment">
                                {language === "en"
                                    ? "Equipment"
                                    : "उपकरणे"}
                            </option>

                            <option value="Other">
                                {language === "en"
                                    ? "Other"
                                    : "इतर"}
                            </option>

                        </select>

                    </div>


                    {/* Amount */}

                    <div className="form-group">

                        <label>
                            {t.amount}
                        </label>

                        <input
                            type="number"
                            name="amount"
                            value={expense.amount}
                            onChange={handleChange}
                            min="0"
                            required
                        />

                    </div>


                    {/* Expense Date */}

                    <div className="form-group">

                        <label>
                            {t.expenseDate}
                        </label>

                        <input
                            type="date"
                            name="expenseDate"
                            value={expense.expenseDate}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* Description */}

                    <div className="form-group">

                        <label>
                            {t.description}
                        </label>

                        <textarea
                            name="description"
                            value={expense.description}
                            onChange={handleChange}
                            rows="4"
                        ></textarea>

                    </div>


                    {/* Crop */}

                    <div className="form-group">

                        <label>
                            {t.crop}
                        </label>

                        <select
                            name="cropId"
                            value={expense.cropId}
                            onChange={handleChange}
                            required
                        >

                            <option value="">
                                {language === "en"
                                    ? "Select Crop"
                                    : "पीक निवडा"}
                            </option>

                            {crops.map(crop => (

                                <option
                                    key={crop.id}
                                    value={crop.id}
                                >
                                    {crop.cropName}
                                </option>

                            ))}

                        </select>

                    </div>


                    {/* Buttons */}

                    <div className="form-buttons">

                        <button
                            type="submit"
                            className="save-expense-btn"
                        >
                            {language === "en"
                                ? "Update Expense"
                                : "खर्च अपडेट करा"}
                        </button>


                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() => navigate("/expenses")}
                        >
                            {language === "en"
                                ? "Cancel"
                                : "रद्द करा"}
                        </button>

                    </div>


                </form>

            </div>

        </div>

    );

}

export default EditExpense;

