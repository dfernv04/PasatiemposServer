var dictionary;
var palabras = [];
var keyWords = ["clan", "pena", "remato", "torero"];
var index = [0, 5, 6, 11];
var numTracks = 3;

function start() {
    load();
    instructions();
    tracksInfo();
    loadDictionary();
    //createTable();
}

function load() {
    for(let i=1; i<61; i++){
        document.getElementById(""+i).getElementsByTagName("input")[0].value = localStorage.getItem(""+i);
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
    var text = "1. Familia en escocia.<br>2. Tristeza y dolor por algo.<br>3. Termino"
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

function cleanMemory() {
    for(let i=1; i<61; i++){
        localStorage.removeItem(""+i);
    }
}

function prepareDictionary(dictionary) {
    palabras = dictionary.split("\n");
}

function resolve() {
    console.log(palabras);
    var answers = [];
    if(checkComplete()){
        answers = pickUpWords();
        console.log(answers);
        if(checkKeyords(answers)) {
            if(checkWords(answers)){
                if(checkWordsDictionary(answers)) {
                    alert("Es correcto!");
                }else{
                    alert("Algunas de las palabras no existen.");
                }
            }else{
                alert("Pasatiempos incorrecto\nSiga las reglas!");
            }
        }
    }else{
        alert("Complete el pasatiempos para resolverlo.");
    }
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

function checkKeyords(answers) {
    for(let i=0; i<index.length; i++) {
        if(answers[index[i]] != keyWords[i]){
            alert("La palabra clave: "+answers[index[i]]+" es incorrecto.");
            return false;
        }
    }
    return true;
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

function checkWords(answers) {
    var mode = 1;
    var i = 0;
    var result = true;
    while(i<5 && result) {
        if(mode%2==0) {
            result = checkWordCompare(answers[i], answers[i+1], 0);
        }else{
            result = checkWordCompare(answers[i], answers[i+1], 1);
        }
        i++;
        mode++;
    }
    i++;
    mode = 1;
    while(i<11 && result) {
        if(mode%2==0) {
            result = checkWordCompare(answers[i], answers[i+1], 0);
        }else{
            result = checkWordCompare(answers[i], answers[i+1], 1);
        }
        i++;
        mode++;
    }
    return result;
}

function checkWordCompare(word1, word2, mode) {
    var different = 0;
    var order;
    word1 = removeAccents(word1);
    word2 = removeAccents(word2);
    for(let i=0; i<word1.length; i++) {
        if(!word2.includes(word1[i])) {
            different ++;
        }
    }
    if(mode==1) {
        order = checkOrder(word1, word2);
    }

    if(mode==1 && different==1 && order) {
        return true;
    }else if(mode==0 && different==0) {
        return true;
    }else{
        return false;
    }
}

function checkOrder(word1, word2) {
    var dif = 0;
    for (let i=0; i<word2.length; i++) {
        if(word1[i]!=word2[i]) {
            dif ++;
        }
    }

    return dif==1;

}

const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
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
//background-color: #fc636b; background-color: #e5f173;