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

//cambiar fondo cada 15s
setInterval(cambiarFondo, 10000);

//-----------------------------password--------------------------------------------------
const mayusculas =  "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const minusculas =  "abcdefghijklmnopqrstuvwxyz";
const numeros = "0123456789";
const simbolos = "!@#$%^&*()-_=+";
const longitudPassword = document.getElementById("nCaracteres")
const confirmarPassword = document.querySelector(`.confirmarPassword`)
// Math.random() Para generar aleatoriedad
function getRandom(arr){
    let r = Math.floor(Math.random() * arr.length);
    return arr[r];
}

// guardar minimo los 4 datos diferentes
function generarPassword(n){
    if(n >= 12 && n <= 50){
        let chars = [
            getRandom(mayusculas),
            getRandom(minusculas),
            getRandom(numeros),
            getRandom(simbolos)
        ]

        const todos = mayusculas + minusculas + numeros + simbolos;
        for (let i = 4; i < n; i++) {
            chars.push(getRandom(todos));
        }

        return shuffle(chars.join(``));
    }
    return "longitud de password no valida"
}

//mezclar los datos
function shuffle(str){
    return str
    .split(``)
    .sort(() => Math.random() - 0.5)
    .join(``)
}

//muestra los datos en el html
function templatePassword(txt){
    const password = document.getElementById(`password`)
    password.innerHTML = `${txt}`
}

// numeros de 12 a 50 en el selector
function nCaracteres(selectElement, min = 12, max = 50) {
    for (let i = min; i <= max; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectElement.appendChild(option);
    }
}
nCaracteres(longitudPassword)

// botton para confirmar la contraseña seguroa
confirmarPassword.addEventListener(`click`, () => {
    const cantidad = parseInt(longitudPassword.value);
    const newPassword = generarPassword(cantidad);
    templatePassword(newPassword);
})
//---------------------------------------------------------------------------------------------

//---------------------------------------LINKS--------------------------------------------------
const tituloInput = document.getElementById(`tituloInput`);
const linkInput = document.getElementById(`linkInput`);
const confirmarLinks = document.querySelector(`.confirmarLink`)
const linkList = document.querySelector(`.linkList`)
let links = [];

iniciarPagina();
//boton para confirmar el enlace
confirmarLinks.addEventListener(`click`, () => {
    let titulo = tituloInput.value;
    let link = linkInput.value;
    if (!titulo || !link) return;

    guardarLink(titulo,link);
    clearInputs();
    templateEnlace(links)
    guardarLocalStorage();
})

//creacion del enlace
function templateEnlace(links){
    linkList.innerHTML = ""; 

    links.forEach((linkData, index) =>{
        let linkCard = document.createElement(`div`);
        linkCard.classList.add(`link-card`);

        linkCard.innerHTML = `
        <span class="close-btn" title="Eliminar">
        <i class="fas fa-times"></i>
        </span>
        <a href="${linkData.link}" target="_blank">
        <i class="fas fa-link"></i> ${linkData.titulo}
        </a>
        `;
        
        linkList.appendChild(linkCard);
        linkCard.querySelector(".close-btn").addEventListener("click", () => {
            eliminarLink(index);
        });
    })
}

// meter el titulo y en link
function guardarLink(titulo, link) {
    links.push({ titulo, link });
}

//borrar los inputs
function clearInputs(){
    tituloInput.value = "";
    linkInput.value = "";
}

//cargar los links a iniciar la pagina
function iniciarPagina(){
    const storedLinks = localStorage.getItem(`linksGuardados`);
    if(storedLinks){
        links = JSON.parse(storedLinks);
        templateEnlace(links);
    }
}

//guardar en el locaStorage
function guardarLocalStorage(){
    localStorage.setItem(`linksGuardados`, JSON.stringify(links));
}

// Eliminar link y actualizar
function eliminarLink(index) {
    links.splice(index, 1);
    guardarLocalStorage();
    templateEnlace(links);
}

//---------------------------------------------------------------------------------------------

//---------------------------------------RELOJ--------------------------------------------------
// creacion de frases

const fecha = crearFecha();
const tiempo = crearHora();


//iniciamos el programa
templateReloj(tiempo);
templateFecha(fecha);
cambiarFondo();

//crear la fecha en el formato DD/MM/AAAA 
function crearFecha(){
    const now = new Date();
    const day = String(now.getDate()).padStart(2,'0');
    const month = String(now.getMonth() + 1).padStart(2,'0');
    const year = now.getFullYear();
    return `${day}/${month}/${year}`;
}

//crear la hora en 00:00
function crearHora(){
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

//actualizar cada segundo
setInterval(() => {
    const fechaActual = crearFecha();
    const horaActual = crearHora();
    const fraseActual = obtenerFrase(horaActual);

    templateReloj(horaActual);
    templateFecha(fechaActual);
    templateFrase(fraseActual);

}, 1000)


// pasamos el tiempo a segundo para tener mas precision
function horaASegundos(hora) {
    const [h, m, s] = hora.split(':').map(Number);
    return h * 3600 + m * 60 + s;
}

//obtenemos las frases segun la hora
function obtenerFrase(horaActual) {
    const segundosActuales = horaASegundos(horaActual);

    for (const rango of frasesPorRango) {
        const desde = horaASegundos(rango.inicio);
        const hasta = horaASegundos(rango.fin);

        if (segundosActuales >= desde && segundosActuales <= hasta) {
            return rango.mensaje;
        }
    }
    return `No se pudo obtener el mensaje`;
}


function templateReloj(tiempo){
    const relojHtml = document.getElementById(`reloj`);
    relojHtml.innerHTML = `
        <p>${tiempo}</p>
    `
}

function templateFecha(fecha){
    const fechaHtml = document.getElementById(`fecha`);
    fechaHtml.innerHTML = `
        <p>${fecha}</p>
    `
}

//---------------------------------------------------------------------------------------------

//---------------------------------------TIEMPO--------------------------------------------------
const apiKey = `b246e05020ed4fc3bb8214449251504`;
const baseUrl = `https://api.weatherapi.com/v1`;
let ciudad = `Madrid`;
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