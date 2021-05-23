var dictionary;
var palabras = [];
var option = -1;
var numTracks = 3;

function start() {
    var num = window.location.search;
    var number = num.replace('?', '');
    option = number;
    load();
    instructions();
    tracksInfo();
    loadDictionary();
}

function load() {
    switch (option) {
        case "0":
            loadOne();
            break;
        case "1":
            loadTwo();
            break;
        case "2":
            loadThree();
            break;
        default:
            alert("Opcion incorrecta");
            break;
    }
}

function loadOne() {
    for(let i=1; i<61; i++){
        document.getElementById(""+i).getElementsByTagName("input")[0].value = localStorage.getItem(""+i);
    }
}

function loadTwo() {
    var htmlElement = 1;
    for(let i=62; i<122; i++){
        document.getElementById(""+htmlElement).getElementsByTagName("input")[0].value = localStorage.getItem(""+i);
        htmlElement += 1;
    }
}

function loadThree() {
    var htmlElement = 1;
    for(let i=123; i<183; i++){
        document.getElementById(""+htmlElement).getElementsByTagName("input")[0].value = localStorage.getItem(""+i);
        htmlElement += 1;
    }
}

function instructions() {
    var text = "Identifique la primera palabra y la &uacuteltima de cada bloque "
        +"con las pistas que se dan. A continuaci&oacuten, trate de descubrir las "
        +"palabras intermedias. Para lograrlo, cambie una letra de la primera "
        +"palabra para obtener la pr&oacutexima y, despu&eacutes, altere el orden de una "
        +"o varias letras para encontrar la siguiente. Siga as&iacute, sucesivamente "
        +", hasta que logre completar ambos casilleros. Todas las palabras "
        +"intermedias deben tener un significado.";
    document.getElementById("intructions").innerHTML = text;
    document.getElementById("intructions").style = "text-align: justify; padding-left: 10px; padding-right: 10px; " ;
}

function tracksInfo() {
    switch (option) {
        case "0":
            tracksInfoZero();
            break;
        case "1":
            tracksInfoOne();
            break;
        case "2":
            tracksInfoTwo();
            break;
        default:
            alert("Opcion incorrecta");
            break;

    }
}

function tracksInfoZero() {
    var text = "1. Familia en escocia.<br>2. Tristeza y dolor por algo.<br>3. Termino"
        +" algo definitivamente.<br>4. El que torea.";
    document.getElementById("tracks").innerHTML = text;
}

function tracksInfoOne() {
    var text = "1..<br>2. Tristeza y dolor por algo.<br>3. Termino"
        +" algo definitivamente.<br>4. El que torea.";
    document.getElementById("tracks").innerHTML = text;
}

function tracksInfoTwo() {
    var text = "1. Familia en escocia.<br>2. To.<br>3. Termino"
        +" algo definitivamente.<br>4. El que torea.";
    document.getElementById("tracks").innerHTML = text;
}

function loadDictionary() {
    //let url = 'https://ordenalfabetix.unileon.es/aw/diccionario.txt';
    let url = 'https://diccionario.casasoladerueda.es/diccionario.txt';
    fetch(url)
        .then(response => response.text())
        .then(dic => dictionary = dic)
        .then(function(dictionary) {
            prepareDictionary(dictionary);
        })
}

function clean() {
    for(let i=1; i<61; i++){
        document.getElementById(""+i).getElementsByTagName("input")[0].value="";
    }
}

function save() {
    switch (option) {
        case "0":
            saveOptionOne();
            break;
        case "1":
            saveOptionTwo();
            break;
        case "2":
            saveOptionThree();
            break;
        default:
            alert("Opcion incorrecta");
            break;
    }
}

function saveOptionOne() {
    var sobreescribir = false;
    if(localStorage.getItem(""+1)!=null) {
        sobreescribir = true;
    }
    if(sobreescribir) {
        if(confirm("¿Desea sobreescribir la solución guardada de forma local?")){
            for(let i=1; i<61; i++){
                localStorage.setItem(""+i, document.getElementById(""+i).getElementsByTagName("input")[0].value);
            }
        }
    }else{
        if(confirm("¿Desea guardar esta solucion de forma local?")){
            for(let i=1; i<61; i++){
                localStorage.setItem(""+i, document.getElementById(""+i).getElementsByTagName("input")[0].value);
            }
        }
    }
}

function saveOptionTwo() {
    var sobreescribir = false;
    if(localStorage.getItem(""+62)!=null) {
        sobreescribir = true;
    }
    var htmlElement = 1;
    if(sobreescribir) {
        if(confirm("¿Desea sobreescribir la solución guardada de forma local?")){
            for(let i=62; i<122; i++){
                localStorage.setItem(""+i, document.getElementById(""+htmlElement).getElementsByTagName("input")[0].value);
                htmlElement += 1;
            }
        }
    }else{
        if(confirm("¿Desea guardar esta solucion de forma local?")){
            for(let i=62; i<122; i++){
                localStorage.setItem(""+i, document.getElementById(""+htmlElement).getElementsByTagName("input")[0].value);
                htmlElement += 1;
            }
        }
    }
}

function saveOptionThree() {
    var sobreescribir = false;
    if(localStorage.getItem(""+123)!=null) {
        sobreescribir = true;
    }
    var htmlElement = 1;
    if(sobreescribir) {
        if(confirm("¿Desea sobreescribir la solución guardada de forma local?")){
            for(let i=123; i<183; i++){
                localStorage.setItem(""+i, document.getElementById(""+htmlElement).getElementsByTagName("input")[0].value);
                htmlElement += 1;
            }
        }
    }else{
        if(confirm("¿Desea guardar esta solucion de forma local?")){
            for(let i=123; i<183; i++){
                localStorage.setItem(""+i, document.getElementById(""+htmlElement).getElementsByTagName("input")[0].value);
                htmlElement += 1;
            }
        }
    }
}

function cleanMemory() {
    switch (option) {
        case "0":
            for(let i=1; i<61; i++){
                localStorage.removeItem(""+i);
            }
            break;
        case "1":
            for(let i=62; i<122; i++){
                localStorage.removeItem(""+i);
            }
            break;
        case "2":
            for(let i=123; i<183; i++){
                localStorage.removeItem(""+i);
            }
            break;
        default:
            alert("Opcion incorrecta");
            break;
    }
}

function prepareDictionary(dictionary) {
    palabras = dictionary.split("\n");
}

async function resolve() {
    var answers = [];
    var isValid = false;
    if(checkComplete()){
        answers = pickUpWords();
        isValid = await sendWordsServer(answers);
        if(isValid) {
            if (checkWordsDictionary(answers)) {
                alert("El pasatiempos es correcto!");
            } else {
                alert("Algunas de las palabras no existen.");
            }
        }else{
            alert("El pasatiempos es incorrecto, alguna palabra no es correcta");
        }
    }else{
        alert("Complete el pasatiempos para resolverlo.");
    }
}

async function sendWordsServer(array) {
    try {
        return 'true' === await connectServer(array);
    } catch (Error) {
        console.error("No se puede conectar con el servidor");
    }
}

async function connectServer(array) {
    return $.post(
        "http://127.0.0.1:3000/pasatiempos",
        {soluciones: array.toString(),
        opcion: option}
    );
}

function checkComplete() {
    for(let i=1; i<61; i++) {
        if(document.getElementById(""+i).getElementsByTagName("input")[0].value == '') {
            return false;
        }
    }
    return true;
}

function pickUpWords() {
    const answers = [];
    //Aqui preparamos las palabras de longitud 4
    var word = "";
    for(let i=1; i<25; i++) {
        if(i%4 == 0) {
            word += document.getElementById(""+i).getElementsByTagName("input")[0].value;
            answers.push(word.toLowerCase());
            word = "";
        }else{
            word += document.getElementById(""+i).getElementsByTagName("input")[0].value;
        }
    }
    //Aqui preparamos las words de longitud 6
    for(let i=25; i<61; i++) {
        if(i%6 == 0) {
            word += document.getElementById(""+i).getElementsByTagName("input")[0].value;
            answers.push(word.toLowerCase());
            word = "";
        }else{
            word += document.getElementById(""+i).getElementsByTagName("input")[0].value;
        }
    }
    return answers;
}

function checkWordsDictionary(answers) {
    for(let i=1; i<answers.length-1; i++) {
        if(i!=5 && i!=6)
            if(!palabras.includes(answers[i])){
                alert("No existe la palabra: "+answers[i]);
                return false;
            }
    }
    return true;
}

function track() {
    var trackArray = [];
    if(numTracks>0){
        var string = prompt("Escriba la cadena de caracteres a buscar:","Tiene: "+numTracks+" restantes.");
        var map = checkRep(string.toLowerCase());
        numTracks --;
        if(string.length<7) {
            trackArray = obtainWords(map);
            if(trackArray.length==0){
                document.getElementById("tracksArea").innerHTML = "No hay palabras con esa combinaci&oacuten de caracteres!";
            }else{
                document.getElementById("tracksArea").innerHTML = trackArray;
            }
        }else{
            document.getElementById("tracksArea").innerHTML = "No hay palabras de m&aacutes de 6 letras en el pasatiempos!";
        }
    }else{
        alert("No le quedan mas pistas");
    }
}

function obtainWords(map) {
    var trackString = palabras;
    var aux = [];

    for(let [key, value] of map) {
        for(let j=0; j<trackString.length; j++) {
            if(checkWordRepet(trackString[j], value, key)) {
                aux.push(trackString[j]);
            }
        }
        trackString = [];
        trackString = aux;
        aux = [];
    }
    return trackString;
}

function checkRep(string) {
    var array = string.split("");
    var map = new Map();
    var rep = 0;
    for(let i=0; i<array.length; i++) {
        for(let j=0; j<array.length; j++) {
            if(array[i]==array[j]) {
                rep ++;
            }
        }
        map.set(array[i], rep);
        rep = 0;
    }
    return map;
}

function checkWordRepet(word, num, letter) {
    var repet = 0;
    for(let i=0; i<word.length; i++) {
        if(word[i]==letter) {
            repet ++;
        }
    }

    if(repet >= num) {
        return true;
    }else{
        return false;
    }
}

function focusear(id) {
    document.getElementById(""+id).getElementsByTagName("input")[0].focus();
}

function selectOption(num) {
    window.location = "pasatiempos.html?"+num;
}


//background-color: #fc636b; background-color: #e5f173;