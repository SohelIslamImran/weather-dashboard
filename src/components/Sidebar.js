import { useEffect, useState } from "react";

const Sidebar = ({ weatherData, unit, onSearch }) => {
    const [date, setDate] = useState(new Date());
    const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}@4x.png`;

    useEffect(() => {
        const timer = setInterval(() => setDate(new Date()), 50000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div id="sidebar">
            <div className="sidebar-wrapper">
                <div className="sidebar-header">
                    <div className="search-input">
                        <i className="bi bi-search" />
                        <input
                            type="search"
                            autoComplete="off"
                            placeholder="Search for city..."
                            onChange={({ target }) => onSearch(target.value)}
                        />
                    </div>
                </div>
                <div className="sidebar-body">
                    {weatherData ? (
                        <div>
                            <div className="weather-icon">
                                <img src={weatherIconUrl} alt="Icon" />
                                <img src={weatherIconUrl} className="blur-shadow" alt="Icon" />
                            </div>
                            <div>
                                <h1>
                                    {weatherData?.main?.temp}
                                    <sup>{unit}</sup>
                                </h1>
                                <h5>
                                    <i className="bi bi-thermometer-low" />
                                    Min Temperature: {weatherData?.main?.temp_min}
                                    <sup>{unit}</sup>
                                </h5>
                                <h5>
                                    <i className="bi bi-thermometer-high" />
                                    Max Temperature: {weatherData?.main?.temp_max}
                                    <sup>{unit}</sup>
                                </h5>
                                <h5>
                                    <i className="bi bi-water" />
                                    Humidity: {weatherData?.main?.humidity}%
                                </h5>
                                <h5>
                                    <i className="bi bi-thermometer-sun" />
                                    {weatherData?.weather[0]?.main}
                                </h5>
                                <hr />
                                <h4>
                                    <i className="bi bi-calendar-event" />
                                    {date.toDateString()}
                                </h4>
                                <h4>
                                    <i className="bi bi-clock" />
                                    {date.toLocaleTimeString("bd", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true,
                                    })}
                                </h4>
                                <h3>
                                    <i className="bi bi-geo-alt" />
                                    {weatherData?.name}, {weatherData?.sys?.country}
                                </h3>
                            </div>
                        </div>
                    ) : (
                        <h2>No weather available!</h2>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
