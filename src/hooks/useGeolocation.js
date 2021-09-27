/* eslint-disable no-alert */
import { useEffect, useState } from "react";

const useGeolocation = () => {
    const [currentLocation, setCurrentLocation] = useState(null);

    const onSuccess = (position) => {
        setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        });
    };

    const onError = (error) => {
        alert(error.message);
        console.warn(`ERROR(${error.code}): ${error.message}`);
    };

    const getGeolocation = async () => {
        if (navigator.geolocation) {
            const result = await navigator.permissions.query({ name: "geolocation" });

            switch (result.state) {
                case "granted":
                    navigator.geolocation.getCurrentPosition(onSuccess);
                    break;
                case "prompt":
                    navigator.geolocation.getCurrentPosition(onSuccess, onError);
                    break;
                case "denied":
                    alert(
                        "Your location permission is disabled. You need to enable your browser location permission."
                    );
                    break;
                default:
                    navigator.geolocation.getCurrentPosition(onSuccess, onError);
                    break;
            }

            result.onchange = () => {
                navigator.geolocation.getCurrentPosition(onSuccess, onError);
            };
        } else {
            alert("Sorry! Geolocation not available.");
        }
    };

    useEffect(() => {
        getGeolocation();
    }, []);

    return currentLocation;
};

export default useGeolocation;
