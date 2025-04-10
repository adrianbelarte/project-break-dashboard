
// creacion de frases
const frasesPorRango = [
    { inicio: "00:01:00", fin: "07:00:00", mensaje: "Es hora de descansar. Apaga y sigue mañana" },
    { inicio: "07:01:00", fin: "12:00:00", mensaje: "Buenos días, desayuna fuerte y a darle al código" },
    { inicio: "12:01:00", fin: "14:00:00", mensaje: "Echa un rato más pero no olvides comer" },
    { inicio: "14:01:00", fin: "16:00:00", mensaje: "Espero que hayas comido" },
    { inicio: "16:01:00", fin: "18:00:00", mensaje: "Buenas tardes, el último empujón" },
    { inicio: "18:01:00", fin: "22:00:00", mensaje: "Esto ya son horas extras, ... piensa en parar pronto" },
    { inicio: "22:01:00", fin: "23:59:59", mensaje: "Buenas noches, es hora de pensar en parar y descansar" },
    { inicio: "00:00:00", fin: "00:00:00", mensaje: "Justo en el cambio del día... ¿aún por aquí?" }
];

// img
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

const fecha = crearFecha();
const tiempo = crearHora();
const frase = obtenerFrase(tiempo);

//iniciamos el programa
templateReloj(tiempo);
templateFecha(fecha);
templateFrase(frase);
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

function templateFrase(frase){
    const fraseHtml = document.getElementById(`frase`);
    fraseHtml.innerHTML = `
        <p>${frase}</p>
    `
}

// funcion para las img

function cambiarFondo() {
    const r = Math.floor(Math.random() * imagenes.length);
    document.body.style.backgroundImage = `url('${imagenes[r]}')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.transition = "background-image 1s ease-in-out";
}

//cambiar fondo cada 15s
setInterval(cambiarFondo, 15000);
