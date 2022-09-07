// app object

const app={};


app.init = ()=>{
    app.getRandomWord();
    app.getGuess();
    app.array=[];
    app.guessed=[];
    app.wordGuess();
    app.count=6;
    app.displayGuessesLeft(); 
    app.reg = /[a-zA-Z]/ ;
    app.drawCount = 0;
    app.hangMan = ['head','torso','leftleg','rightleg','leftarm','rightarm'];
}

app.displayGuessesLeft=()=>{
    const turnsLeft=document.getElementById('turns-left');
    turnsLeft.innerText=String(app.count);
}

// API Call to get new word
app.getRandomWord=()=>{
    let randNum = Math.floor(Math.random() * (6 - 4 + 1) + 4);
    fetch(`https://random-word-api.herokuapp.com/word?length=${randNum}`).then((response)=>response.json()).then((data)=>{

    app.word=data[0];
    app.array= app.word.split("").map(item =>{return ("_")});
    console.log(app.word);
    app.displayWord(app.array)


    })
}

// Display word so far...
app.displayWord=(array)=>{
    let hang = document.getElementById('hang-area');
    hang.innerText=(array.join(" "));
}

// Check the word the user has entered as a guess
app.checkWordGuess=(word)=>{
    if(word===app.word){
        alert("You guessed the word!")
    }
    else{
        alert("Sorry, that's not the word!");
        count.app-=1;
    }
}

app.wordGuess = () =>{
    let guess=document.getElementById("guessWord");
    guess.addEventListener('submit',(e)=>{
        e.preventDefault();
        app.checkWordGuess(e.target.childNodes[1].value);
    })
}

// Check the letter the user has entered
app.checkGuess = (letter) =>{

    // Construct new regex object for each letter guessed

    let re = new RegExp(letter)

    // check if user has already entered a letter
    let checked = app.guessed.filter(item=>{
        return item===letter
    })

    app.guessed.push(letter);

    if(checked.length>0 && app.guessed.length>1)
    {
        app.guessed.splice(0,app.guessed.length-1);
        alert(`you already guessed letter ${letter} `);
        
    }

    // If test method is false, remove a turn and display the number of turns left
    if(!re.test(app.word)){
        app.count-=1;
        let hanger = document.querySelector('.wrapper')
        let draw = document.createElement('div');
        
        draw.classList.add(`${app.hangMan[app.drawCount]}`);
        hanger.append(draw);
        app.drawCount+=1;

        app.displayGuessesLeft();
    }


    else{

        let wordArray = app.word.split("")
        wordArray.forEach((item,index) =>{
            if(item===letter){
                app.array[index]=item 
                let hang = document.getElementById('hang-area');
                hang.innerText=app.array.join(" ");  
            }
        })

    }

    // Make into a function
    if(app.array.join("")===app.word){
        alert("You guessed the word!")
    }

}

// get user's letter guess

app.getGuess = () =>{

    let guess = document.getElementById("guessLetter");
    guess.addEventListener('submit', function(e){
        e.preventDefault();
        let userGuess= e.target.childNodes[1].value;
        let re = new RegExp(userGuess)
        // increase guess count and check against the number of guesses left
       
        if(app.count===0 && !re.test(app.word)){
          
            alert(`No more Guess, the word was ${app.word}`);   
        }

        else{
       
           
            // Check if user input is a letter
          
            if(app.reg.test(userGuess)){
                guess.reset();
                const guessList=document.getElementById('guesses');
                // app.count+=1;
                // Display guessed letters
                
                guessList.append(userGuess+" ")
                app.checkGuess(userGuess.toLowerCase());
            }
            else{
                alert("Please enter a letter!")
                guess.reset();
            }

        }
    })
}

// Initialize app
app.init();


