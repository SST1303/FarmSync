import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../services/api";
import { useLanguage } from "../context/LanguageContext";
import translations from "../translations/translations";
import "./AddCrop.css";

function AddCrop() {

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

            const response = await apiFetch("/crops", {

                method: "POST",

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
                throw new Error("Failed to add crop");
            }


            alert(
                language === "en"
                    ? "Crop added successfully!"
                    : "पीक यशस्वीरित्या जोडले गेले!"
            );


            navigate("/crops");


        } catch (error) {

            console.error("Error:", error);

            alert(
                language === "en"
                    ? "Failed to add crop"
                    : "पीक जोडता आले नाही."
            );

        }

    };


    return (

        <div className="add-crop-container">

            <div className="add-crop-card">

                <h2>
                    {t.addCrop}
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
                            placeholder={
                                language === "en"
                                    ? "Enter crop name"
                                    : "पिकाचे नाव टाका"
                            }
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
                            placeholder={
                                language === "en"
                                    ? "Enter area"
                                    : "क्षेत्रफळ टाका"
                            }
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


                    {/* Submit */}

                    <button
                        type="submit"
                        className="add-crop-btn"
                    >
                        + {t.addCrop}
                    </button>


                </form>

            </div>

        </div>

    );

}

export default AddCrop;

