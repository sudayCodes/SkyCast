function onClick_weather(event) {
    event.preventDefault();
    weather_.scrollIntoView({
        behavior:"smooth",
        block:"center"
    })
}
let weather = document.querySelector("#weather");
weather.addEventListener('click', onClick_weather);

let city_ = "London"; // Declare globally
let input = document.querySelector(".input");
let form = document.querySelector(".myform");

form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent page reload
    city_="";
    city_ = input.value; 

    input.value = ""; // Clear the input field

    searchcity();
    weather_search();
});

function searchcity(event){
    weather_.scrollIntoView({
        behavior:"smooth",
        block:"center"
    })

}


let date = document.querySelector(".date");
let city = document.querySelector(".city");
let wish = document.querySelector(".good");
let backtotop = document.querySelector(".back-to-top");
let search_city = document.querySelector("#search");
let about = document.querySelector("#about");
let links = document.querySelector("#links");
let weather_ = document.querySelector(".weather_details");
let about_ = document.querySelector(".about-section");
let links_ = document.querySelector(".footer");
let now = new Date();

let date_ = String(now.getDate());
let monthName = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(now);
//DateTimeFormat is a ver good library
let time = new Intl.DateTimeFormat('en-US', { 
    hour: 'numeric', 
    minute: 'numeric', 
    hour12: true 
}).format(now);

let tag = "st";
if (date_[-1]=='2') {
    tag = "nd";
}
else if (date_[-1]=='1') {
    tag = "st";}
else if (date_[-1]=='3') {
    tag = "rd";
} else {
    tag = "th";
}
date.append(date_+tag+" "+monthName+ " "+String(time));
let hour = now.getHours();

// Determine the appropriate greeting based on the hour
let day_ = "";
if (hour >= 0 && hour < 12) {
  day_ = "Good Morning";
} else if (hour >= 12 && hour < 18) {
  day_ = "Good Afternoon";
} else {
  day_ = "Good Evening";
}

// Log the greeting to the console
console.log(day_);

// Assuming `wish` is a DOM element, append the greeting
wish.append(day_);


function Backtotop(event){
    event.preventDefault();
    window.scrollTo({
        top:0,
        behavior:"smooth",
    });
}

backtotop.addEventListener('click', Backtotop);

function toabout(event){
    event.preventDefault();
    about_.scrollIntoView({
        behavior:"smooth",
        block:"center"
    })
}
about.addEventListener('click', toabout)
function tofooter(event){
    event.preventDefault();
    links_.scrollIntoView({
        behavior:"smooth",
        block:"center"
    })
}
links.addEventListener('click', tofooter)

let img = document.querySelector(".temperature img")
let temp = document.querySelector(".temperature h1");
let temp_ = document.querySelector(".temperature p");
let humidity_ = document.querySelector(".humidity");
let windspeed_ = document.querySelector(".windspeed");
let precipitation_ = document.querySelector(".precipitation");
let pressure_ =document.querySelector(".pressure");

function weather_search(){
    
fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=f89611c341f845eab4695117241712&q=${city_}&days=1&aqi=no&alerts=no`
) 
.then((res) => {
    return res.json();
})
.then((data) => {
    let weather_condition = data.current.condition.text;
    let weather_condition_icon = data.current.condition.icon;
    let temperature = data.current.temp_c;
    let name = data.location.name;
    let windspeed = data.current.wind_mph;
    let pressure = data.current.pressure_mb;
    let humidity = data.current.humidity;
    let precipitation = data.current.precip_mm;
    let sunrise = data.forecast.forecastday[0].astro.sunrise;
    let chanceofrain = data.forecast.forecastday[0].hour[0].chance_of_rain;
    let time = data.location.localtime;
    time = time.slice(-5,);
    console.log(time);

// removing previuos data
    temp.textContent = "";
    temp_.textContent = "";
    city.innerHTML = "";
    humidity_.innerHTML = "";
    windspeed_.innerHTML = "";
    precipitation_.innerHTML = "";
    pressure_.innerHTML = "";
    img.src="";
    document.querySelector(".sunrise").innerHTML = "";
    document.querySelector(".rain").innerHTML = "";





    temp.append(String(temperature)+"°C");
    temp_.append(weather_condition);
    city.append(name);
    humidity_.append(String(humidity)+"%");
    windspeed_.append(String(windspeed)+"mph");
    precipitation_.append(String(time));
    pressure_.append(String(pressure)+"hPa");
    img.src=String(weather_condition_icon);
    document.querySelector(".sunrise").append(sunrise);
    document.querySelector(".rain").append(chanceofrain);


})
.catch(error => {
    temp.textContent = "";
    temp_.textContent = "";
    city.innerHTML = "";
    humidity_.innerHTML = "";
    windspeed_.innerHTML = "";
    precipitation_.innerHTML = "";
    pressure_.innerHTML = "";
    img.src="";
    document.querySelector(".sunrise").innerHTML = "";
    document.querySelector(".rain").innerHTML = "";

    city.append("No such city exists, please enter a valid city name");
});

}
weather_search()





