import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";

import styles from "./CountryPicker.module.css";
import { fetchCountryNames } from "../../api";

export default function CountryPicker(props) {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const loadCountriesName = async () => {
            const data = await fetchCountryNames();
            if (!countries.length) {
                setCountries(data);
            }
        };
        loadCountriesName();
    }, [countries.length]);

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect
                defaultValue=""
                onChange={(event) => props.changeCountry(event.target.value)}>
                <option value="global">Global</option>
                {countries.map((name) => (
                    <option value={name} key={name}>
                        {name}
                    </option>
                ))}
            </NativeSelect>
        </FormControl>
    );
}
