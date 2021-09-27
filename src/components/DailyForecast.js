const DailyForecast = ({ weather, unit }) => {
    const weatherIconUrl = `https://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@4x.png`;
    return (
        <div className="card daily">
            <div className="icon">
                <img src={weatherIconUrl} alt="Icon" />
            </div>
            <h4 className="temp">
                <i className="bi bi-thermometer-half" />
                {weather?.temp?.day}
                <sup>{unit}</sup>
            </h4>
            <h5>{weather?.weather[0]?.main}</h5>
        </div>
    );
};

export default DailyForecast;
