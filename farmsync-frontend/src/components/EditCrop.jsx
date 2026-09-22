import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiFetch } from "../services/api";
import { useLanguage } from "../context/LanguageContext";
import translations from "../translations/translations";
import "./EditCrop.css";

function EditCrop() {

    const { id } = useParams();
    const navigate = useNavigate();

    const { language } = useLanguage();
    const t = translations[language];

    const [crop, setCrop] = useState({
        cropName: "",
        area: "",
        startDate: "",
        expectedHarvestDate: "",
        status: "Growing"
    });

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        apiFetch(`/crops/${id}`)
            .then((response) => {

                if (!response.ok) {
                    throw new Error("Failed to fetch crop");
                }

                return response.json();
            })
            .then((data) => {

                setCrop({
                    cropName: data.cropName || "",
                    area: data.area || "",
                    startDate: data.startDate || "",
                    expectedHarvestDate: data.expectedHarvestDate || "",
                    status: data.status || "Growing"
                });

                setLoading(false);

            })
            .catch((error) => {

                console.error("Error:", error);

                alert(
                    language === "en"
                        ? "Failed to load crop"
                        : "पीक लोड करता आले नाही."
                );

                setLoading(false);

            });

    }, [id, language]);


    const handleChange = (e) => {

        setCrop({
            ...crop,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();


        // Area validation

        if (parseFloat(crop.area) <= 0) {

            alert(
                language === "en"
                    ? "Area must be greater than 0."
                    : "क्षेत्रफळ 0 पेक्षा जास्त असणे आवश्यक आहे."
            );

            return;
        }


        // Date validation

        if (crop.expectedHarvestDate < crop.startDate) {

            alert(
                language === "en"
                    ? "Expected Harvest Date cannot be before Start Date."
                    : "अपेक्षित कापणीची तारीख लागवड तारखेपूर्वी असू शकत नाही."
            );

            return;
        }


        try {

            const response = await apiFetch(`/crops/${id}`, {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    cropName: crop.cropName,
                    area: parseFloat(crop.area),
                    startDate: crop.startDate,
                    expectedHarvestDate: crop.expectedHarvestDate,
                    status: crop.status
                })

            });


            if (!response.ok) {
                throw new Error("Failed to update crop");
            }


            alert(
                language === "en"
                    ? "Crop updated successfully!"
                    : "पीक यशस्वीरित्या अपडेट केले!"
            );


            navigate("/crops");


        } catch (error) {

            console.error("Error:", error);

            alert(
                language === "en"
                    ? "Failed to update crop"
                    : "पीक अपडेट करता आले नाही."
            );

        }

    };


    if (loading) {

        return (
            <p>
                {language === "en"
                    ? "Loading crop..."
                    : "पीक लोड होत आहे..."}
            </p>
        );

    }


    return (

        <div className="edit-crop-container">

            <div className="edit-crop-card">

                <h2>
                    {t.editCrop}
                </h2>


                <form onSubmit={handleSubmit}>


                    {/* Crop Name */}

                    <div className="form-group">

                        <label>
                            {t.cropName}
                        </label>

                        <input
                            type="text"
                            name="cropName"
                            value={crop.cropName}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* Area */}

                    <div className="form-group">

                        <label>
                            {t.area}
                        </label>

                        <input
                            type="number"
                            name="area"
                            value={crop.area}
                            onChange={handleChange}
                            step="0.1"
                            min="0"
                            required
                        />

                    </div>


                    {/* Start Date */}

                    <div className="form-group">

                        <label>
                            {t.startDate}
                        </label>

                        <input
                            type="date"
                            name="startDate"
                            value={crop.startDate}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* Expected Harvest Date */}

                    <div className="form-group">

                        <label>
                            {t.expectedHarvest}
                        </label>

                        <input
                            type="date"
                            name="expectedHarvestDate"
                            value={crop.expectedHarvestDate}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* Status */}

                    <div className="form-group">

                        <label>
                            {t.status}
                        </label>

                        <select
                            name="status"
                            value={crop.status}
                            onChange={handleChange}
                        >

                            <option value="Growing">
                                {t.growing}
                            </option>

                            <option value="Ready">
                                {t.ready}
                            </option>

                            <option value="Harvested">
                                {t.harvested}
                            </option>

                        </select>

                    </div>


                    {/* Update */}

                    <button
                        type="submit"
                        className="update-crop-btn"
                    >
                        {language === "en"
                            ? "Update Crop"
                            : "पीक अपडेट करा"}
                    </button>


                </form>

            </div>

        </div>

    );

}

export default EditCrop;

