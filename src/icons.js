import searchIcon from './weather_icons/magnify.png'
import refreshIcon from './weather_icons/refresh.png'
import celsiusIcon from './weather_icons/temperature-celsius.png'
import fahrenheitIcon from './weather_icons/temperature-fahrenheit.png'

const celsius = document.querySelector('.celsius')
const fahrenheit = document.querySelector('.fahrenheit')
const search = document.querySelector('.getData')
const refresh = document.querySelector('.refresh')

export default function setIcons(){
    celsius.src = celsiusIcon
    fahrenheit.src = fahrenheitIcon
    search.src = searchIcon
    refresh.src = refreshIcon
}