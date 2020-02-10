var training;
var currentIndex = 0;
var currentState = undefined;

var timeOutId;
var intervalId;
var secondsPerState = 10;
var timeLeft = secondsPerState;

function getStateList() {
  var list = [];
  list.push(new State("Argentina", PAIS,"Buenos Aires"));
  list.push(new State("Bolívia", PAIS,"La Paz (ou Sucre)"));
  list.push(new State("Brasil", PAIS,"Brasília"));
  list.push(new State("Chile", PAIS,"Santiago"));
  list.push(new State("Colômbia", PAIS,"Bogotá"));
  list.push(new State("Equador", PAIS,"Quito"));
  list.push(new State("Guiana", PAIS,"Georgetown"));
  list.push(new State("Guiana Francesa", PAIS,"Caiena"));
  list.push(new State("Paraguai", PAIS,"Assunção"));
  list.push(new State("Peru", PAIS,"Lima"));
  list.push(new State("Suriname", PAIS,"Pramaribo"));
  list.push(new State("Uruguai", PAIS,"Motividéu"));
  list.push(new State("Venezuela", PAIS,"Caracas"));

  list.push(new State("Acre - AC", ESTADO,"Rio Branco"));
  list.push(new State("Alagoas- AL", ESTADO,"Maceió"));
  list.push(new State("Amapá - AP", ESTADO,"Macapá"));
  list.push(new State("Amazonas - AM", ESTADO,"Manaus"));
  list.push(new State("Bahia - BA", ESTADO,"Salvador"));
  list.push(new State("Ceará - CE", ESTADO,"Fortaleza"));
  list.push(new State("Espírito Santo - ES", ESTADO,"Vitória"));
  list.push(new State("Goiás - GO", ESTADO,"Goiânia"));
  list.push(new State("Maranhão - MA", ESTADO,"São Luís"));
  list.push(new State("Mato Grosso - MT", ESTADO,"Cuiabá"));
  list.push(new State("Mato Grosso do Sul - MS", ESTADO,"Campo Grande"));
  list.push(new State("Minas Gerais - MG", ESTADO,"Belo Horizonte"));
  list.push(new State("Pará - PA", ESTADO,"Belém"));
  list.push(new State("Paraíba - PB", ESTADO,"João Pessoa"));
  list.push(new State("Paraná - PR", ESTADO,"Curitiba"));
  list.push(new State("Pernambuco - PE", ESTADO,"Recife"));
  list.push(new State("Piauí - PI", ESTADO,"Teresina"));
  list.push(new State("Rio de Janeiro - RJ", ESTADO,"Rio de Janeiro"));
  list.push(new State("Rio Grande do Norte - RN", ESTADO,"Natal"));
  list.push(new State("Rio Grande do Sul - RS", ESTADO,"Porto Alegre"));
  list.push(new State("Rondônia - RO", ESTADO,"Porto Velho"));
  list.push(new State("Rorâima - RR", ESTADO,"Boa Vista"));
  list.push(new State("Santa Catarina - SC", ESTADO,"Florianópolis"));
  list.push(new State("São Paulo - SP", ESTADO,"São Paulo"));
  list.push(new State("Sergipe - SE", ESTADO,"Aracaju"));
  list.push(new State("Tocantins - TO", ESTADO,"Palmas"));
  
  return list;
}

function startTraining() {

  training = new Training(getStateList());

  document.getElementById("states").style = "display: none;";
  document.getElementById("result").style = "";
  document.getElementById("statePane").style = "";

  setNextState();
}
  
function setNextState() {
  currentState = this.training.getCurrentState();

  if(!currentState) {
    document.getElementById("statePane").style = "display: none;";
    return;
  }

  currentIndex++;

  document.getElementById("state").innerHTML = currentState.name;

  var answerButtons = [];
  answerButtons[0] = document.getElementById("btCheckAnswer1");
  answerButtons[1] = document.getElementById("btCheckAnswer2");
  answerButtons[2] = document.getElementById("btCheckAnswer3");
  answerButtons[3] = document.getElementById("btCheckAnswer4");

  answerButtons.forEach(e => {
    e.value = "";
  });

  var shuffledIndex = Math.floor(Math.random() * answerButtons.length);

  answerButtons[shuffledIndex].value = currentState.capital;

  var capitals = training.capitals[currentState.type.id];

  capitals = capitals.filter( e => e !== currentState.capital);

  answerButtons.forEach(e => {
    if(e.value === "") {
       e.value = capitals[Math.floor(Math.random() * capitals.length)];
       capitals = capitals.filter( e => e !== e.value);
    }
  });

  timeLeft = secondsPerState;
  document.getElementById("seconds").innerHTML = timeLeft;
  intervalId = setInterval(countdown, 1000); 
  timeOutId = setTimeout(function(){ timeOut(currentIndex) }, secondsPerState * 1000);
}
      
function countdown() {
  document.getElementById("seconds").innerHTML = timeLeft-1;
  if (timeLeft == 0) {
    clearTimeout(intervalId);
  } else {
    timeLeft--;
  }
}

function timeOut(_currentIndex) {
  if(_currentIndex === currentIndex && !training.getState(_currentIndex - 1).answer) {
     checkAnswer(undefined);
  } 
}

function checkAnswer(event) {
  clearTimeout(timeOutId);
  clearTimeout(intervalId);

  var description = "?";

  if(event) {
    description = event.target.value;
  }
 
  currentState.answer = description;
  currentState.responseTime = secondsPerState - timeLeft;
  currentState.savedTime = timeLeft;
  training.setAnswer(currentState);

  if(currentState.isCorrectAnswer()) {
    document.getElementById("correctTotal").innerHTML = training.totalCorrectAnswers;
    document.getElementById("correctPanel").innerHTML = document.getElementById("correctPanel").innerHTML + "<br>" + currentState.name + " : " + description;
  } else {
    document.getElementById("wrongTotal").innerHTML = training.totalWrongAnswers;
    document.getElementById("wrongPanel").innerHTML = document.getElementById("wrongPanel").innerHTML + "<br>" + currentState.name + " : " + description + " (valor certo: " + currentState.capital + ")" ;
  }
  
  document.getElementById("total").innerHTML = training.totalStatesAnswered;

  document.getElementById("avarageTime").innerHTML = training.getAvarageResponseTime();

  document.getElementById("score").innerHTML = training.totalScore;

  setNextState();
}
