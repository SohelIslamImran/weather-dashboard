import axios from "axios";
import { apiKey, baseURL } from "./config";

axios.defaults.baseURL = baseURL;

const useApi = () => {
    const getCurrentWeather = async (location, unit) => {
        try {
            const units = unit === "°C" ? "metric" : "imperial";
            const { data: currWeather } = await axios.get(
                `/weather?lat=${location?.latitude}&lon=${location?.longitude}&units=${units}&appid=${apiKey}`
            );
            const endpoint = `/onecall?lat=${location?.latitude}&lon=${location?.longitude}&exclude=minutely&units=${units}&appid=${apiKey}`;
            const { data } = await axios.get(endpoint);
            return { ...data, current: { ...data.current, ...currWeather } };
        } catch (error) {
            console.log(error.message);
        }
    };

    const getWeatherByCity = async (city, unit) => {
        try {
            const { data: weather } = await axios.get(`/weather?q=${city}&appid=${apiKey}`);
            const data = await getCurrentWeather(
                {
                    latitude: weather.coord.lat,
                    longitude: weather.coord.lon,
                },
                unit
            );
            return data;
        } catch (error) {
            console.log(error.message);
        }
    };

    return { getCurrentWeather, getWeatherByCity };
};

export default useApi;
