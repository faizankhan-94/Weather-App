/* =========================================
   WEATHER APP
   OpenWeatherMap API
========================================= */


/* =========================================
   API CONFIGURATION
========================================= */

const API_KEY = "f2c48101809e3bb9e778b94a810f4367";
const BASE_URL =
    "https://api.openweathermap.org/data/2.5/weather";


/* =========================================
   DOM ELEMENTS
========================================= */

const cityInput =
    document.getElementById("cityInput");

const searchBtn =
    document.getElementById("searchBtn");

const message =
    document.getElementById("message");

const loader =
    document.getElementById("loader");

const weatherCard =
    document.getElementById("weatherCard");

const cityName =
    document.getElementById("cityName");

const country =
    document.getElementById("country");

const temperature =
    document.getElementById("temperature");

const condition =
    document.getElementById("condition");

const humidity =
    document.getElementById("humidity");

const feelsLike =
    document.getElementById("feelsLike");

const wind =
    document.getElementById("wind");

const pressure =
    document.getElementById("pressure");

const visibility =
    document.getElementById("visibility");

const weatherIcon =
    document.getElementById("weatherIcon");

const updatedTime =
    document.getElementById("updatedTime");


/* =========================================
   SEARCH BUTTON
========================================= */

searchBtn.addEventListener(
    "click",
    getWeather
);


/* =========================================
   ENTER KEY
========================================= */

cityInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            getWeather();

        }

    }
);


/* =========================================
   GET WEATHER
========================================= */

async function getWeather() {

    const city =
        cityInput.value.trim();


    /* Empty input */

    if (city === "") {

        showMessage(
            "Please enter a city name."
        );

        weatherCard.style.display = "none";

        return;

    }


    /* API key check */

    if (
        API_KEY === "YOUR_API_KEY" ||
        API_KEY === ""
    ) {

        showMessage(
            "Please add your OpenWeatherMap API key in script.js"
        );

        return;

    }


    /* Show loader */

    showLoader();


    try {

        /*
         * Create API URL
         */

        const url =
            `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;


        /*
         * Fetch API
         */

        const response =
            await fetch(url);


        /*
         * Check response
         */

        if (!response.ok) {

            if (response.status === 404) {

                throw new Error(
                    "City not found."
                );

            }

            if (response.status === 401) {

                throw new Error(
                    "Invalid API key."
                );

            }

            throw new Error(
                "Unable to fetch weather data."
            );

        }


        /*
         * Convert response to JSON
         */

        const data =
            await response.json();


        /*
         * Display weather
         */

        displayWeather(data);


    }

    catch (error) {

        console.error(
            "Weather API Error:",
            error
        );

        weatherCard.style.display = "none";

        showMessage(
            error.message
        );

    }

    finally {

        hideLoader();

    }

}


/* =========================================
   DISPLAY WEATHER
========================================= */

function displayWeather(data) {

    /*
     * Location
     */

    cityName.textContent =
        data.name;

    country.textContent =
        data.sys.country;


    /*
     * Temperature
     */

    temperature.textContent =
        Math.round(data.main.temp);


    feelsLike.textContent =
        Math.round(data.main.feels_like);


    /*
     * Weather condition
     */

    condition.textContent =
        data.weather[0].description;


    /*
     * Humidity
     */

    humidity.textContent =
        `${data.main.humidity}%`;


    /*
     * Wind
     */

    wind.textContent =
        data.wind.speed;


    /*
     * Pressure
     */

    pressure.textContent =
        data.main.pressure;


    /*
     * Visibility
     *
     * API returns visibility in meters.
     * Convert meters → kilometers.
     */

    const visibilityKm =
        (data.visibility / 1000).toFixed(1);

    visibility.textContent =
        visibilityKm;


    /*
     * Weather Icon
     */

    weatherIcon.textContent =
        getWeatherIcon(
            data.weather[0].main
        );


    /*
     * Current time
     */

    updatedTime.textContent =
        new Date().toLocaleTimeString(
            [],
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );


    /*
     * Show weather card
     */

    weatherCard.style.display =
        "block";


    /*
     * Clear error message
     */

    message.textContent = "";

}


/* =========================================
   WEATHER ICON
========================================= */

function getWeatherIcon(weather) {

    const icons = {

        Clear: "☀️",

        Clouds: "☁️",

        Rain: "🌧️",

        Drizzle: "🌦️",

        Thunderstorm: "⛈️",

        Snow: "❄️",

        Mist: "🌫️",

        Smoke: "🌫️",

        Haze: "🌫️",

        Dust: "🌫️",

        Fog: "🌫️",

        Sand: "🌫️",

        Ash: "🌋",

        Squall: "💨",

        Tornado: "🌪️"

    };


    return icons[weather] || "🌤️";

}


/* =========================================
   LOADER
========================================= */

function showLoader() {

    loader.style.display =
        "block";

    weatherCard.style.display =
        "none";

    message.textContent = "";

}


function hideLoader() {

    loader.style.display =
        "none";

}


/* =========================================
   ERROR MESSAGE
========================================= */

function showMessage(text) {

    message.textContent =
        text;

}