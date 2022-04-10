const fetched = (() =>{
    const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?'
    const forecastUrl = 'https://api.openweathermap.org/data/2.5/onecall?'

    const getData = async (city) => {
        const response = await fetch(`${baseUrl}q=${city}&appid=5d115994379e025f0b1d68172d59f3b5`, {
            mode: "cors"
        });
        const data = await response.json();

        const temp = data.main.temp
        const feelsLike = data.main.feels_like
        const humidity = data.main.humidity
        const windSpeed = data.wind.speed
        const weatherDescription = data.weather[0].description
        const cityName = data.name
        const coordinates = data.coord
        const dayTime = data.dt
        
        console.log(data)

        return {temp, feelsLike, dayTime, humidity, windSpeed, weatherDescription, cityName, coordinates}
        
    };

    const getForecast = async ({lon, lat}) =>{
        const response = await fetch(`${forecastUrl}lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=29e24d8aa5c2bcc3d2c37769edc95928`, {
            mode:'cors'
        });
        const data = await response.json()
        console.log(data)
        data.daily.shift()
        const dailyForecast = data.daily
        const hourlyForecast = data.hourly
        const timezone = data.timezone
        return {dailyForecast, hourlyForecast, timezone}
    }

    return {
        getData,
        getForecast,
    }
})()

export default fetched 