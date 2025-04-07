
// password  Tendrá entre 12 caracteres como mínimo y 50 de máximo
const mayusculas =  "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const minusculas =  "abcdefghijklmnopqrstuvwxyz";
const numeros = "0123456789";
const simbolos = "!@#$%^&*()-_=+";
const longitudPassword = document.getElementById("nCaracteres")
const confirmar = document.querySelector(`.confirmar`)

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
confirmar.addEventListener(`click`, () => {
    const cantidad = parseInt(longitudPassword.value);
    const newPassword = generarPassword(cantidad);
    templatePassword(newPassword);
})







