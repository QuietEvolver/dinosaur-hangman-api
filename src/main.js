import Game from './Game';
//import Letters from './../Letters.js';
//import Word from './../Word.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';


let game; //so not to over-write Game, we make an instance 'gave'

$(document).ready(function() {
  //first to load before all else
  fetch("https://alexnormand-dino-ipsum.p.rapidapi.com/?format=json&words=10&paragraphs=5", {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "alexnormand-dino-ipsum.p.rapidapi.com",
      "x-rapidapi-key": "cc1f6394f1msh6a5fcc345cbbdb7p1e7005jsn01983d0e770a"
    }
  })
  .then(response => {
    return response.json()
  })
  .then(data => {
    console.log(data.flat()); //'flat'tens the array into one long array;
    // for(let i =0; i < data.length; i++){
    //
    //     let each=data[i];
    //     for (let j=0; j<each.length; j++){
    //         console.log(each[j]);
    //     }
    // }
    let words = data.flat();
    game = new Game(words);
    //immediately create the underscores for display length of word; use [i]tracker;
    let underscores = ("_").repeat(game.wordTracker); 
    $("#show-dinosaur-name").text(underscores);//use jquery to insert _
    //use game obj for jQuery
    $('form').submit(function(e) {
      e.preventDefault();
      let dinoLetterGuess = $('#dino-letter-guess').val();

     //check to see waht the input is, alpha only accepted; is NaN?
      if (Number.isNaN(parseInt(dinoLetterGuess))){
        //if it's not a number, means it's a letter
        console.log("dino-letter-guess: ", dinoLetterGuess);
        //get the 'guessed letter; from input saved from turn; Fxn takes in param; checkGuess(param "guess")aka game.dinoLetterGuess
        
        let madeGuess = game.checkGuess(dinoLetterGuess); 
        console.log("madeGuess, game: ", madeGuess, game);
        //was guess wrong/right? & dupe; 3 states to account for.
        if(madeGuess === "wrong"){
          //to show current guess of miss
          $("#show-user-misses").append(dinoLetterGuess); //to pass the guess = "wrong"
          if(game.limit===0){
            $("#show-game-message").text("you lose");

          } else {
            $("#show-game-message").text(dinoLetterGuess);

          }
        } else if(madeGuess === "correct") { //when correct; 
            
            let newWord = "";
            const newUnderscore = $("#show-dinosaur-name").text();
            let x = 0;
            for (let i = 0; i<newUnderscore.length; i++){
                let currentIndex = game.letterState[dinoLetterGuess][x];
  //              console.log("currentIndex ", currentIndex);
                if (currentIndex === i){
                    newWord += dinoLetterGuess;
                    x++;
                } else {
                  newWord += newUnderscore[i];
                }
            }
            $("#show-dinosaur-name").text(newWord);
            if(game.wordTracker===0){
              $("#show-game-message").text("you win");
            } else{
              $("#show-game-message").text(dinoLetterGuess);

            } 
        } else if (madeGuess==="duplicate"){
          $("#show-game-message").text("you've already chosen this letter");
        }

      }
    });
  })
    .catch(err => {
      console.log(err);
    });
  });

// UI Logic end  


    //TESTING:
  //  game = new Game(["dog"]);
  //   console.log(game);

  //   console.log("first time? T game.checkGuess: ", game.checkGuess("d"));
  //   console.log("first time? F game.checkGuess: ", game.checkGuess("o"));
  //   console.log("first time? F game.checkGuess: ", game.checkGuess("g"));

  //   console.log("game.word tracker:  ", game.wordTracker); //checking the number length remaining/usage
  


  // function createNode(element) {
  //   return document.createElement(element); // Create the type of element you pass in the parameters
  // }

  // function append(parent, el) {
  //   return parent.appendChild(el); // Append the second parameter(element) to the first one