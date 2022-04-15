const convertValues  = (()=>{
    const convertToCelsius = (value) =>{
        
        let result = value - 273.15    
        
        return `${Math.round(result)} °C`

    }

    const convertToFahrenheit = (value) =>{
        let result = (value - 273.15) * 1.8 + 32 
      
        return `${Math.round(result)} °F`

    }
    const convertToMph = (value) =>{
        let result = value * 2.237
        return `${Math.floor(Math.round(result))} mp/h`
    }
    const convertToKmh = (value) =>{
        let result = value * 3.6
        return `${Math.floor(Math.round(result))} km/h`
    }

    function capitalizeFirstLetter(word){
        const array = word.split(' ')
       const newArray = array.map(wrd => {
            const first = wrd.slice(0, 1).toUpperCase()
            const second = wrd.slice(1).toLowerCase()
            return `${first}${second}`
        })
    
        const newString = newArray.join(" ")
        return newString
        
    }
    const dayOfTheWeek = new Date().getDay() + 1
    
    const todaysDate = (tZone) => {
        return new Date().toLocaleDateString("en-US", {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            timeZone: tZone

        })

    }
    const hourAndMinutes = (tZone) => {
        return new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: tZone

        })

    }
    
    const daysInWeek = {
        0: "Sunday",
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Tuesday",
        5: "Friday",
        6: "Saturday"
        
    };
    


    return {
        convertToCelsius,
        convertToFahrenheit,
        convertToMph,
        convertToKmh,
        daysInWeek,
        todaysDate,
        hourAndMinutes,
        dayOfTheWeek,
        capitalizeFirstLetter

    };

})();

export default convertValues