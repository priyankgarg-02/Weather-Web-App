var inputcity = document.querySelector(".inputcity");
var submit = document.querySelector(".button input");
var message = document.querySelector(".input span");
var apikey = "a548e045a0ba11595a34c977530c10bc";
var temp=document.querySelector(".tempval p");
var form=document.querySelector(".banner form");

var desc=document.querySelector(".desc p")
var icon=document.querySelector(".weather_icon")
var city=document.querySelector(".display h1")
var wether={};
wether.temp_unit="celsius";
if(navigator.geolocation)
{
    navigator.geolocation.getCurrentPosition(pos,showError);
}
else{
    message.style.display='block';
    message.innerHTML="<p>Browser does not supports Geolocation</p>";
}
function pos(position)
{
    var long=position.coords.longitude;
    var lat=position.coords.latitude;
    giveWeather(long,lat);
}
function showError(error)
{
    message.style.display='block';
    message.innerHTML=`<p> ${error.message} </p>`;
}

function giveWeather(long,lat)
{
    var url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apikey}`;
    fetch(url)
    .then( response => response.json())
    .then(function(data)
{
    wether.temperature= Math.floor(data.main.temp)-273;
    wether.description=data.weather[0].description;
    wether.iconno=data.weather[0].icon;
    wether.cityname=data.name;
    wether.country=data.sys.country;
    wether.windspeed=data.wind.speed;
    wether.winddegree=data.wind.deg;
})
.then(function(){
    displayweather();
});
}

function provideWeather()
{
    var newurl=`https://api.openweathermap.org/data/2.5/weather?q=${inputcity.value}&appid=${apikey}&units=metric`;
    fetch(newurl)
    .then(response=>response.json())
    .then(function(data)
{
    wether.temperature= Math.floor(data.main.temp);
    wether.description=data.weather[0].description;
    wether.iconno=data.weather[0].icon;
    wether.cityname=data.name;
    wether.country=data.sys.country;
    wether.windspeed=data.wind.speed;
    wether.winddegree=data.wind.deg;
    displayweather();
})
.catch(() => {
    message.textContent='Please enter a valid city';
});
message.textContent=' ';


}
function displayweather()
{
    
    temp.innerHTML=`${wether.temperature}°<span>C</span>`;
    desc.innerHTML=`${wether.description} <br><br> <p> Click On temperature to change unit.</p>`;
    icon.innerHTML=`<img src="my_icons/${wether.iconno}.png">`;
    city.innerHTML=`${wether.cityname} , ${wether.country}`;
    form.reset();
}


    document.addEventListener("DOMContentLoaded", function()
    {
        
        
        var temp=document.querySelector(".tempval p");
        
    temp.addEventListener("click", function(){
       
    

   if(wether.temp_unit == "celsius")
   {
       
       var fr=celsiusToFahrenheit(wether.temperature);
       fr=Math.floor(fr);
       wether.temp_unit="fahrenheit";
       temp.innerHTML=`${fr}°<span>F</span>`;
   }
   else{
    
    ce=wether.temperature;
    wether.temp_unit="celsius";
    temp.innerHTML=`${ce}°<span>C</span>`;
   }
}
);
    }
);
function celsiusToFahrenheit(temperat)
        {
            return (temperat*9/5)+32;
        }
        
    
   
