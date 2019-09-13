// // import Letter from "Letter.js";
// // import Word from "Word.js";
// //how does the json data obj filter in

export default class Game {
    constructor(words, limit=5) { //default limit = 5 if no limit has been set
        const randNum = Math.floor(Math.random() * words.length);
        this.words = words;//details req.results from incoming json
        this.currentWord = words[randNum];//use the word 
        this.letterState = {}; //current status of letters
        this.wordTracker = this.currentWord.length; //making these equal to later use the currentWord.length

        this.limit = limit; //limit turns
    }
    checkGuess(guess){ //FOCUS: when user chooses letter, check if in word
        // let foundIndex = this.currentWord.indexOf( guess ); //takes str 'if exists' in current word = index;
        
        /*keep track of where 'letter' is located aka Index; & multiple indexes aka = array to hold info.
        Declare the var to hold it; define it with it's type ie. let indexes === []*/
        let indexes = [];
        let lowerGuess = guess.toLowerCase();//lower case version of guess
        if(this.letterState[lowerGuess]){ //check repeat entries: if Yes='letter' if No=undef means not there
            return "duplicate"; //means letter has been guessed
        } else {  
            
            for(let i = 0; i<this.currentWord.length; i++){
                if(lowerGuess===this.currentWord[i].toLowerCase()){  //we want a letter inside of the word; each loop, goes through each letter instance i
                    indexes.push(i);
                    //when we find the letter we can subtract from wordTracker aka currentWord.length
                    this.wordTracker--; //now test in main.js
                } 

            }
            //after for loop!
            console.log("foundIndex: ", indexes); //only one at a time.pushed
            this.letterState[lowerGuess] = indexes; //must assign key to the obj or it will overwrite each time
            console.log("this.letterState", this.letterState) //need to checkguess() 2x in main.js to ensure it works
            //if indexes [] is empty, means there hasnt' been anything found; limit turns to n num here 5 
            if(indexes.length===0){
                this.limit--;
                return "wrong"; 
            }
            //game ends
           
            return "correct"; //'guess' = first instance of letter
        }      
    }
}



