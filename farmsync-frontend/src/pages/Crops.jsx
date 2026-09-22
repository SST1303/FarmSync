import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../services/api";
import { useLanguage } from "../context/LanguageContext";
import translations from "../translations/translations";
import "./Crops.css";

function Crops() {

    const [crops, setCrops] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const navigate = useNavigate();

    const { language } = useLanguage();
    const t = translations[language];

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        apiFetch("/crops")
            .then(response => {

                if (!response.ok) {
                    throw new Error("Failed to fetch crops");
                }

                return response.json();
            })
            .then(data => {

                setCrops(data);
                setLoading(false);

            })
            .catch(error => {

                console.error("Error fetching crops:", error);

                setError(
                    language === "en"
                        ? "Unable to load crops. Please try again."
                        : "पिके लोड करता आली नाहीत. कृपया पुन्हा प्रयत्न करा."
                );

                setLoading(false);

            });


        apiFetch("/expenses")
            .then(response => {

                if (!response.ok) {
                    throw new Error("Failed to fetch expenses");
                }

                return response.json();
            })
            .then(data => {

                setExpenses(data);

            })
            .catch(error => {

                console.error("Error fetching expenses:", error);

            });

    }, [language]);


    const getCropTotalExpense = (cropId) => {

        return expenses
            .filter(expense => expense.crop?.id === cropId)
            .reduce(
                (total, expense) => total + Number(expense.amount),
                0
            );

    };


    const handleDelete = (id) => {

        const confirmDelete = window.confirm(
            language === "en"
                ? "Are you sure you want to delete this crop?"
                : "तुम्हाला हे पीक हटवायचे आहे का?"
        );

        if (!confirmDelete) {
            return;
        }

        apiFetch(`/crops/${id}`, {
            method: "DELETE"
        })
            .then(response => {

                if (!response.ok) {
                    throw new Error("Failed to delete crop");
                }

                setCrops(
                    crops.filter(crop => crop.id !== id)
                );

            })
            .catch(error => {

                console.error("Error deleting crop:", error);

                alert(
                    language === "en"
                        ? "Failed to delete crop"
                        : "पीक हटवता आले नाही."
                );

            });

    };


    return (
        <div className="crops-page">

            <div className="crops-container">

                {/* Header */}

                <div className="crops-header">

                    <div>

                        <h1>{t.crops}</h1>

                        <p>
                            {t.manageTrackCrops}
                        </p>

                    </div>

                    <button
                        className="add-crop-btn"
                        onClick={() => navigate("/add-crop")}
                    >
                        + {t.addCrop}
                    </button>

                </div>


                {/* Loading */}

                {loading && (

                    <div className="no-crops">

                        <h3>
                            {t.loadingCrops}
                        </h3>

                    </div>

                )}


                {/* Error */}

                {!loading && error && (

                    <div className="no-crops">

                        <h3>
                            ⚠️ {error}
                        </h3>

                    </div>

                )}


                {/* No Crops */}

                {!loading && !error && crops.length === 0 && (

                    <div className="no-crops">

                        <h3>
                            {t.noCrops}
                        </h3>

                        <p>
                            {t.startAddingCrops}
                        </p>

                    </div>

                )}


                {/* Crops Table */}

                {!loading && !error && crops.length > 0 && (

                    <div className="table-container">

                        <table className="crops-table">

                            <thead>

                                <tr>

                                    <th>ID</th>

                                    <th>{t.cropName}</th>

                                    <th>{t.area}</th>

                                    <th>{t.startDate}</th>

                                    <th>{t.expectedHarvest}</th>

                                    <th>{t.status}</th>

                                    <th>{t.totalExpenses}</th>

                                    <th>{t.actions}</th>

                                </tr>

                            </thead>


                            <tbody>

                                {crops.map((crop, index) => (

                                    <tr key={crop.id}>

                                        <td>
                                            {index + 1}
                                        </td>

                                        <td>
                                            <strong>
                                                {crop.cropName}
                                            </strong>
                                        </td>

                                        <td>
                                            {crop.area} {t.acres}
                                        </td>

                                        <td>
                                            {crop.startDate}
                                        </td>

                                        <td>
                                            {crop.expectedHarvestDate}
                                        </td>

                                        <td>

                                            <span className="crop-status">

                                                {crop.status === "Growing"
                                                    ? t.growing
                                                    : crop.status === "Ready"
                                                        ? t.ready
                                                        : crop.status === "Harvested"
                                                            ? t.harvested
                                                            : crop.status}

                                            </span>

                                        </td>

                                        <td>
                                            ₹{getCropTotalExpense(crop.id).toFixed(2)}
                                        </td>

                                        <td>

                                            <button
                                                className="edit-btn"
                                                onClick={() =>
                                                    navigate(
                                                        `/edit-crop/${crop.id}`
                                                    )
                                                }
                                            >
                                                {t.edit}
                                            </button>


                                            <button
                                                className="delete-btn"
                                                onClick={() =>
                                                    handleDelete(crop.id)
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

export default Crops;