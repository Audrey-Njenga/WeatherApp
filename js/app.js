var city = document.getElementById('city');
var searchButton = document.getElementById('searchicon');
var pinButton = document.getElementById('mapicon');
var cityTemp = document.getElementById('cityTemp');
var cityName = document.getElementById('cityName');
var cityDesc = document.getElementById('cityDesc');
var cityWeather = document.getElementById('cityWeather');
var sunrise = document.getElementById('sunrise');
var sunset = document.getElementById('sunset');
var resultsDiv = document.getElementById('results');
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

searchButton.addEventListener('click', function () {
    fetch('//api.openweathermap.org/data/2.5/weather?q=' + city.value + '&units=metric&appid=74f71f68c5d571f7efd42959517e6e27')
        .then((response) => {
            return response.json()
        }).then((data) => {

            var name = data["name"];
            var temp = data["main"]["temp"];
            var desc = data["weather"][0]["main"];
            var rise = data["sys"]["sunrise"];            
            var set = data["sys"]["sunset"];
            rise = new Date(rise).toLocaleTimeString('en-US');
            set = new Date(set).toLocaleTimeString('en-US');
            temp = temp + "&#8451;";

            cityName.innerHTML = name;
            cityDesc.innerHTML = desc;
            cityTemp.innerHTML = temp;
            city.value = "";
            sunrise.innerHTML = rise;
            sunset.innerHTML = set;

            document.getElementById("cityName").classList.add("popleft");
            document.getElementById("cityTemp").classList.add("popleft");
            document.getElementById("cityWeather").classList.add("popleft");


        }).catch(err => alert("City does not exist"))


})
