import { useEffect, useState } from "react";

import useApi from "./api/useApi";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import Spinner from "./components/Spinner";
import useGeolocation from "./hooks/useGeolocation";

const App = () => {
    const currentLocation = useGeolocation();
    const { getCurrentWeather, getWeatherByCity } = useApi();
    const [weather, setWeather] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [keyword, setKeyword] = useState(null);
    const [unit, setUnit] = useState("°C");

    const loadCurrWeather = async () => {
        setIsLoading(true);
        const currentWeather = await getCurrentWeather(currentLocation, unit);
        setWeather(currentWeather);
        setIsLoading(false);
    };

    useEffect(() => {
        if (keyword) return;
        loadCurrWeather();
    }, [currentLocation, unit]);

    useEffect(() => {
        if (keyword === null) return;
        if (keyword === "") {
            loadCurrWeather();
            return;
        }
        const delayDebounceFn = setTimeout(async () => {
            setIsLoading(true);
            const data = await getWeatherByCity(keyword, unit);
            setWeather(data);
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [keyword, unit]);

    return (
        <div id="app">
            {isLoading && <Spinner />}
            <Sidebar
                weatherData={weather?.current}
                onSearch={(key) => setKeyword(key)}
                unit={unit}
            />
            <main id="main">
                <Dashboard weatherData={weather} unit={unit} onUnitChange={(un) => setUnit(un)} />
            </main>
        </div>
    );
};

export default App;
