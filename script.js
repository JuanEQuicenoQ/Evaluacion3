document.addEventListener ('DOMContentLoaded', function(){
    const apiKey = 'd3c39f57206d5904890771c822ffaac3';
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
    const busqueda= document.querySelector('.search input');
    const busquedaBoton= document.querySelector('.search button');
    const clima= document.querySelector('.weather');
    const errorCard = document.querySelector('.error');
    const iconoClima= document.querySelector('.weather-icon');
    const temperatura= document.querySelector('.temp');
    const ciudad= document.querySelector('.city');
    const humedad= document.querySelector('.humidity');
    const viento= document.querySelector('.wind');
    

    busquedaBoton.addEventListener ('click', function(){
        const nombreCiudad= busqueda.value.trim();

        if (nombreCiudad !== ''){
            const url= `${apiUrl}${nombreCiudad}&appid=${apiKey}`;

            axios.get(url).then (function(response){
                const weatherData=response.data;
                clima.style.display = 'block';
                errorCard.style.display = 'none';
                const weatherMain= weatherData.weather[0].main;
                setIconoClima (weatherMain);
                const temperature= Math.round(weatherData.main.temp);
                temperatura.textContent=`${temperature}°C`;
                const nombreCiudad=weatherData.name;
                ciudad.textContent= nombreCiudad;
                const humidity= weatherData.main.humidity;
                humedad.textContent = `${humidity}%`;
                const windSpeed= weatherData.wind.speed;
                viento.textContent = `${windSpeed} km/h`;                
            })

            .catch (function (error){
                clima.style.display = 'none';
                errorCard.style.display = 'block';
            });
        }
    });
        function setIconoClima (weatherMain){
            const iconPath= icono (weatherMain);
            iconoClima.src=iconPath;
        }

        function icono (weatherMain){
            switch (weatherMain) {
                case 'Clouds':
                  return 'images/clouds.png';
                case 'Clear':
                  return 'images/clear.png';
                case 'Rain':
                  return 'images/rain.png';
                case 'Drizzle':
                  return 'images/drizzle.png';
                case 'Mist':
                  return 'images/mist.png';
              }
        }
    });