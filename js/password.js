
// password  Tendrá entre 12 caracteres como mínimo y 50 de máximo
const mayusculas =  "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const minusculas =  "abcdefghijklmnopqrstuvwxyz";
const numeros = "0123456789";
const simbolos = "!@#$%^&*()-_=+";

// Math.random() Para generar aleatoriedad
function getRandom(arr){
    let r = Math.floor(Math.random() * arr.length);
    return arr[r];
}

// guardar minimo los 4 datos diferentes
function password(n){
    if(n >= 12 && n <= 50){
        let password = [
            getRandom(mayusculas),
            getRandom(minusculas),
            getRandom(numeros),
            getRandom(simbolos)
        ]

        const todos = mayusculas + minusculas + numeros + simbolos;
        for (let i = 4; i < n; i++) {
            password.push(getRandom(todos));
        }

        return shuffle(password.join(``));
    }
    return false;
}

//mezclar los datos
function shuffle(str){
    return str
    .split(``)
    .sort(() => Math.random() - 0.5)
    .join(``)
}






