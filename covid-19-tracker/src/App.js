import React, { Component } from "react";

import styles from "./App.module.css";
import { Cards, Charts, CountryPicker } from "./components";
import { fetchData } from "./api";
import coronaImage from "./images/image.png";

export default class App extends Component {
    state = { data: {}, selectedCountry: "" };

    async componentDidMount() {
        const data = await fetchData("global");
        this.setState({ data: data });
    }

    handleCountryChange = async (country) => {
        const data = await fetchData(country);
        this.setState({ data: data, selectedCountry: country });
    };

    render() {
        const { data, selectedCountry } = this.state;
        return (
            <div className={styles.container}>
                <img
                    className={styles.image}
                    src={coronaImage}
                    alt="COVID-19"
                />
                <Cards data={data} />
                <CountryPicker changeCountry={this.handleCountryChange} />
                <Charts countryData={data} selectedCountry={selectedCountry} />
            </div>
        );
    }
}
