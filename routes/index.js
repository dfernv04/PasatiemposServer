var express = require('express');
var router = express.Router();

const options = {
   keyWords1: ["clan", "pena", "remato", "torero"],
   keyWords2: ["clan", "pena", "remato", "torero"],
   keyWords3: ["clan", "pena", "remato", "torero"],
}

var index = [0, 5, 6, 11];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', { title: 'Express' });
});


/* GET no indexed page */
router.get('*', function(req, res, next) {
  const error = new Error('Page not found');
  error.statusCode = 404;
  next(error);
});

router.post('/pasatiempos', function(req, res) {
  var palabras = req.body.soluciones.split(",");
  var option = req.body.opcion;
  var solucion = false;

  if(checkKeyWords(palabras, option)) {
    if(checkWords(palabras)) {
      solucion = true;
    }else {
      solucion = false;
    }
  }else{
    solucion = false;
  }

  res.end(JSON.stringify(solucion));
});

function selectKeyWords(option) {
  switch (option) {
    case "0":
      return options.keyWords1;
    case "1":
      return options.keyWords2;
    case "2":
      return options.keyWords3;
    default:
      return 0;
  }
}

function checkKeyWords(answers, option) {
  arraySolutions = selectKeyWords(option);
  for(let i=0; i<index.length; i++) {
    if(answers[index[i]] != arraySolutions[i]){
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

module.exports = router;
