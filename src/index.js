import './style.css';
import convertValues from './converter';
import fetched from './fetch';
import setIcons from './icons';


const showData = (async()=>{
let dataObject = await fetched.getData('Tokyo').catch(err=> console.log(err))
let forecast = await fetched.getForecast(dataObject.coordinates).catch(err=>console.log(err))


const refreshBtn = document.querySelector('.refresh')

const temperatureTextElement = document.querySelector('.show-temp')
const feelsLikeTextElement = document.querySelector('.feels-like')
const humidityTextElement = document.querySelector('.humidity')

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
    capitalizeFirstLetter,
    todaysDate,
    hourAndMinutes,
    dayOfTheWeek,
    daysInWeek,
    
} = convertValues

const changeTemperature = temp => activeElement.dataset.active === 'true' ? convertToFahrenheit(temp) : convertToCelsius(temp)  

const changeWindSpeed = speed => activeElement.dataset.active === 'true' ? convertToMph(speed) : convertToKmh(speed)    
    
const filterDaysInWeek = () => {

    const firstObjSlice = Object.entries(daysInWeek).slice(dayOfTheWeek).map(entry => entry[1])
    const secondObjSlice = Object.entries(daysInWeek).slice(0, dayOfTheWeek).map(entry => entry[1])
    return [...firstObjSlice, ...secondObjSlice]

}

const filterHourlyData = (arr)=>{

    const firstGroup = arr.slice(1, 9)
    const secondGroup = arr.slice(1 + 8, 17)
    const thirdGroup = arr.slice(1 + 16, 25)
    
    return {firstGroup, secondGroup, thirdGroup}

};

const createHourlyForecastElements = (dt, tempInp, container)=>{
    const cardContainer = document.createElement('div')
    
    const currentHour = document.createElement('h3')
    const currentTemp = document.createElement('h6')
    
    currentHour.textContent = new Date(dt * 1000).toLocaleTimeString([], {
        hour: '2-digit',
    })
    currentTemp.textContent = changeTemperature(tempInp)
    cardContainer.append(currentHour, currentTemp)
    
    container.append(cardContainer)
};


const hourlyDataSplitted = (arr, num) => {
    arr.forEach(element => {
        createHourlyForecastElements(element.dt, element.temp, hourlyForecastContent.children[num])

    })


}

const showHourlyData = (firstGr, secondGr, thirdGr) =>{

    hourlyForecastContent.children[0].innerHTML = '';
    hourlyForecastContent.children[1].innerHTML = '';
    hourlyForecastContent.children[2].innerHTML = '';

    hourlyDataSplitted(firstGr, 0)
    hourlyDataSplitted(secondGr, 1)
    hourlyDataSplitted(thirdGr, 2)
    
}


const showWeatherInfo = (mainObject)=>{ 
    temperatureTextElement.textContent = changeTemperature(mainObject.temp)
    feelsLikeTextElement.textContent = changeTemperature(mainObject.feelsLike)
    windSpeedTextElement.textContent = changeWindSpeed(mainObject.windSpeed)
    humidityTextElement.textContent = `${mainObject.humidity} %`
    weatherDescriptionTextElement.textContent = capitalizeFirstLetter(mainObject.weatherDescription) 
    cityNameTextElement.textContent = mainObject.cityName
    dateTxtElement.textContent = todaysDate(forecast.timezone)
    timeTxtElement.textContent = hourAndMinutes(forecast.timezone)
}


const createDailyForecastElements = (dayInp, tempInp, fLikeInp, container)=>{
    const div = document.createElement('div')
    const day = document.createElement('h3')
    const temp = document.createElement('h5')
    const feelLike = document.createElement('h6')

    day.textContent = dayInp
    temp.textContent = changeTemperature(tempInp)
    feelLike.textContent = changeTemperature(fLikeInp)
    div.append(day, temp, feelLike)
    container.append(div)
}



const showForecastInfo = (forecastArray) =>{
    forecastContainer.innerHTML = ''
    let counter = 0
    for (const element of forecastArray){
        createDailyForecastElements(filterDaysInWeek()[counter], element.temp.max ,element.temp.min, forecastContainer)
        counter+=1
    }

}

convertButtons.addEventListener('click', (e)=>{

    delete activeElement.dataset.active
    convertButtons.children[e.target.dataset.id].dataset.active = true    
    showWeatherInfo(dataObject)
    showForecastInfo(forecast.dailyForecast)
    showHourlyData(filterHourlyData(forecast.hourlyForecast).firstGroup, 
                   filterHourlyData(forecast.hourlyForecast).secondGroup, 
                   filterHourlyData(forecast.hourlyForecast).thirdGroup)

    


}) 
refreshBtn.addEventListener('click', async ()=>{
    showWeatherInfo(dataObject)
    showForecastInfo(forecast.dailyForecast)
    showHourlyData(filterHourlyData(forecast.hourlyForecast).firstGroup, 
                   filterHourlyData(forecast.hourlyForecast).secondGroup, 
                   filterHourlyData(forecast.hourlyForecast).thirdGroup)

})    



searchButton.addEventListener('click', async ()=>{
    const inputValue = document.getElementById('location')
    dataObject = await fetched.getData(inputValue.value).catch(err=> console.log(err))
    forecast = await fetched.getForecast(dataObject.coordinates).catch(err=>console.log(err))

    showWeatherInfo(dataObject)
    showForecastInfo(forecast.dailyForecast)
    showHourlyData(filterHourlyData(forecast.hourlyForecast).firstGroup,
               filterHourlyData(forecast.hourlyForecast).secondGroup, 
               filterHourlyData(forecast.hourlyForecast).thirdGroup)
    inputValue.value = ''


})

dailyBtn.addEventListener('click', ()=>{
hourlyForecastContent.classList.add('no-display')
document.querySelector('.arrow-radios').classList.add('no-display')
forecastContainer.style.display = 'flex'


})


hourlyBtn.addEventListener('click', ()=>{
hourlyForecastContent.classList.remove('no-display')
document.querySelector('.arrow-radios').classList.remove('no-display')
forecastContainer.style.display = 'none'

})

// Hourly data carrousel
arrowBtns.forEach(arrowBtn => {
    arrowBtn.addEventListener('click', ()=>{
        const next = arrowBtn.dataset.button === 'next' ? 1 : -1
        const radio = document.querySelector('.radioBtns')

        let activeElement = hourlyForecastContent.querySelector('[data-active]')
        let newIndex = [...hourlyForecastContent.children].indexOf(activeElement) + next
         
    
        if(newIndex < 0) newIndex = hourlyForecastContent.children.length - 1
        if(newIndex >= hourlyForecastContent.children.length) newIndex = 0
        delete activeElement.dataset.active
      
        hourlyForecastContent.children[newIndex].dataset.active = true
        radio.children[newIndex].checked = true
        
})

})

radioBtns.forEach(btn =>{
    btn.addEventListener('click', (e)=>{
        const activeElement = hourlyForecastContent.querySelector('[data-active]');
        delete activeElement.dataset.active
        hourlyForecastContent.children[e.target.dataset.id].dataset.active = true;
        
    })
     


})

setIcons()
showWeatherInfo(dataObject)
showForecastInfo(forecast.dailyForecast)
showHourlyData(filterHourlyData(forecast.hourlyForecast).firstGroup,
               filterHourlyData(forecast.hourlyForecast).secondGroup, 
               filterHourlyData(forecast.hourlyForecast).thirdGroup)


})();
