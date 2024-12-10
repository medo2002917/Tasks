let contact = document.getElementById('contact');  // Corrected 'conact' to 'contact'
let searchInput = document.getElementById('search');
let submitBtn = document.getElementById('submit');
let todayName = document.getElementById('day');
let todayNumber = document.getElementById('number');
let todayMonth = document.getElementById('month');
let todayLocation = document.getElementById('location');
let todayDegree = document.getElementById('degree');
let todayIcon = document.getElementById('icon');
let todayCustom = document.getElementById('custom');
let rain = document.getElementById('rain');
let wind = document.getElementById('wind');
let direction = document.getElementById('direction');
let tomorrowName = document.getElementsByClassName('day');
let tomorrowIcon = document.getElementsByClassName('icon');
let tomorrowMaxDegree = document.getElementsByClassName('maxDegree');
let tomorrowMinDegree = document.getElementsByClassName('minDegree');
let tomorrowCustom = document.getElementsByClassName('custom');

async function getWeatherData(cityName) {
    let weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=71dbd040c45b418aa92175158231802&q=${cityName}&days=3`);
    let weatherData = await weatherResponse.json()
    return weatherData;
}

function displayTodayData(data) {
    let todayDate = new Date();
    todayName.innerHTML = todayDate.toLocaleDateString("en-US", { weekday: "long" });
    todayNumber.innerHTML = todayDate.getDate();
    todayMonth.innerHTML = todayDate.toLocaleDateString("en-US", { month: "long" });
    todayLocation.innerHTML = data.location.name;
    todayDegree.innerHTML = data.current.temp_c;
    todayIcon.setAttribute("src", `https:${data.current.condition.icon}`);
    todayCustom.innerHTML = data.current.condition.text;
    rain.innerHTML = data.current.humidity;
    wind.innerHTML = data.current.wind_kph;
    direction.innerHTML = data.current.wind_dir;
}

function displayTomorrowData(data) {
    let forecastData = data.forecast.forecastday;
    for (let i = 0; i < 2; i++) {
        let nextDate = new Date(forecastData[i + 1].date);
        tomorrowName[i].innerHTML = nextDate.toLocaleDateString("en-US", { weekday: "long" });
        tomorrowMaxDegree[i].innerHTML = forecastData[i + 1].day.maxtemp_c;
        tomorrowMinDegree[i].innerHTML = forecastData[i + 1].day.mintemp_c;
        tomorrowIcon[i].setAttribute("src", `https:${forecastData[i + 1].day.condition.icon}`);
        tomorrowCustom[i].innerHTML = forecastData[i + 1].day.condition.text;
    }
}

async function startApp(city = "cairo") {
    let weatherData = await getWeatherData(city);
    if (!weatherData.error) {
        displayTodayData(weatherData);
        displayTomorrowData(weatherData);
    }
}

startApp();

searchInput.addEventListener("input", function () {
    startApp(searchInput.value);
});

submitBtn.addEventListener("click", function () {
    startApp(searchInput.value);
});

function getContact() {
    window.location.href = 'contact.html';
}

contact.addEventListener('click', getContact);

