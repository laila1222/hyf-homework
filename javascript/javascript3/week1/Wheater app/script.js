// fetch('https://api.openweathermap.org/data/2.5/weather?q=valby&units=metric&appid=8520585c9e303dd1aa21a11aaebf99d6')
// .then(resp => resp.json())
// .then(json => console.log(json.main.temp))


const inputField = document.querySelector('#input-location');
const button = document.querySelector('#input-location-button');
// const temperature = document.querySelector('#temperature');
const humidity = document.querySelector('#humidity');
const errorMessage = document.querySelector('#errorMessage');
const currentLocationButton = document.querySelector('#current-location');
const background = document.querySelector('body');

//Event listeners
//Get weather data by input
button.addEventListener('click', function() {
    const location = inputField.value.toLowerCase();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=8520585c9e303dd1aa21a11aaebf99d6`;
    getWeatherData(url);
    const savedData = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=8520585c9e303dd1aa21a11aaebf99d6`;
    localStorage.setItem('location', JSON.stringify(savedData));
    const data = JSON.parse(localStorage.getItem('location'));
    console.log(data);
});

//Get weather data using user's location
currentLocationButton.addEventListener('click', function () {
    navigator.geolocation.getCurrentPosition(function (position) {
        const currentLocation = {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
        };
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLocation.latitude}&lon=${currentLocation.longitude}&units=metric&appid=8520585c9e303dd1aa21a11aaebf99d6`;
        getWeatherData(url);
        const savedData = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=8520585c9e303dd1aa21a11aaebf99d6`;
        localStorage.setItem('location', JSON.stringify(savedData));
        const data = JSON.parse(localStorage.getItem('location'));
        console.log(data);
    })
})

//Functions
//Check if fetch works
const checkFetch = function (response) {
    if (!response.ok) {  
        console.log(response.statusText + ' - ' + response.url);
    }
    return response.json();
}

//Get weather data
function getWeatherData(url) {
    fetch(url)
        .then(checkFetch)
        .then(json => {
           if (!json.message) {
            document.querySelector('#city-name').innerHTML = `Location: ${json.name}`;
            document.querySelector('h3').innerHTML = json.weather[0].description;
            document.querySelector('#temperature').innerHTML = `Temperature: ${json.main.temp}°C`;
            document.querySelector('#humidity').innerHTML = `Humidity: ${json.main.humidity} hPa.`;
            document.querySelector('#min-temp').innerHTML = `Minimum-temperature: ${json.main.temp_min} °C.`;
            document.querySelector('#max-temp').innerHTML = `Maximum-temperature: ${json.main.temp_max} °C.`;
            document.querySelector('#wind-speed').innerHTML = `Wind speed: ${json.wind.speed} Km/h`;
            document.querySelector('#clouds').innerHTML = `Cloudiness: ${json.clouds.all}%`;
            document.querySelector('#sunrise').innerHTML = `Sunrise: ${convertUnixTime(json.sys.sunrise)} am`;
            document.querySelector('#sunset').innerHTML = `Sunset: ${convertUnixTime(json.sys.sunset)} pm`;

            function convertUnixTime (unix) {
                const date = new Date(unix * 1000);
                const hours = date.getHours();
                const minutes = date.getMinutes();
                const displayTime = `${hours}:${minutes}`;
                return displayTime;
            }
            

            initMap(json.coord.lat, json.coord.lon);

            const weatherCode = json.weather[0].id;
            getWeatherCondition(weatherCode);

           } else {
            errorMessage.innerHTML = json.message;
            errorMessage.style.display = "inline-block"
            inputField.addEventListener("keypress", function() {
                errorMessage.style.display = 'none';
            })
           }
                
            
        })
        .catch(function(err) {
            console.log('error');
            console.log(err);
        })
}

//Convert Unix timestamp into hour and minute
function convertUnixTime () {
    const date = new Date
}

//Load location on  map
function initMap(coordLat, coordLng) {
    //Get location coordinates
    const location = {lat: coordLat, lng: coordLng};
    //The map is centered at the location
    const mapDiv = document.querySelector("#map");
    const map = new google.maps.Map(mapDiv, {
        zoom: 12,
      center: location
    });
    mapDiv.style.display = "block"
    console.log(location)
    
  }

//Change background picture according to cloudiness


//wheater conditions
function getWeatherCondition (weatherCondition) {
    if (weatherCondition <= 232 && weatherCondition >= 200) {

        background.style.backgroundImage = 'url(images/storm.jpg)'
    } else if (weatherCondition <= 321 && weatherCondition >= 300) {
        background.style.backgroundImage = 'url(images/drizzle.jpg)'
    } else if (weatherCondition <= 531 && weatherCondition >= 500){
        background.style.backgroundImage = 'url(images/rainy.jpg)' 
    } else if (weatherCondition <= 622 && weatherCondition >= 600) {
        background.style.backgroundImage = 'url(images/snow.jpg)'
    }else if (weatherCondition <= 781 && weatherCondition >= 701) {
        background.style.backgroundImage = 'url(images/mist.jpg)'
    }else if (weatherCondition = 800) {
        background.style.backgroundImage = 'url(images/sunny.jpg)'
    }else if (weatherCondition <= 804 && weatherCondition >= 800) {
        background.style.backgroundImage = 'url(images/cloudandsun.jpg)'
    } else {
        background.style.backgroundImage = 'url(images/error.jpg)'
    }
}