/*jshint esversion: 6 */

const city = document.querySelector('#city');
const country = document.querySelector('#country');
const button = document.querySelector('#button');
const display = document.querySelector('.weather_display');

// General function that will be used to request data
function onRequestData(url, listener){
    const oReq = new XMLHttpRequest();
    oReq.addEventListener('load', listener);
    oReq.open('GET',url);
    oReq.send();
}

button.addEventListener("click",function(){
  display.innerHTML = "";
  onRequestData(`http://api.openweathermap.org/data/2.5/forecast?q=${city.value},${country.value}&appid=${API_KEY}`, getForecast);
});


function getForecast() {
  const requestData = JSON.parse(this.responseText);
  const city_country = document.createElement("h2");
  city_country.innerHTML = `${requestData.city.name} - ${requestData.city.country}`;
  city_country.className = "header";
  display.appendChild(city_country);

  for (let i = 0; i < 5; i++){

    const div_day = document.createElement("div");
    div_day.className = `div_day day${i}`;

    const day = document.createElement("h3");
    day.className = "day";
    const ul = document.createElement("ul");
    const description = document.createElement("li");
    const temperature = document.createElement("li");
    const wind = document.createElement("li");

    const icon = document.createElement("img");
    icon.className = "icon";
    icon.setAttribute("src",`http://openweathermap.org/img/w/${requestData.list[i].weather[0].icon}.png`);

    if(i === 0){
      day.innerHTML = "TODAY";
    } else{
      day.innerHTML = `DAY${+i}`;
    }
    description.innerHTML = `General description: ${requestData.list[i].weather[0].description}`;
    temperature.innerHTML = `Temperature (°F): ${requestData.list[i].main.temp}`;
    wind.innerHTML = `Wind Speed (mph): ${requestData.list[i].wind.speed}`;

    display.appendChild(div_day);
    div_day.appendChild(day);
    day.appendChild(ul);
    ul.appendChild(description);
    ul.appendChild(temperature);
    ul.appendChild(wind);
    div_day.appendChild(icon);
  }

}





