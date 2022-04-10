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


    const timestamp = new Date ()
    const dayOfTheWeek = timestamp.getDay() + 1
    
    const todaysDate = (tZone) => {
        return timestamp.toLocaleDateString("en-US", {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            timeZone: tZone

        })

    }
    const hourAndMinutes = (tZone) => {
        return timestamp.toLocaleTimeString('en-US', {
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
        

    };

})();

export default convertValues