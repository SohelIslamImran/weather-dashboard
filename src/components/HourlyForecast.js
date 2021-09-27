const HourlyForecast = ({ weather, unit }) => {
    const weatherIconUrl = `https://openweathermap.org/img/wn/${weather?.weather[0]?.icon}.png`;
    return (
        <div className="card">
            <div className="icon">
                <img src={weatherIconUrl} alt="Icon" />
            </div>
            <h4 className="temp">
                {weather?.temp}
                <sup>{unit}</sup>
            </h4>
            <h5>{weather?.weather[0]?.main}</h5>
        </div>
    );
};

export default HourlyForecast;
