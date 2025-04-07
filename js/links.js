const tituloInput = document.getElementById(`tituloInput`);
const linkInput = document.getElementById(`linkInput`);
const confirmar = document.querySelector(`.btn-confirmar`)
const linkList = document.querySelector(`.linkList`)
let links = [];

iniciarPagina();

//boton para confirmar el enlace
confirmar.addEventListener(`click`, () => {
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