import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";

import { fetchDailyData } from "../../api";
import styles from "./Charts.module.css";

export default function Charts({ countryData, selectedCountry }) {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchDailyData();
            if (!dailyData.length) {
                setDailyData(data);
            }
        };
        fetchData();
    }, [dailyData.length]);

    const lineChart = dailyData.length ? (
        <Line
            data={{
                labels: dailyData.map(({ date }) => date),
                datasets: [
                    {
                        data: dailyData.map(({ confirmed }) => confirmed),
                        label: "Infected",
                        borderColor: "#3333ff",
                        fill: true
                    },
                    {
                        data: dailyData.map(({ deaths }) => deaths),
                        label: "Deaths",
                        borderColor: "red",
                        backgroundColor: "rgba(255,0,0,0.5)",
                        fill: true
                    }
                ]
            }}
        />
    ) : null;

    const barChart = selectedCountry ? (
        <Bar
            data={{
                labels: ["Infected", "Recovered", "Deaths"],
                datasets: [
                    {
                        label: "people",
                        backgroundColor: [
                            "rgba(0,0,255,0.5)",
                            "rgba(0,255,0,0.5)",
                            "rgba(255,0,0,0.5)"
                        ],
                        data: [
                            countryData.confirmed.value,
                            countryData.recovered.value,
                            countryData.deaths.value
                        ]
                    }
                ]
            }}
            options={{
                legend: { display: false },
                title: {
                    display: true,
                    text: `Current state in ${selectedCountry}`
                }
            }}
        />
    ) : null;

    return (
        <div className={styles.container}>
            {selectedCountry ? barChart : lineChart}
        </div>
    );
}
