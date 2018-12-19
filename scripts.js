// console.log("test")
$('#weather-form').submit((e)=>{
    e.preventDefault();
    // console.log("user submit");
    const zip= $('.zip-code').val()
    $('.zip-code').val('')
    console.log(zip)
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}&units=imperial`;

    // we got the zip code 
    // we built the URL 
    // now go get the JSON

    $.getJSON(weatherUrl,(weatherData)=>{
        console.log(weatherData)
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


    }) //getJSON
}) // submit form