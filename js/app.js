import 'config.js';
// registers service worker on window load
if ('serviceWorker' in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register('../service.js')
            .then(reg => console.log("Registered"))
            .catch(err => console.log(`Error: ${err}`))
    })
}


// declare variables for use
let city = document.getElementById('city');
let searchButton = document.getElementById('searchicon');
let pinButton = document.getElementById('mapicon');
let cityTemp = document.getElementById('cityTemp');
let cityName = document.getElementById('cityName');
let cityDesc = document.getElementById('cityDesc');
let cityWeather = document.getElementById('cityWeather');
let sunrise = document.getElementById('sunrise');
let sunset = document.getElementById('sunset');
let recent = document.getElementById('recent');
let resultsDiv = document.getElementById('results');
let errorBlock = document.getElementById('errorblock');
let lastestSearch = Object.keys(localStorage)[0];
let previous = document.getElementById('previous');
let cities = [];
cityName = lastestSearch.city;
cityTemp = lastestSearch.temp;
// main functionality
// returns waether info on search
searchButton.addEventListener('click', function () {
    fetch('//api.openweathermap.org/data/2.5/weather?q=' + city.value + `&units=metric&appid=${key}`)
        .then((response) => {
            return response.json()
        }).then((data) => {

            let name = data["name"];
            let temp = data["main"]["temp"];
            let desc = data["weather"][0]["main"];
            let rise = data["sys"]["sunrise"];
            let set = data["sys"]["sunset"];
            rise = formatTime(rise);
            set = formatTime(set);
            temp = parseFloat(temp.toFixed(1)) + "&#8451;";
            let statusCode = data["weather"][0]["id"];


            cityWeather.setAttribute("data-feather", geticon(statusCode))
            cityName.innerHTML = name;
            cityDesc.innerHTML = desc;
            cityTemp.innerHTML = temp;
            city.value = "";
            sunrise.innerHTML = rise;
            sunset.innerHTML = set;
            let obj = { city: name, temp: temp };
            localStorage.setItem(name, JSON.stringify(obj));


            document.getElementById("cityName").classList.add("popleft");
            document.getElementById("cityTemp").classList.add("popleft");
            document.getElementById("cityWeather").classList.add("popleft");
            feather.replace();



        }).catch(err => errorBlock.innerHTML = "City does not exist. Try again");


})

// returns previous searches from localstorage
function previousSearches() {


    if (localStorage.length == 0) {
        previous.innerHTML = "No recent searches";
    } else {
        previous.innerHTML = "";
        Object.keys(localStorage).forEach((cty) => {
            cacheCity = JSON.parse(localStorage.getItem(cty));
            let ctyName = cacheCity.city;
            let ctyTemp = cacheCity.temp;
            recent.insertAdjacentHTML("afterend", `<br><p class="cities">${ctyName} : ${ctyTemp}</p>`);
       }        
    )}
}


function deleteSearch() {

}
function updateRecent(newCity) {
    let recents = JSON.parse(localStorage.getItem("arr"));
    recents = cachedSearches.push(newCity);
    // recentSearches  = recentSearches.add(recents);
    let updated = JSON.stringify(recents);
    localStorage.setItem("arr", updated);
}


// time formatter

function formatTime(time) {
    let date = new Date(time * 1000);
    let finalTime = date.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
    });
    return finalTime;
}



// returns an icon based on the weather code
function geticon(weathercode) {
    switch (true) {
        case (weathercode >= 200) & (weathercode < 300):
            return 'cloud-lightning';
        case (weathercode >= 300) & (weathercode < 400):
            return 'cloud-drizzle';
        case (weathercode >= 500) & (weathercode < 600):
            return 'cloud-rain';
        case (weathercode >= 600) & (weathercode < 700):
            return 'cloud-snow';
        case (weathercode >= 801) & (weathercode < 900):
            return 'sun';
        default:
            return 'wind';

    }

}

previousSearches();

//To be implemented
// pick location from user
// pinButton.addEventListener('click', function () {
//     let longitude;
//     let latitude;
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(position => {
//             longitude = position.coords.longitude;
//             latitude = position.coords.latitude;
//             const api = `//api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&apiid=74f71f68c5d571f7efd42959517e6e27`

//         });
//         fetch(api).then((response)=> {return response.json()}).then((data)=> {resultsData()}).catch(err=>alert("Error"));
//     }

// })