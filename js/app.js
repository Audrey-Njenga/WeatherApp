var city = document.querySelector('.city')
var myButton = document.getElementById('submit')
myButton.addEventListener('click', function() {
  fetch('api.openweathermap.org/data/2.5/weather?q='+city.value+'&appid=74f71f68c5d571f7efd42959517e6e27')
  .then((response)=>response.json()).then(
      data=>console.log(data)
  ).catch(err=>alert("Error"))

})