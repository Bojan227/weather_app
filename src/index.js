import './style.css';
import convertValues from './converter';
import fetched from './fetch';


const showData = (async()=>{
let dataObject = await fetched.getData('Tokyo').catch(err=> console.log(err))
let forecast = await fetched.getForecast(dataObject.coordinates).catch(err=>console.log(err))

const temperatureTextElement = document.querySelector('.show-temp')
const feelsLikeTextElement = document.querySelector('.feels-like')
const humidityTextElement = document.querySelector('.humidity')
const chanceOfRainTextElement = document.querySelector('.chance-of-rain')
const windSpeedTextElement = document.querySelector('.wind-speed')
const weatherDescriptionTextElement = document.querySelector('.weather-desc')
const cityNameTextElement = document.querySelector('.city-name')
const forecastContainer = document.querySelector('.daily-forecast')
const dateTxtElement = document.querySelector('.todays-date')
const timeTxtElement = document.querySelector('.time')
const hourlyForecastContent = document.querySelector('.hourly-forecast')

const hourlyBtn = document.querySelector('.hourly-btn')
const dailyBtn = document.querySelector('.daily-btn')
const searchButton = document.querySelector('.getData')
const convertButtons = document.querySelector('.convertButtons')
const radioBtns = document.querySelectorAll('.radioBtns input')
const arrowBtns = document.querySelectorAll('.button-carrousel')
let activeElement = convertButtons.querySelector('[data-active]')

const {convertToCelsius,
    convertToFahrenheit,
    convertToMph,
    convertToKmh,
    daysInWeek,
    todaysDate,
    hourAndMinutes,
    dayOfTheWeek,
    
} = convertValues


})();
