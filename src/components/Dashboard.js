import DailyForecast from "./DailyForecast";
import HourlyForecast from "./HourlyForecast";

const Dashboard = ({ weatherData, unit, onUnitChange }) => (
    <div className="dashboard">
        <div className="header">
            <h3 className="title">Hourly Forecast</h3>
            <div className="buttons">
                <button
                    type="button"
                    onClick={() => onUnitChange("°C")}
                    className={unit === "°C" && "active"}
                >
                    °C
                </button>
                <button
                    type="button"
                    onClick={() => onUnitChange("°F")}
                    className={unit === "°F" && "active"}
                >
                    °F
                </button>
            </div>
        </div>
        <div className="card-container">
            {weatherData?.hourly?.map((weather) => (
                <HourlyForecast key={weather.dt} weather={weather} unit={unit} />
            ))}
        </div>
        <h3 className="title mt">Daily Forecast</h3>
        <div className="card-container">
            {weatherData?.daily?.map((weather) => (
                <DailyForecast key={weather.dt} weather={weather} unit={unit} />
            ))}
        </div>
    </div>
);

export default Dashboard;
