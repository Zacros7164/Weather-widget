// console.log("test")
$('#weather-form').submit((e)=>{
    e.preventDefault();
    currentPercent = 0;
    context.clearRect(0,0,500,500)
    // console.log("user submit");
    const zip= $('.zip-code').val()
    $('.zip-code').val('')
    // console.log(zip)
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}&units=imperial`;

    // we got the zip code 
    // we built the URL 
    // now go get the JSON

    $.getJSON(weatherUrl,(weatherData)=>{
        // console.log(weatherData)
        const currTemp = weatherData.main.temp;
        const temps = {
            curr: parseInt(weatherData.main.temp),
            max: weatherData.main.temp_max,
            min: weatherData.main.temp_min
        }
        const newHTML = `<img src="https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png" />
        <div>The temp in ${weatherData.name} is currently ${temps.curr} &deg;</div>
        `
        $('.weather-data').html(newHTML);
        animateTemp(0,currTemp);


    }) //getJSON
}) // submit form

const canvas = document.getElementById('weather-canvas');
let context = canvas.getContext('2d');
let currentPercent = 0;
function animateTemp(currentArc, currentTemp){


    // background circle
    context.lineWidth = 5;
    context.strokeColor = '#ffff00';
    context.beginPath();
    context.fillStyle = '#ccc';
    context.arc(155, 80, 70,0, Math.PI * 2);
    context.closePath();
    context.fill();

    // outer color
    context.beginPath();
    context.arc(155,80,68, Math.PI*1.5, Math.PI*2 * currentArc + Math.PI*1.5);
    context.stroke();

    // update currentArc until it gets to currentTemp
    currentPercent++;
    if(currentPercent < currentTemp){
        // we need to keep drawing
        // requestAnimationFrame is like a while looop, for canvas
        requestAnimationFrame(()=>{
            animateTemp(currentPercent/100, currentTemp)
        })
    }
}