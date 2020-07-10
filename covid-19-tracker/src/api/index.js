import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
    const countrySpecific = country === "global" ? "" : `countries/${country}`;
    try {
        const {
            data: { confirmed, deaths, recovered, lastUpdate }
        } = await axios.get(`${url}/${countrySpecific}`);

        return { confirmed, deaths, recovered, lastUpdate };
    } catch (error) {}
};

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);
        const modifiedData = data.map((dailyData) => {
            return {
                confirmed: dailyData.confirmed.total,
                deaths: dailyData.deaths.total,
                date: dailyData.reportDate
            };
        });
        return modifiedData;
    } catch (error) {}
};

export const fetchCountryNames = async () => {
    try {
        const {
            data: { countries }
        } = await axios.get(`${url}/countries`);
        const modifiedData = countries.map(({ name }) => name);
        return modifiedData;
    } catch (error) {}
};
