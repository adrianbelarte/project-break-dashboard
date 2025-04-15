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
