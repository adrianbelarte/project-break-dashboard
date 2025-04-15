const apiKey = `b246e05020ed4fc3bb8214449251504`;
const baseUrl = `https://api.weatherapi.com/v1`;
let ciudad = `Madrid`;

const imagenes = [
    "img/1.jpg",
    "img/2.jpg",
    "img/3.jpg",
    "img/4.jpg",
    "img/5.jpg",
    "img/6.png",
    "img/7.jpg",
    "img/8.jpg",
    "img/9.jpg",
    "img/10.jpg"
];

cambiarFondo();

function cambiarFondo() {
    const r = Math.floor(Math.random() * imagenes.length);
    document.body.style.backgroundImage = `url('${imagenes[r]}')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.transition = "background-image 1s ease-in-out";
    document.body.style.backgroundAttachment = "fixed"; 
    document.body.style.overflowX = "hidden"; 
}

const getWeather = async (api) => {
    try{
        const response = await fetch(api);
        if(!response.ok){
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        datosApi(data);

    }catch(error){
        console.log(`Error: `, error);
    }
}

function generarApi(key,ciudad,Url){
    return `${Url}/forecast.json?key=${key}&q=${ciudad}&aqi=no`
}

function datosApi(data) {
    const location = data.location;
    const current = data.current;

    const pais = location.country;
    const ciudad = location.name;
    const img = current.condition.icon;
    const clima = current.condition.text;
    const grados = current.temp_c;
    const precip = current.precip_in;
    const humedad = current.humidity;
    const viento = current.gust_mph;
    const currentEl = document.querySelector(".current");
    const infoEl = document.querySelector(".info");

    currentEl.innerHTML = `
        <p>${pais}</p>
        <p>${ciudad}</p>
        <p>${clima}</p>
        <img src="https:${img}" alt="${clima}">
        <p>${grados}°C</p>
    `;

    infoEl.innerHTML = `
        <p>Precipitaciones: ${precip} in</p>
        <p>Humedad: ${humedad}%</p>
        <p>Viento: ${viento} km/h</p>
    `;

    previsionHoraria(data.forecast);
}

function previsionHoraria(tiempo){
    const horas = tiempo.forecastday[0].hour;
    const contenedorHoras = document.querySelector(".horas-contenedor");
    let html = "";

    horas.forEach(hora => {
        const time = hora.time.split(" ")[1]; 
        const icon = hora.condition.icon;
        const temp = hora.temp_c;

        html += `
            <div class="hour-box">
                <p>${time}</p>
                <img src="https:${icon}" alt="icono clima">
                <p>${temp}°C</p>
            </div>
        `;
    });

    contenedorHoras.innerHTML = html;
}

let weatherApi = generarApi(apiKey,ciudad,baseUrl);
getWeather(weatherApi).then();



//cambiar fondo cada 15s
setInterval(cambiarFondo, 10000);
