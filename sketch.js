const Breakfast = [];
const Snack = [];
const Lunch = [];
const Dinner = [];
const BreakfastTwo = [];
const SnackTwo = [];
const LunchTwo = [];
const DinnerTwo = [];
const ResultsAr = [];
let myRec;
let food = "Empty" ;
let phrase = "Empty";
let showGoodJob = true;
let recognitionRunning = false; // Flag to check if recognition is already running
let recognitionTimeout; // Variable to store the timeout ID
var num = 0;
let hasPlayedGoodAfternoon = false;
let hasPlayedGoodNight = false;
var start;
var SorryCount = 0; 
let level = 1; 
let i;
var result;
let phrase1 = "Empty";


//let imgFood;

// Counters for successful matches in each array
let counts = {
  breakfastCount: 0,
  lunchCount: 0,
  dinnerCount: 0,
  snackCount: 0
};



function preload(){


if(food != undefined){
  imgFood = loadImage(food + ".png"); // Load the image
}
console.log("phrase" + phrase);
if(phrase !="Empty"){
  if(phrase.includes("uno")){
    const phrase2 = phrase.replace("uno", "");
    imgPhrase = loadImage(phrase2.substring(10, phrase2.length) + ".png");
  }
  else if(phrase.includes("una")){
    const phrase3 = phrase.replace("una", "");
    imgPhrase = loadImage(phrase3.substring(10, phrase3.length) + ".png");
  }
  else
  imgPhrase = loadImage(phrase.substring(10, phrase.length) + ".png");
}

  imgEmpty = loadImage("Empty.png");
  imgcatepillar =  loadImage('catepillar.png'); 
  imgC = loadImage('Cocoon.png');
  imgB = loadImage('Butterfly.png');
  imgmanzana = loadImage('manzana.png');
  imgplátano = loadImage('plátano.png');
  imgfrijoles = loadImage('frijoles.png');
  imgpollo = loadImage("pollo.png");
  imgchocolate = loadImage("chocolate.png");
  imgcafe = loadImage("cafe.png");
  imghuevos = loadImage("huevos.png");
  imgpescado = loadImage("pescado.png");
  imguvas = loadImage("uvas.png");
  imghamburguesa = loadImage("hamburguesa.png");
  imgleche = loadImage("leche.png");
  imgnueces = loadImage("nueces.png");
  imgpapas = loadImage("papas.png");
  imgarroz = loadImage("arroz.png");
  imgsalmon = loadImage("salmón.png");
  imgcamarón = loadImage("camarón.png");
  imgsopa = loadImage("sopa.png");
  imgespagueti = loadImage("espagueti.png");
  imgpavo = loadImage("pavo.png");


  Breakfast.push(loadSound("Beans.mp3"));
  Breakfast.push(loadSound("Coffee.mp3"));
  Breakfast.push(loadSound("Eggs.mp3"));
  Breakfast.push(loadSound("Milk.mp3"));
  Breakfast.push(loadSound("Potatoes.mp3"));
  Snack.push(loadSound("Grapes.mp3"));
  Snack.push(loadSound("Nuts.mp3"));
  Snack.push(loadSound("Chocolate.mp3"));
  Snack.push(loadSound("Apple.mp3"));
  Snack.push(loadSound("Banana.mp3"));
  Lunch.push(loadSound("Rice.mp3"));
  Lunch.push(loadSound("Soup.mp3"));
  Lunch.push(loadSound("Hamburger.mp3"));
  Lunch.push(loadSound("Chicken.mp3"));
  Lunch.push(loadSound("Salad.mp3"));
  Dinner.push(loadSound("Salmon.mp3"));
  Dinner.push(loadSound("Turkey.mp3"));
  Dinner.push(loadSound("Spaghetti.mp3"));
  Dinner.push(loadSound("Fish.mp3"));
  Dinner.push(loadSound("Shrimp.mp3"));

  BreakfastTwo.push(loadSound("I_want_beans.mp3"));
  BreakfastTwo.push(loadSound("I_want_coffee.mp3"));
  BreakfastTwo.push(loadSound("I_want_eggs.mp3"));
  BreakfastTwo.push(loadSound("I_want_milk.mp3"));
  BreakfastTwo.push(loadSound("I_want_potatoes.mp3"));
  SnackTwo.push(loadSound("I_want_grapes.mp3"));
  SnackTwo.push(loadSound("I_want_nuts.mp3"));
  SnackTwo.push(loadSound("I_want_chocolate.mp3"));
  SnackTwo.push(loadSound("I_want_an_apple.mp3"));
  SnackTwo.push(loadSound("I_want_a_banana.mp3"));
  LunchTwo.push(loadSound("I_want_rice.mp3"));
  LunchTwo.push(loadSound("I_want_soup.mp3"));
  LunchTwo.push(loadSound("I_want_a_hamburger.mp3"));
  LunchTwo.push(loadSound("I_want_chicken.mp3"));
  LunchTwo.push(loadSound("I_want_a_salad.mp3"));
  DinnerTwo.push(loadSound("I_want_salmon.mp3"));
  DinnerTwo.push(loadSound("I_want_turkey.mp3"));
  DinnerTwo.push(loadSound("I_want_spaghetti.mp3"));
  DinnerTwo.push(loadSound("I_want_fish.mp3"));
  DinnerTwo.push(loadSound("I_want_shrimp.mp3"));

  GoodJob = loadSound("GoodJob.mp3");
  Verb = loadSound("Verb.mp3");
  Sorry = loadSound("Sorry.mp3");
  Please = loadSound("Please.mp3");
  Beep = loadSound("Beep.mp3");

  GoodMorning = loadSound("GoodMorning.mp3");
  GoodAfternoon = loadSound("GoodAfternoon.mp3");
  GoodNight = loadSound("GoodNight.mp3");

  CatepillarToButterfly = loadSound("CatepillarToButterfly.mp3");
  Directions = loadSound("Directions.mp3");
}



function setup() {
  createCanvas(500, 700);

  // Create a new speech recognition object for Spanish
  myRec = new p5.SpeechRec('es-MX');
  myRec.onResult = () => {
    if (!((Date.now() - start) >= 5000)){
      gotSpeech();    

  }
  setTimeout(function(){
      if(!ResultsAr.includes(true) && SorryCount == 1){
        Sorry.play();
        Sorry.onended(Choices);
        myRec.stop();
        num--;
        SorryCount ++;
        ResultsAr.length = 0;
      }
    }, 4000);
   
    
 }


  myRec.continuous = true; // Keep recognition running
  myRec.interimResults = true; // Show interim results


 // let savedCounts = localStorage.getItem('foodCounts');

  

  let startButton = select('#startButton');
  startButton.mousePressed(startAudio);

  // // Attach clear storage functionality to the button
  // let clearButton = select('#clearStorageButton'); // Use select from p5.js
  // clearButton.mousePressed(clearLocalStorage);
}


function getPacificHour() {
  let currentDate = new Date();
  let options = {
    timeZone: 'America/Los_Angeles',
    hour: '2-digit',
    hour12: false
  };
  let pacificHourString = new Intl.DateTimeFormat('en-US', options).format(currentDate);
  return pacificHourString;
}

let pacificHour = getPacificHour();
console.log(`The current hour in PST/PDT is: ${pacificHour}`);
function Greetings(){
if (`${pacificHour}` < 11) {
  GoodMorning.play();
}
if (`${pacificHour}` >= 11 && `${pacificHour}` <= 15) {
  GoodAfternoon.play();
}
if (`${pacificHour}` > 15 && `${pacificHour}` < 17) {
  GoodAfternoon.play();
}
if (`${pacificHour}` >= 17 && `${pacificHour}` <= 20) {
  GoodNight.play();
}
setTimeout(function(){
  Directions.play();
}, 7000);
setTimeout(function(){
  Choices();
}, 21000);
}
function Choices() {
  SorryCount = 0;
  
    // Stop speech recognition before starting a new audio
    if (recognitionRunning) {
      myRec.stop(); // Stop current recognition
      console.log("Recognition stopped before starting new audio");
    }

  // Stop any currently playing sound before starting a new one
  Breakfast.forEach(sound => sound.stop());
  Lunch.forEach(sound => sound.stop());
  Dinner.forEach(sound => sound.stop());
  Snack.forEach(sound => sound.stop());

   // Stop speech recognition before starting a new audio
   myRec.stop(); 

  // Helper function to start speech recognition after audio ends
  function startRecognition() {
    Beep.play();
    Beep.onended();
    start = Date.now()
    console.log(Date.now() - start);
    myRec.start(); // Start speech recognition after audio ends
    recognitionRunning = false; // Reset the flag
    console.log("Speech recognition started after audio ended");
  }
  

  if (`${pacificHour}` < 11) {
    switch (level) {
      case 1:
        if (num == 0) {
          Breakfast[0].play();
          Breakfast[0].onended(startRecognition);
          food = "frijoles";
        }
        if (num == 1) {
          Breakfast[1].play();
          Breakfast[1].onended(startRecognition);
          food = "café";
        }
        if (num == 2) {
          Breakfast[2].play();
          Breakfast[2].onended(startRecognition);
          food = "huevos";
        }
        if (num == 3) {
          Breakfast[3].play();
          Breakfast[3].onended(startRecognition);
          food = "leche";
        }
        if (num == 4) {
          Breakfast[4].play();
          Breakfast[4].onended(startRecognition);
          food = "papas";
        } 
        preload(food);
        break;
      case 2:
        if (num == 0) {
          BreakfastTwo[0].play();
          BreakfastTwo[0].onended(startRecognition);
          phrase = "Yo quiero frijoles";
        }
        if (num == 1) {
          BreakfastTwo[1].play();
          BreakfastTwo[1].onended(startRecognition);
          phrase = "Yo quiero café";
        }
        if (num == 2) {
          BreakfastTwo[2].play();
          BreakfastTwo[2].onended(startRecognition);
          phrase = "Yo quiero huevos";
        }
        if (num == 3) {
          BreakfastTwo[3].play();
          BreakfastTwo[3].onended(startRecognition);
          phrase = "Yo quiero leche";
        }
        if (num == 4) {
          BreakfastTwo[4].play();
          BreakfastTwo[4].onended(startRecognition);
          phrase = "Yo quiero papas";
        }
        preload(phrase);
      }
    }
  if (`${pacificHour}` >= 11 && `${pacificHour}` <= 15) {
    switch (level) {
      case 1:
        if (num == 0) {
          Lunch[0].play();
          Lunch[0].onended(startRecognition);
          food = "arroz";
        }
        if (num == 1) {
          Lunch[1].play();
          Lunch[1].onended(startRecognition);
          food = "sopa";
        }
        if (num == 2) {
          Lunch[2].play();
          Lunch[2].onended(startRecognition);
          food = "hamburguesa";
        }
        if (num == 3) {
          Lunch[3].play();
          Lunch[3].onended(startRecognition);
          food = "pollo";
        }
        if (num == 4) {
          Lunch[4].play();
          Lunch[4].onended(startRecognition);
          food = "ensalada";
        }
        preload(food);
        break;
    case 2:
        if (num == 0) {
          LunchTwo[0].play();
          LunchTwo[0].onended(startRecognition);
          phrase = "Yo quiero arroz";
        }
        if (num == 1) {
          LunchTwo[1].play();
          LunchTwo[1].onended(startRecognition);
          phrase = "Yo quiero sopa";
        }
        if (num == 2) {
          LunchTwo[2].play();
          LunchTwo[2].onended(startRecognition);
          phrase = "Yo quiero una hamburguesa";
        }
        if (num == 3) {
          LunchTwo[3].play();
          LunchTwo[3].onended(startRecognition);
          phrase = "Yo quiero pollo";
        }
        if (num == 4) {
          LunchTwo[4].play();
          LunchTwo[4].onended(startRecognition);
          phrase = "Yo quiero una ensalada";
        }
        preload(phrase);
      }
    }
  if (`${pacificHour}` >= 17 && `${pacificHour}` <= 20) {
    switch (level) {
      case 1:
        if (num == 0) {
          Dinner[0].play();
          Dinner[0].onended(startRecognition);
          food = "salmón";
        }
        if (num == 1) {
          Dinner[1].play();
          Dinner[1].onended(startRecognition);
          food = "pavo";
        }
        if (num == 2) {
          Dinner[2].play();
          Dinner[2].onended(startRecognition);
          food = "espagueti";
        }
        if (num == 3) {
          Dinner[3].play();
          Dinner[3].onended(startRecognition);
          food = "pescado";
        }
        if (num == 4) {
          Dinner[4].play();
          Dinner[4].onended(startRecognition);
          food = "camarones";
        }
        preload(food);
        break;
      case 2:
        if (num == 0) {
          DinnerTwo[0].play();
          DinnerTwo[0].onended(startRecognition);
          phrase = "Yo quiero salmón";
        }
        if (num == 1) {
          DinnerTwo[1].play();
          DinnerTwo[1].onended(startRecognition);
          phrase = "Yo quiero pavo";
        }
        if (num == 2) {
          DinnerTwo[2].play();
          DinnerTwo[2].onended(startRecognition);
          phrase = "Yo quiero espagueti";
        }
        if (num == 3) {
          DinnerTwo[3].play();
          DinnerTwo[3].onended(startRecognition);
          phrase = "Yo quiero pescado";
        }
        if (num == 4) {
          DinnerTwo[4].play();
          DinnerTwo[4].onended(startRecognition);
          phrase = "Yo quiero camarones";
        }
        preload(phrase);
    }
  }
  if (`${pacificHour}` > 15 && `${pacificHour}` < 17) {
    switch (level) {
      case 1:
        if (num == 0) {
          Snack[0].play();
          Snack[0].onended(startRecognition);
          food = "uvas";
        }
        if (num == 1) {
          Snack[1].play();
          Snack[1].onended(startRecognition);
          food = "nueces";
        }
        if (num == 2) {
          Snack[2].play();
          Snack[2].onended(startRecognition);
          food = "chocolate";
        }
        if (num == 3) {
          Snack[3].play();
          Snack[3].onended(startRecognition);
          food = "manzana";
        }
        if (num == 4) {
          Snack[4].play();
          Snack[4].onended(startRecognition);
          food = "plátano";
        }
        preload(food);
        break;
        case 2:
        if (num == 0) {
          SnackTwo[0].play();
          SnackTwo[0].onended(startRecognition);
          phrase = "Yo quiero uvas";
        }
        if (num == 1) {
          SnackTwo[1].play();
          SnackTwo[1].onended(startRecognition);
          phrase = "Yo quiero nueces";
        }
        if (num == 2) {
          SnackTwo[2].play();
          SnackTwo[2].onended(startRecognition);
          phrase = "Yo quiero chocolate";
        }
        if (num == 3) {
          SnackTwo[3].play();
          SnackTwo[3].onended(startRecognition);
          phrase = "Yo quiero una manzana";
        }
        if (num == 4) {
          SnackTwo[4].play();
          SnackTwo[4].onended(startRecognition);
          phrase = "Yo quiero uno plátano";
        }
        preload(phrase);
      }
  }
  num++;
}

function draw() {
  background('#576eb5');

  if(level == 1 )
    image(imgcatepillar,50,250,400,150);
  if(level == 2)
    image(imgC, 50,100,400,450);
  if(level == 3)
    image(imgB, 50,100,400,450);
  fill('white');
  textSize(30);
  textFont("Raleway");

    // Check if the song is playing
    if (GoodJob.isPlaying()) {
      showText = false; // Hide text when audio is playing
    } else {
      showText = true; // Show text when audio is not playing
    }
  
    if (showText && food != undefined && level == 1 && food != "Empty") {
      background('#576eb5');
      textAlign(CENTER);
      textStyle(NORMAL);
      text("Say/Diga: ",250,60);
      textStyle(BOLD);
      text(food, 250,120);
      image(imgFood,100,150, 300,300);
    }
    if (level == 2 && phrase != "Empty" && phrase !=undefined) {
      background('#576eb5');
      textAlign(CENTER);
      textStyle(NORMAL);
      text("Say/Diga: ",250,60);
      textStyle(BOLD);
      text(phrase, 250,120);
      image(imgPhrase,100,150, 300,300);
    }
}
function startAudio() {
  if (!recognitionRunning) {
    recognitionRunning = true;

    Greetings();
  }
}

function stopAudio() {

    recognitionRunning = false;
    if(level == 2)
    level ++;
  
    if(level === 1){
   
    if(counts.breakfastCount === 5 ){
      num = 0;
      level++;
      Verb.play();
      setTimeout(function(){
        Choices();
        }, 12000);
    }
    if(counts.lunchCount === 5 ){
      num = 0;
      level++;
      Verb.play();
      setTimeout(function(){
        Choices();
        }, 12000);
    }
    if(counts.snackCount === 5){
      num = 0;
      level++;
      Verb.play();
      setTimeout(function(){
        Choices();
        }, 12000);
    }
    if(counts.dinnerCount === 5){
      num = 0;
      level++;
      Verb.play();
      setTimeout(function(){
        Choices();
        }, 12000);
    }
  }
  
    counts.breakfastCount = 0;
    counts.lunchCount = 0;
    counts.dinnerCount = 0;
    counts.snackCount = 0;
    localStorage.removeItem('foodCounts');
    console.log("Audio stopped and counts reset.");
  
}


let goodJobPlaying = false; // Flag to prevent GoodJob from playing multiple times

function gotSpeech() {
  // This function will be called with the speech recognition result
  SorryCount = 0;
  if (myRec.resultValue) {
    console.log(myRec.resultString);
    console.log("level "+level);
    //console.log("counts" + counts);
    // var result;
    if(level == 1){
      if(SorryCount != 1)
        result = myRec.resultString === food;
    }
    if(level == 2){
     // console.log("hello");
      if(SorryCount != 1)
        result = myRec.resultString === phrase;
       // phrase1 = phrase.substring(10, phrase.length);

        // // console.log(phase1);
        // console.log(phrase1 + ".png");

    }
  
    ResultsAr.push(result);

    console.log(result, "check result");

    if(result == false)
      SorryCount++;

    if (result && !goodJobPlaying) { // Check the flag to prevent multiple plays
      showGoodJob = true;
      goodJobPlaying = true; // Set the flag to true
      console.log("good job");
      

        // Stop speech recognition before playing the GoodJob sound
       myRec.stop(); 

      // Play GoodJob sound and ensure it's only played once
      GoodJob.play();
      GoodJob.onended(function() {
        ResultsAr.length =0;
        goodJobPlaying = false; // Reset the flag once GoodJob finishes

        // Restart speech recognition after GoodJob finishes playing
        //myRec.start();

        // Update counts based on the current time and selected meal
        if (`${pacificHour}` < 11 ) {
          counts.breakfastCount++;
        } 
        if (`${pacificHour}` >= 11 && `${pacificHour}` <= 15) {
          counts.lunchCount++;
        } 
        if (`${pacificHour}` >= 17 && `${pacificHour}` <= 20) {
          counts.dinnerCount++;
        } 
        if (`${pacificHour}` > 15 && `${pacificHour}` < 17) {
          counts.snackCount++;
        }

        // Save counts to local storage
        localStorage.setItem('foodCounts', JSON.stringify(counts));

        // Check if any of the counts have reached 5
        if (counts.breakfastCount < 5 && counts.lunchCount < 5 &&
            counts.dinnerCount < 5 && counts.snackCount < 5) {
          // Only start the next round of Choices if all counts are less than 5
          Choices();
        } else {
          // Optional: Stop everything if one of the counts reaches 5
          myRec.stop(); 
          stopAudio();
          

         }
      });


     }
  }

}
